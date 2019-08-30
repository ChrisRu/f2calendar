import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import formatDistance from 'date-fns/formatDistance'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import { IEvent } from '../../services/calendarService'
import { getNextEvent } from '../../services/eventService'

interface IProps {
  events: IEvent[]
}

const CountDownText = styled.div`
  margin: -0.2rem auto;

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

export function CountDown({ events }: IProps) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => setIsClient(true), [])

  const nextEvent = getNextEvent(events)
  if (!isClient || nextEvent === undefined) {
    return <CountDownText />
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
