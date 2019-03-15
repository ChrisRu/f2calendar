import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalendarApi, IEvent } from '../hooks/calendarApi';
import { Footer } from './Footer';
import { Countdown } from './Countdown';
import { currentDate } from '../services/dates';
import { groupEvents, sortEvents } from '../services/eventService';
import { Calendar } from './Calendar';
import { isSameDay, parse } from 'date-fns';

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.3rem;

  img {
    width: 70px;
    vertical-align: middle;
    margin-right: 1rem;
  }
`;

const TopBar = styled.header`
  margin: 2rem auto 1rem;
  max-width: 1400px;
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

  const calendarName = `Calendar ${currentDate.getFullYear()}`;
  const events = data.VEVENT || [];
  const groupedEvents = groupEvents(events.sort(sortEvents));

  return (
    <>
      <TopBar>
        <Title>
          <img src="/images/F2-logo.png" />
          {calendarName}
        </Title>
        <Countdown groupedEvents={groupedEvents} />
      </TopBar>
      <main>
        <Calendar
          getEvent={day => events.find(event => isSameDay(parse(event.DTSTAMP._value), day))}
        />
      </main>
      <Footer />
    </>
  );
}
