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

export function parseICS(fileContent: string) {
  type Reducer = [ReadonlyArray<string | number>, any];

  const [_, parsed] = unescapeFileContent(fileContent)
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => line.split(':', 2))
    .reduce(
      ([nestingLevel, parseResult], [lineName, lineValue]) => {
        switch (lineName) {
          case 'BEGIN': {
            const newNestingLevel = [
              ...nestingLevel,
              lineValue,
              R.pathOr(0, [...nestingLevel, lineValue, 'length'], parseResult)
            ];

            return [newNestingLevel, parseResult] as Reducer;
          }

          case 'END': {
            const newNestingLevel = nestingLevel.slice(0, -2);

            return [newNestingLevel, parseResult] as Reducer;
          }

          default: {
            const newParseResult = R.set(
              R.lensPath([...nestingLevel, lineName]),
              parseValue(lineValue),
              parseResult
            );

            return [nestingLevel, newParseResult] as Reducer;
          }
        }
      },
      [[], {}] as Reducer
    );

  return parsed;
}
