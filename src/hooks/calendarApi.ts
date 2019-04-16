import { useEffect, useState } from 'react';
import { parseICS } from '../services/ICSParser';
import { parse } from '../services/dates';

// from https://f2fanatic.wordpress.com/interactive-calendar/
export interface ICalendar<T extends IGenericEvent> {
  PRODID?: string;
  VERSION?: string;
  CALSCALE: 'string';
  METHOD?: string;
  'X-WR-CALNAME'?: string;
  'X-WR-TIMEZONE': string;
  VEVENT: T[];
}

interface IGenericEvent {
  UID?: string;
  DESCRIPTION: string;
  'X-WINNER'?: string;
  LOCATION?: string;
  SEQUENCE: string;
  STATUS: string;
  SUMMARY: string;
  TRANSP: string;
}

interface IPreEvent extends IGenericEvent {
  DTSTART: string;
  DTEND: string;
  DTSTAMP: string;
  CREATED: string;
  'LAST-MODIFIED': string;
}

export interface IEvent extends IGenericEvent {
  DTSTART: Date;
  DTEND: Date;
  DTSTAMP: Date;
  CREATED: Date;
  'LAST-MODIFIED': Date;
}

function parseDate(event: IPreEvent, timeZone: string) {
  return Object.assign({}, event, {
    DTSTART: parse(event.DTSTART, timeZone),
    DTEND: parse(event.DTEND, timeZone),
    DTSTAMP: parse(event.DTSTAMP, timeZone),
    CREATED: parse(event.CREATED, timeZone),
    'LAST-MODIFIED': parse(event['LAST-MODIFIED'], timeZone)
  }) as IEvent;
}

export function useCalendarApi(location: string) {
  const [data, setData] = useState<ICalendar<IEvent> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(function fetchData() {
    setIsError(null);
    setIsLoading(true);

    void fetch(location)
      .then(res => res.text())
      .then(parseICS)
      .then(result => result.VCALENDAR[0] as ICalendar<IPreEvent>)
      .then(result => ({
        ...result,
        VEVENT: result.VEVENT.map(date => parseDate(date, result['X-WR-TIMEZONE']))
      }))
      .then(setData)
      .then(() => setIsLoading(false))
      .catch(error => setIsError(error.message || error));
  }, []);

  return { data, isLoading, isError };
}
