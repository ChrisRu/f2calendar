import React from 'react';
import styled from 'styled-components';
import { useCalendarApi, IEvent } from '../hooks/calendarApi';
import { Event } from './Event';

const Events = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1800px;
  margin: 3rem auto 0;
`;

const Title = styled.h1`
  margin: 0 auto;
  display: block;
`;

export function App() {
  const { data, isLoading, isError } = useCalendarApi('/f2_calendar.ics');

  if (isError) {
    return <div>Something went wrong loading while loading the calendar</div>;
  }

  if (isLoading || !data) {
    return null;
  }

  const calName = data['X-WR-CALNAME'] || `Calendar ${new Date().getFullYear()}`;
  const title = calName
    ? `Calendar ${new Date().getFullYear()}`
    : calName.replace('FORMULA-', 'Formula ');
  const groupedEvents = Object.values(
    (data.VEVENT || []).reduce(
      (races, event) => ({
        ...races,
        [event.LOCATION || 'location']: (races[event.LOCATION || 'location'] || []).concat(event)
      }),
      {} as { [x: string]: IEvent[] }
    )
  );

  return (
    <>
      <Title>{title}</Title>
      <Events>
        {groupedEvents.map(events => (
          <Event key={events[0].UID} events={events} />
        ))}
      </Events>
    </>
  );
}
