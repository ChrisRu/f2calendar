import { utcToZonedTime } from 'date-fns-tz'

export const currentDate = new Date()

export function parse(date: string, timeZone: string) {
  return utcToZonedTime(date, timeZone)
}
