import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import { IEvent } from '../../services/calendarService'
import { getNextEvent } from '../../services/eventService'

const CountDownText = styled.div<{ noContent?: boolean }>`
  margin: -0.2rem auto;
  line-height: ${p => (p.noContent ? '2.4rem' : 'initial')};

  span {
    display: block;
    opacity: 0.7;
    font-size: 0.7rem;
    margin-top: -0.2rem;
  }

  @media (max-width: 1200px) {
    margin: 2rem auto 0;
    grid-column: 1 / 3;
  }
`

interface IProps {
  events: IEvent[]
}

export function CountDown({ events }: IProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  const nextEvent = getNextEvent(events)
  if (!isClient) {
    return <CountDownText />
  }

  if (!nextEvent) {
    return <CountDownText noContent>No upcoming events</CountDownText>
  }

  const currentDate = new Date()
  const isNow = isBefore(currentDate, nextEvent.DTEND) && isAfter(currentDate, nextEvent.DTSTART)
  if (isNow) {
    return (
      <CountDownText>
        Now live!
        <span>
          {nextEvent.SUMMARY} at {nextEvent.LOCATION}
        </span>
      </CountDownText>
    )
  }

  const distance = formatDistance(nextEvent.DTSTART, currentDate)
  return (
    <CountDownText>
      Next event in {distance}
      <span>
        {nextEvent.SUMMARY} at {nextEvent.LOCATION}
      </span>
    </CountDownText>
  )
}
