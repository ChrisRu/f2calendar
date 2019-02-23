import React from 'react';
import styled from 'styled-components';
import { useCalendarApi, IEvent } from '../hooks/calendarApi';
import { Event } from './Event';
import { Footer } from './Footer';
import { Countdown } from './Countdown';

const Events = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1800px;
  margin: 3rem auto 0;
  padding-right: 2rem;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
`;

const TopBar = styled.header`
  margin: 3rem auto 2rem;
  max-width: 1600px;
  display: flex;
  padding: 0 2rem;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export function App() {
  const { data, isLoading, isError } = useCalendarApi('/f2_calendar.ics');

  if (isError) {
    return <div>Something went wrong loading while loading the calendar</div>;
  }

  if (isLoading || !data) {
    return null;
  }

  const calendarName = data['X-WR-CALNAME'] || `Calendar ${new Date().getFullYear()}`;
  const title = calendarName.replace('FORMULA-', 'Formula ');
  const events = data.VEVENT || [];
  const groupedEvents = Object.values(
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

  return (
    <>
      <TopBar>
        <Title>{title}</Title>
        <Countdown groupedEvents={groupedEvents} />
      </TopBar>
      <Events>
        {groupedEvents.map(events => (
          <Event key={events[0].UID} events={events} />
        ))}
      </Events>
      <Footer />
    </>
  );
}
