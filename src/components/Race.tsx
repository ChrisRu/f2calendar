import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { IEvent } from '../hooks/calendarApi';
import { isPast } from '../services/dates';

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
  const eventDate = event.DTSTART ? format(parse(event.DTSTART._value), 'D MMMM') : 'Unknown';
  const eventDateFull = event.DTSTART
    ? format(parse(event.DTSTART._value), 'D MMMM YYYY')
    : 'Unknown';
  const hasHappened = isPast(event.DTEND._value);
  const title = `${eventSummary} at ${eventDateFull}`;

  return (
    <Wrapper isPast={hasHappened} title={title}>
      <RaceType>{eventSummary}</RaceType>
      <RaceDate>{eventDate}</RaceDate>
    </Wrapper>
  );
}
