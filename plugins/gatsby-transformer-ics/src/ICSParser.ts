import * as R from 'ramda'

function unescapeFileContent(fileContent: string) {
  return fileContent
    .replace(/\\\,/g, ',')
    .replace(/\\\;/g, ';')
    .replace(/\\[nN]/g, '\n')
    .replace(/\\\\/g, '\\')
}

function parseValue(value: string) {
  if ('TRUE' === value.toUpperCase()) {
    return true
  }

  if ('FALSE' === value.toUpperCase()) {
    return false
  }

  const number = Number(value)
  if (!isNaN(number)) {
    return number
  }

  return value
}

export function parseICS(fileContent: string) {
  type Reducer = [(string | number)[], any]

  const [, parsed] = unescapeFileContent(fileContent)
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => {
      const index = line.indexOf(':')
      return [line.slice(0, index), line.slice(index + 1)]
    })
    .reduce(
      ([nestingLevel, parseResult], [lineName, lineValue]) => {
        switch (lineName) {
          case 'BEGIN': {
            const newNestingLevel = [
              ...nestingLevel,
              lineValue,
              R.pathOr(0, [...nestingLevel, lineValue, 'length'], parseResult),
            ]

            return [newNestingLevel, parseResult] as Reducer
          }

          case 'END': {
            const newNestingLevel = nestingLevel.slice(0, -2)

            return [newNestingLevel, parseResult] as Reducer
          }

          default: {
            const newParseResult = R.assocPath(
              [...nestingLevel, lineName.split(';')[0]],
              parseValue(lineValue),
              parseResult,
            )

            return [nestingLevel, newParseResult] as Reducer
          }
        }
      },
      [[], {}] as Reducer,
    )

  return parsed
}
