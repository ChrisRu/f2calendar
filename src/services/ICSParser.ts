import * as R from 'ramda';

function unescapeFileContent(fileContent: string) {
  return fileContent
    .replace(/\\\,/g, ',')
    .replace(/\\\;/g, ';')
    .replace(/\\[nN]/g, '\n')
    .replace(/\\\\/g, '\\');
}

function parseValue(value: string) {
  if ('TRUE' === value.toUpperCase()) {
    return true;
  }

  if ('FALSE' === value.toUpperCase()) {
    return false;
  }

  const number = Number(value);
  if (!isNaN(number)) {
    return number;
  }

  return value;
}

function lexICS(fileContent: string) {
  return unescapeFileContent(fileContent)
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => line.split(':', 2))
    .map(([key, value]) => [key, value] as [string, string]);
}

export function parseICS(fileContent: string) {
  const lexed = lexICS(fileContent);

  let result: any = {};

  let indentation: ReadonlyArray<string | number> = [];
  for (const [lineName, lineValue] of lexed) {
    if (lineName === 'BEGIN') {
      indentation = [...indentation, lineValue];
      const p: any = R.path(indentation, result);
      indentation = [...indentation, p ? p.length : 0];

      if (!R.view(R.lensPath(indentation), result)) {
        result = R.set(R.lensPath(indentation), {}, result);
      }

      continue;
    } else if (lineName === 'END') {
      indentation = indentation.slice(0, -2);

      continue;
    }

    result = R.set(
      R.lensPath([...indentation, lineName]),
      parseValue(lineValue),
      result
    );
  }

  return result;
}
