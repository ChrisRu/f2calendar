import React from 'react';
import { parseICS } from '../services/ICSParser';

export interface ICalendar {
  VERSION: number;
  'X-ORIGINAL-URL': string;
  'X-WR-CALNAME': string;
  METHOD: string;
  PRODID: string;
  VEVENT: IEvent[];
}

export interface IEvent {
  LOCATION: string;
  'X-COUNTRY-CODE': string;
  SUMMARY: string;
  UID: string;
  'DTSTART;VALUE=DATE-TIME': string;
  'DTEND;VALUE=DATE-TIME': string;
  DTSTAMP: string;
  CATEGORIES: string;
  GEO: string;
  SEQUENCE: number;
}

export function useCalendarApi(location: string) {
  const [data, setData] = React.useState<ICalendar | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState<string | null>(null);

  React.useEffect(function fetchData() {
    setIsError(null);
    setIsLoading(true);

    void fetch(location)
      .then(res => res.text())
      .then(parseICS)
      .then(result => result.VCALENDAR[0] as ICalendar)
      .then(setData)
      .then(() => setIsLoading(false))
      .catch(error => setIsError(error.message || error));
  }, []);

  return { data, isLoading, isError };
}
