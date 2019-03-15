import React from 'react';
import styled from 'styled-components';
import { IEvent } from '../hooks/calendarApi';
import { Race } from './Race';

const Wrapper = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 1rem;
  border-radius: 12px;
  background: #fff;
  position: relative;
`;

const Background = styled.div<{ big: boolean }>`
  min-width: ${p => (p.big ? 30 : 25)}vw;
  height: ${p => (p.big ? 30 : 20)}vw;
  position: relative;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

const BackgroundImage = styled.div<{ countryCode?: string; big?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0;
  background-color: #888;
  background-image: url(/images/backgrounds/thumbnail/${p => p.countryCode}.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin: -3px;
  filter: blur(${p => (p.big ? 3 : 0)}px);
`;

const Location = styled.h2`
  position: absolute;
  left: 0;
  bottom: 0;
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
  right: 2rem;
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
  hasHappened?: boolean;
  big?: boolean;
  onSelect?: () => void;
}

export function Event({ events, hasHappened = false, big = false, onSelect }: IProps) {
  const location = events[0].LOCATION || 'Unknown Circuit, Unknown';
  const winner = events[events.length - 1]['X-WINNER'];
  const flagSrc = `/images/flags/${events[0]['X-COUNTRY-CODE']}.svg`;
  const circuitName = location.split(', ')[0];
  const eventLocation = location.split(', ')[1];
  const countryCode = events[0]['X-COUNTRY-CODE'];

  return (
    <Wrapper onClick={onSelect}>
      {hasHappened && <EventHappened>{winner ? `Won by ${winner}` : 'Event over'}</EventHappened>}
      <Background big={big}>
        <BackgroundImage big={big} countryCode={countryCode} />
        <Location>
          <Flag src={flagSrc} alt={countryCode} />
          <span>{eventLocation}</span>
          <CircuitName>{circuitName}</CircuitName>
        </Location>
      </Background>
      <Races>
        {events.map(event => (
          <Race key={event.UID} event={event} />
        ))}
      </Races>
    </Wrapper>
  );
}
