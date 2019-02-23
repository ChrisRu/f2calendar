import React from 'react';
import styled from 'styled-components';
import { IEvent } from '../hooks/calendarApi';
import { isPast } from '../services/dates';
import { Race } from './Race';

const Wrapper = styled.div<{ isPast: boolean }>`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0 0 2rem 2rem;
  border-radius: 12px;
  background: #fff;
  opacity: ${props => (props.isPast ? 0.5 : 1)};
  position: relative;
  transition: transform 0.1s;
  will-change: transform;

  &:hover {
    transform: scale(1.02);
  }
`;

const BackgroundImage = styled.div<{ countryCode?: string }>`
  width: 400px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 300px;
  border: 0;
  background-color: #888;
  background-image: url(/images/backgrounds/thumbnail/${props => props.countryCode}.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
`;

const Location = styled.h2`
  padding: 5.5rem 1.5rem 1.5rem;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;

const Races = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  padding: 1rem 1rem;
  text-align: center;
`;

const CircuitName = styled.span`
  opacity: 0.8;
  font-weight: normal;
  font-size: 1rem;
  margin-left: 1.9rem;
  display: block;
`;

const EventHappened = styled.span`
  display: block;
  position: absolute;
  top: 2rem;
  right: -1.2rem;
  background: #000;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.3rem 1rem;
  border-radius: 5rem;
  color: #fff;
`;

const Flag = styled.img`
  margin-right: 0.5rem;
`;

interface IProps {
  events: IEvent[];
}

export function Event({ events }: IProps) {
  const location = events[0].LOCATION || 'Unknown Circuit, Unknown';
  const hasHappened = isPast(events[events.length - 1].DTEND._value);
  const winner = events[events.length - 1]['X-WINNER'];
  const flagSrc = `/images/flags/${events[0]['X-COUNTRY-CODE']}.svg`;
  const circuitName = location.split(', ')[0];
  const eventLocation = location.split(', ')[1];
  const countryCode = events[0]['X-COUNTRY-CODE'];

  return (
    <Wrapper isPast={hasHappened}>
      {hasHappened && <EventHappened>{winner ? `Won by ${winner}` : 'Event over'}</EventHappened>}
      <BackgroundImage countryCode={countryCode}>
        <Location>
          <Flag src={flagSrc} alt={countryCode} />
          <span>{eventLocation}</span>
          <CircuitName>{circuitName}</CircuitName>
        </Location>
      </BackgroundImage>
      <Races>
        {events.map(event => (
          <Race key={event.UID} event={event} />
        ))}
      </Races>
    </Wrapper>
  );
}
