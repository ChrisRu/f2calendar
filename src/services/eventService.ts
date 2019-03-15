import compareAsc from 'date-fns/compare_asc';
import { IEvent } from '../hooks/calendarApi';

export function groupEvents(events: IEvent[]) {
  return Object.values(
    events
      .filter(event => event.LOCATION)
      .reduce(
        (races, event) => {
          const location = event.LOCATION || '_';

          return {
            ...races,
            [location]: (races[location] || []).concat(event)
          };
        },
        {} as { [x: string]: IEvent[] }
      )
  );
}

export function sortEvents(a: IEvent, b: IEvent) {
  return compareAsc(a.DTEND._value, b.DTEND._value);
}
