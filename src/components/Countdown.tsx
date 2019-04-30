import React from 'react'
import { currentDate } from '../services/dates'
import { isAfter, distanceInWords } from 'date-fns'
import { IEvent } from '../hooks/calendarApi'

function calculateTimeLeft(groupedEvents: IEvent[][]) {
  const futureEvents = groupedEvents.filter(
    events => !isAfter(currentDate, events[events.length - 1].DTEND),
  )

  const startNextEvent = futureEvents[0][0].DTSTART
  const endNextEvent = futureEvents[0][futureEvents[0].length - 1].DTEND
  if (isAfter(currentDate, startNextEvent) && !isAfter(currentDate, endNextEvent)) {
    return `Event is now live`
  } else {
    const distance = distanceInWords(currentDate, startNextEvent)
    if (distance === '0 seconds') {
      return 'Event is now live'
    }

    return `Next event in ${distance}`
  }
}

interface IProps {
  groupedEvents: IEvent[][]
}

export function Countdown({ groupedEvents: events }: IProps) {
  return <div>{calculateTimeLeft(events)}</div>
}
