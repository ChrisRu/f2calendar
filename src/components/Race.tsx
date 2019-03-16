import React from 'react';
import styled from 'styled-components';
import { IEvent } from '../hooks/calendarApi';
import { isAfter, format, parse } from '../services/dates';

const Wrapper = styled.div<{ isPast: boolean }>`
  margin: 0 0.3rem;
  opacity: ${p => (p.isPast ? 0.5 : 1)};
`;

const RaceType = styled.span`
  display: block;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const RaceDate = styled.b`
  margin-top: 0.2rem;
  display: block;
  font-size: 1.1rem;
`;

interface IProps {
  event: IEvent;
}

export function Race({ event }: IProps) {
  const eventSummary = (event.SUMMARY || '').replace(/\s+\(.+\)/, '');
  const eventDate = event.DTSTART ? format(parse(event.DTSTART), 'D MMMM') : 'Unknown';
  const eventDateFull = event.DTSTART ? format(parse(event.DTSTART), 'D MMMM YYYY') : 'Unknown';
  const hasHappened = isAfter(event.DTEND);
  const title = `${eventSummary} at ${eventDateFull}`;

  return (
    <Wrapper isPast={hasHappened} title={title}>
      <RaceType>{eventSummary}</RaceType>
      <RaceDate>{eventDate}</RaceDate>
    </Wrapper>
  );
}
