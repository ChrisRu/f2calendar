import React, { useState, useRef, useLayoutEffect, memo, SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import { months } from './util';
import { IEvent } from '../../hooks/calendarApi';
import { currentDate, isSameDay } from '../../services/dates';
import { Modal } from '../Modal';

enum RaceType {
  Unknown,
  Sprint,
  Feature
}

export const WeekDay = styled.div`
  display: block;
  margin: 0.2em 0.584em -0.2em;
  width: 1.2em;
  height: 1.2em;
  line-height: 1.2em;
  padding: 0.567em;
  float: left;
  color: #1e83c5;
  opacity: 0.5;
  font-size: 0.75rem;
`;

const raceBg = (p: { raceType: RaceType }) => {
  if (p.raceType === RaceType.Sprint) return '#d21e1e';
  if (p.raceType === RaceType.Feature) return '#36b04d';

  return '#1e83c5';
};

const DayWrapper = styled.div<{
  faded?: boolean;
  active?: boolean;
  hasEvent?: boolean;
  raceType: RaceType;
}>`
  opacity: ${p => (p.faded ? 0.2 : 1)};
  display: block;
  margin: 0.5em;
  width: 1em;
  height: 1em;
  line-height: 1em;
  padding: 0.5em;
  font-weight: ${p => (p.active ? 'bold' : 'normal')};
  color: ${p => (p.active ? '#fff' : '#000')};
  background: ${p => (p.active ? raceBg(p) : 'transparent')};
  border-radius: 50%;
  float: left;
  pointer-events: ${p => (p.faded ? 'none' : 'all')};

  ${p => {
    if (!p.hasEvent || p.active) {
      return;
    }

    return css`
      cursor: pointer;

      &:hover {
        &:after {
          transform: translateY(2px);
        }
      }

      &:after {
        content: '';
        display: block;
        position: relative;
        bottom: -0.3em;
        left: -0.4em;
        width: 180%;
        height: 3px;
        background: ${raceBg(p)};
        border-radius: 3rem;
      }
    `;
  }}
`;

interface IContentProps {
  summary?: string;
  day: Date;
  isToday: boolean;
}

function DayContent({ summary, day, isToday }: IContentProps) {
  const dayNumber = day.getDate();
  const title =
    summary ||
    day.toLocaleString('en-uk', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

  return <span title={(isToday ? 'Today: ' : '') + title}>{dayNumber}</span>;
}

interface IProps {
  day: Date;
  month: string;
  event?: IEvent;
}

function DayComponent({ month, day, event }: IProps) {
  const [isOpen, setOpen] = useState(false);
  const [popupLeft, setPopupLeft] = useState(false);
  const [popupTop, setPopupTop] = useState(false);
  const dayRef = useRef<HTMLDivElement>(null);

  function getPosition() {
    if (dayRef.current) {
      const { left, right, top, bottom } = dayRef.current.getBoundingClientRect();

      setPopupLeft(left + right < window.innerWidth);
      setPopupTop(top + bottom < window.innerHeight);
    }
  }

  function openEvent(event: SyntheticEvent) {
    event.stopPropagation();
    getPosition();
    setOpen(true);
  }

  function closeEvent(event: SyntheticEvent) {
    event.stopPropagation();
    setOpen(false);
  }

  const isCurrentMonth = months[day.getMonth()] === month;
  const isCurrentDay = isSameDay(day, currentDate);

  const race = event && event.SUMMARY ? event.SUMMARY.split(' (')[0] : undefined;
  const raceType = race
    ? race.includes('Feature')
      ? RaceType.Feature
      : RaceType.Sprint
    : RaceType.Unknown;

  return (
    <DayWrapper
      faded={!isCurrentMonth}
      active={isOpen || isCurrentDay}
      hasEvent={!!event}
      onClick={event && openEvent}
      raceType={raceType}
      ref={event && dayRef}
    >
      <DayContent isToday={isCurrentDay} summary={event && event.SUMMARY} day={day} />
      {event && isOpen && (
        <Modal event={event} onClose={closeEvent} popupLeft={popupLeft} popupTop={popupTop} />
      )}
    </DayWrapper>
  );
}

export const Day = memo(DayComponent);
