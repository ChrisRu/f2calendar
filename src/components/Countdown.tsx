import React from 'react';
import { IEvent } from '../hooks/calendarApi';
import { isAfter, distanceInWords } from '../services/dates';

function calculateTimeLeft(groupedEvents: IEvent[][]) {
  const futureEvents = groupedEvents.filter(events => !isAfter(events[events.length - 1].DTEND));

  const startNextEvent = futureEvents[0][0].DTSTART;
  const endNextEvent = futureEvents[0][futureEvents[0].length - 1].DTEND;
  if (isAfter(startNextEvent) && !isAfter(endNextEvent)) {
    return `Event is now live`;
  } else {
    const distance = distanceInWords(startNextEvent);
    if (distance === '0 seconds') {
      return 'Event is now live';
    }

    return `Next event in ${distance}`;
  }
}

interface IProps {
  groupedEvents: IEvent[][];
}

export function Countdown({ groupedEvents: events }: IProps) {
  return <div>{calculateTimeLeft(events)}</div>;
}
