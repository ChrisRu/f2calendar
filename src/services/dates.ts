import { utcToZonedTime } from 'date-fns-tz'

export const currentDate =
  () => process.env.NODE_ENV === 'development' ? new Date('2019/5/8') : new Date()

export function parse(date: string, timeZone: string) {
  return utcToZonedTime(date, timeZone)
}
