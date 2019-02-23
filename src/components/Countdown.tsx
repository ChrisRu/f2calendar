import React from 'react';
import { IEvent } from '../hooks/calendarApi';
import { isPast, distanceInWords } from '../services/dates';

function calculateTimeLeft(groupedEvents: IEvent[][]) {
  const futureEvents = groupedEvents.filter(
    events => !isPast(events[events.length - 1].DTEND._value)
  );

  const startNextEvent = futureEvents[0][0].DTSTART._value;
  if (isPast(startNextEvent)) {
    return `is now live`;
  } else {
    const distance = distanceInWords(startNextEvent);
    return `in ${distance}`;
  }
}

interface IProps {
  groupedEvents: IEvent[][];
}

export function Countdown({ groupedEvents: events }: IProps) {
  return <div>Next event {calculateTimeLeft(events)}</div>;
}
