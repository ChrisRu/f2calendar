import React from 'react';
import styled from 'styled-components';
import { format, parse, isAfter } from 'date-fns';
import { IEvent } from '../hooks/calendarApi';

const EventWrapper = styled.div<{ isPast: boolean }>`
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  margin: 0 0 1rem 1rem;
  border-radius: 8px;
  opacity: ${props => (props.isPast ? 0.5 : 1)};

  p {
    margin: 0;
  }
`;

const EventLocation = styled.h2`
  margin: 0;
  padding-bottom: 0.5rem;
`;

const EventRaces = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const EventRace = styled.div<{ isPast: boolean }>`
  margin: 0 1rem;
  opacity: ${props => (props.isPast ? 0.5 : 1)};
`;

const Flag = styled.img`
  margin-right: 0.5rem;
`;

const currentDate = parse('2019/08/04');
function isPast(date: string) {
  return isAfter(currentDate, date);
}

interface IProps {
  events: IEvent[];
}

export function Event({ events }: IProps) {
  return (
    <EventWrapper isPast={isPast(events[events.length - 1].DTSTAMP)}>
      <EventLocation>
        <Flag
          src={`/images/flags/${events[0]['X-COUNTRY-CODE']}.svg`}
          alt={events[0]['X-COUNTRY-CODE']}
        />
        {events[0].LOCATION}
      </EventLocation>
      <EventRaces>
        {events.map(event => (
          <EventRace key={event.SUMMARY} isPast={isPast(event.DTSTAMP)}>
            <b>{event.SUMMARY.replace(/\s+\(.+\)/, '')}</b>
            <p>{format(parse(event.DTSTAMP), 'D MMMM YYYY')}</p>
          </EventRace>
        ))}
      </EventRaces>
    </EventWrapper>
  );
}
