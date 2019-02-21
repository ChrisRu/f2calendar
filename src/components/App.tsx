import React from 'react';
import styled from 'styled-components';
import { useCalendarApi, IEvent } from '../hooks/calendarApi';
import { Event } from './Event';

const Events = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1700px;
  margin: 0 auto;
  padding: 1rem;
`;

const Title = styled.h1`
  padding: 0 4rem;
`;

export function App() {
  const { data, isLoading, isError } = useCalendarApi('/f2_calendar.ics');

  if (isError) {
    return <div>Something went wrong loading while loading the calendar</div>;
  }

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <Title>{data['X-WR-CALNAME']}</Title>
      <Events>
        {Object.values(
          data.VEVENT.reduce(
            (races, event) => ({
              ...races,
              [event.LOCATION]: (races[event.LOCATION] || []).concat(event)
            }),
            {} as { [x: string]: IEvent[] }
          )
        ).map(events => (
          <Event key={events[0].DTSTAMP} events={events} />
        ))}
      </Events>
    </>
  );
}
