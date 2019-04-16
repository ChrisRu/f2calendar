import React, { SyntheticEvent } from 'react';
import styled, { keyframes } from 'styled-components';
import { IEvent } from '../hooks/calendarApi';
import { CloseIcon } from './Icons';
import { format } from 'date-fns';
import { getCountryCode } from '../services/eventService';

const Icon = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0.5;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  transition: opacity 0.1s;

  > svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: 1;
  }
`;

const CreateSlideInAnimation = ({
  popupLeft,
  popupTop
}: {
  popupLeft: boolean;
  popupTop: boolean;
}) => keyframes`
  0% {
    transform: scale(0.6) translate(${popupLeft ? '-' : ''}50%, ${popupTop ? '-' : ''}50%);
    opacity: 0;
  }

  100% {
    transform: scale(1) translate(0, 0);
    opacity: 1;
  }
`;

const Card = styled.div<{ country?: string; popupLeft: boolean; popupTop: boolean }>`
  ${p => (p.popupLeft ? 'left' : 'right')}: 100%;
  ${p => (p.popupTop ? 'top' : 'bottom')}: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-bottom: ${p => (p.popupTop ? '1rem' : '-1rem')};
  margin-top: ${p => (p.popupTop ? '-1.5rem' : '1rem')};
  margin-left: ${p => (p.popupLeft ? '2rem' : '0')};
  margin-right: ${p => (p.popupLeft ? '-1.5rem' : '1.5rem')};
  width: 400px;
  height: 250px;
  background-color: #888;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-image: url(/images/backgrounds/thumbnail/${p => p.country}.jpg);
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  overflow: hidden;
  transform-origin: 0 100%;
  animation-name: ${CreateSlideInAnimation};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
  transform-origin: center center;
  animation-play-state: running;

  @media (min-width: 1000px) {
    position: absolute;
  }
`;

const CardInfo = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: #fff;
  padding: 50px 1.2rem 1rem;
  text-align: left;

  img {
    margin-right: 1rem;
    width: 1.5rem;
    display: inline-block;
    vertical-align: middle;
  }

  h4 {
    font-size: 1.1rem;
    margin: 0;
    display: inline-block;
    vertical-align: middle;
  }

  span {
    opacity: 0.7;
    display: block;
    margin-left: 2.5rem;
    margin-top: 0.4rem;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media (max-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const StartTime = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 1;

  span {
    margin: 0.1rem 0 0;
    text-align: center;
    display: block;
  }
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  animation-name: ${FadeInAnimation};
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;

interface IProps {
  event: IEvent;
  popupLeft: boolean;
  popupTop: boolean;
  onClose?: (event: SyntheticEvent) => void;
}

export function Modal({ event, onClose, popupLeft, popupTop }: IProps) {
  const countryCode = getCountryCode(event.LOCATION);
  const flagSrc = `/images/flags/${countryCode}.svg`;

  const location = event.LOCATION || 'Unknown Circuit, Unknown';
  const circuitName = location.split(', ')[0];
  const eventLocation = location.split(', ')[1];
  const raceType = event.SUMMARY ? event.SUMMARY.split(' (')[0] : 'Unknown Race';
  const duration = event.DTSTART.valueOf() - event.DTEND.valueOf();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = format(event.DTSTART, 'HH:mm');

  return (
    <Wrapper>
      <Overlay onClick={onClose} />
      <Card country={countryCode} popupLeft={popupLeft} popupTop={popupTop}>
        <CardInfo>
          <StartTime>
            <span>{duration === 0 ? 'unknown' : localTime}</span>
            <span>{timeZone}</span>
          </StartTime>
          <p>{raceType}</p>
          <img src={flagSrc} />
          <h4>{eventLocation}</h4>
          <span>{circuitName}</span>
          <Icon onClick={onClose}>
            <CloseIcon />
          </Icon>
        </CardInfo>
      </Card>
    </Wrapper>
  );
}
