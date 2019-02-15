import R from 'ramda';

function unescapeFileContent(fileContent: string) {
  return fileContent
    .replace(/\\\,/g, ',')
    .replace(/\\\;/g, ';')
    .replace(/\\[nN]/g, '\n')
    .replace(/\\\\/g, '\\');
}

function parseValue(value: string) {
  if ('TRUE' === value) {
    return true;
  }

  if ('FALSE' === value) {
    return false;
  }

  const number = Number(value);
  if (!isNaN(number)) {
    return number;
  }

  return value;
}

export function parseICS(fileContent: string) {
  return unescapeFileContent(fileContent)
    .split('\n')
    .map(e => e.trim())
    .filter(e => e)
    .map(line => line.split(':', 2) as [string, string])
    .reduce(
      ([previousIndentation, previousResult], [lineName, lineValue]) => {
        const indentation = R.cond([
          [
            R.equals('BEGIN'),
            () => {
              return null;
            }
          ],
          [
            R.equals('END'),
            () => {
              return null;
            }
          ],
          [
            R.T,
            () => {
              return null;
            }
          ]
        ])(lineName);

        const result = {};

        return [indentation, result];
      },
      [R.lensPath([]), {}] as [R.Lens, any]
    )[1];
}
