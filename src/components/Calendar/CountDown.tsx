import React, { useEffect, useState } from 'react'
import { IEvent } from '../../services/calendar'
import { formatDistance, isAfter, closestIndexTo } from 'date-fns'
import styled from 'styled-components'
import { isBefore } from 'date-fns/esm'

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

  const currentDate = new Date()
  const upcomingEvents = events.filter(event => isAfter(event.DTEND, currentDate))
  const closestEventIndex = closestIndexTo(currentDate, upcomingEvents.map(event => event.DTSTART))
  const nextEvent = upcomingEvents[closestEventIndex]
  const distance = formatDistance(nextEvent.DTSTART, currentDate)

  if (!isClient) {
    return <CountDownText />
  }

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

  return (
    <CountDownText>
      Next event in {distance}
      <span>
        {nextEvent.SUMMARY} at {nextEvent.LOCATION}
      </span>
    </CountDownText>
  )
}
