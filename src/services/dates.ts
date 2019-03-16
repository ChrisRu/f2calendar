import {
  isAfter as nativeIsAfter,
  isSameDay as nativeIsSameDay,
  parse as nativeParse,
  format as nativeFormat,
  distanceInWordsStrict as nativeDistanceInWordsStrict,
  addDays as nativeAddDays,
  compareAsc as nativeCompareAsc,
  addMonths as nativeAddMonths,
  getDaysInMonth as nativeGetDaysInMonth
} from 'date-fns';
import {
  parseFromTimeZone,
  convertToLocalTime as nativeConvertToLocalTime
} from 'date-fns-timezone';
import { ITime } from '../hooks/calendarApi';

export const currentDate =
  process.env.NODE_ENV === 'development' ? new Date('2019/03/31') : new Date();

export function format(date: ITime | Date, format?: string) {
  return nativeFormat(parse(date), format);
}

export function parse(date: ITime | Date) {
  if (date instanceof Date) {
    return date;
  }

  if (date.TZID) {
    return parseFromTimeZone(date._value, { timeZone: date.TZID });
  }

  return nativeParse(date._value);
}

export function convertToLocalTime(date: ITime) {
  if (!date.TZID) {
    throw new Error('Date has no timezone specified');
  }

  return nativeConvertToLocalTime(date._value, { timeZone: date.TZID });
}

export function compareDatesAscending(dateLeft: ITime | Date, dateRight: ITime | Date) {
  return nativeCompareAsc(parse(dateLeft), parse(dateRight));
}

export function addMonths(date: ITime | Date, months: number) {
  return nativeAddMonths(parse(date), months);
}

export function getDaysInMonth(date: ITime | Date) {
  return nativeGetDaysInMonth(parse(date));
}

export function addDays(date: ITime | Date, days: number) {
  return nativeAddDays(parse(date), days);
}

export function isSameDay(date: ITime | Date, date2: ITime | Date) {
  return nativeIsSameDay(parse(date), parse(date2));
}

export function isAfter(date: ITime | Date) {
  return nativeIsAfter(currentDate, parse(date));
}

export function distanceInWords(date: ITime | Date) {
  const distance = nativeDistanceInWordsStrict(currentDate, parse(date));

  return distance;
}
