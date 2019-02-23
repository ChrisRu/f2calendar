import isAfter from 'date-fns/is_after';
import distanceInWordsStrict from 'date-fns/distance_in_words_strict';

const currentDate = process.env.NODE_ENV === 'development' ? new Date('2019/04/05') : new Date();

export function isPast(date: string) {
  return isAfter(currentDate, date);
}

export function distanceInWords(date: string) {
  return distanceInWordsStrict(currentDate, date);
}
