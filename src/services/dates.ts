import { parseFromTimeZone } from 'date-fns-timezone';

export const currentDate = process.env.NODE_ENV === 'development' ? new Date() : new Date();

export function parse(date: string, timeZone: string) {
  return parseFromTimeZone(date, { timeZone });
}
