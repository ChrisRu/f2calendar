import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Footer } from './Footer'
import { Year as Calendar } from './Calendar/Year'
import { IServerEvent, IEvent } from '../services/calendar'
import { Logo } from './Images/Logo'
import { CalendarIcon } from './Images/Icons'
import { CalendarModal } from './Modals/CalendarModal'
import { utcToZonedTime } from 'date-fns-tz'
import { WindowLocation } from '@reach/router'

function transformDates(event: IServerEvent, timeZone: string): IEvent {
  return Object.assign(event, {
    DTSTART: utcToZonedTime(event.DTSTART, timeZone),
    DTEND: utcToZonedTime(event.DTEND, timeZone),
  })
}

function getDateKey(day: Date) {
  return day.getMonth() + ':' + day.getDate()
}

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.1rem;

  svg {
    width: 3rem;
    vertical-align: middle;
  }

  span {
    margin-left: 1rem;
    vertical-align: middle;
  }
`

const TopBar = styled.header`
  margin: 2rem auto;
  max-width: 1225px;
  display: flex;
  padding: 0 2rem;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

const CalendarButton = styled.button`
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  padding: 0.3em 0.8em;
  background: #fff;
  color: #555;
  border-radius: 0.3em;
  font-size: 0.8em;
  position: relative;

  span {
    vertical-align: middle;
  }

  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
    width: 1.1rem;
    stroke: #666;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`

const NewLabel = styled.div`
  position: absolute;
  right: -1em;
  top: -1.3em;
  background: #1283e3;
  padding: 0.2rem 0.5rem;
  border-radius: 5rem;
  font-size: 0.7rem;
  font-weight: bold;
  color: #fff;
`

interface IProps {
  location: WindowLocation
}

export function App({ location }: IProps) {
  const [calendarModalOpen, setOpenCalendarModal] = useState<boolean>(false)
  const data = useStaticQuery(graphql`
    {
      calendars: allIcs(filter: { relativePath: { name: { eq: "f2_calendar" } } }) {
        nodes {
          relativePath {
            relativePath
          }
          internal {
            content
          }
        }
      }
    }
  `)

  const content = JSON.parse(data.calendars.nodes[0].internal.content)
  const calendarPath = data.calendars.nodes[0].relativePath.relativePath

  const dayDictionary = content.VCALENDAR[0].VEVENT.map((date: IServerEvent) =>
    transformDates(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
  ).reduce((dict: { [x: string]: IEvent[] }, nextDate: IEvent) => {
    const key = getDateKey(nextDate.DTSTART)
    dict[key] = (dict[key] || []).concat(nextDate)
    return dict
  }, {})

  function getEvents(day: Date) {
    return dayDictionary[getDateKey(day)] || []
  }

  return (
    <>
      <TopBar>
        <Title>
          <Logo />
          <span>Calendar 2019</span>
        </Title>
        <CalendarButton onClick={() => setOpenCalendarModal(true)}>
          <CalendarIcon />
          <span>Add to your own calendar</span>
          <NewLabel>NEW!</NewLabel>
        </CalendarButton>
      </TopBar>
      <main>
        <Calendar getEvents={getEvents} />
        {calendarModalOpen ? (
          <CalendarModal
            calendarLocation={`//${location.host}/calendars/${calendarPath}`}
            protocol={location.protocol}
            onClose={() => setOpenCalendarModal(false)}
          />
        ) : null}
      </main>
      <Footer />
    </>
  )
}
