import React from 'react';
import { parseICS } from '../services/ICSParser';

export interface ICalendar {
  VERSION?: number;
  'X-ORIGINAL-URL'?: string;
  'X-WR-CALNAME'?: string;
  METHOD?: string;
  PRODID?: string;
  VEVENT?: IEvent[];
}

// http://www.unicode.org/cldr/charts/latest/supplemental/zone_tzid.html
export interface ITime {
  TZID?: string;
  _value: string;
}

export interface IEvent {
  LOCATION?: string;
  'X-COUNTRY-CODE'?: string;
  'X-WINNER'?: string;
  SUMMARY?: string;
  UID?: string;
  DTSTART: ITime;
  DTEND: ITime;
  DTSTAMP: ITime;
  CATEGORIES?: string;
  GEO?: string;
  SEQUENCE?: number;
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
