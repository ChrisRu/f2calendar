import React, { useState, useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { WindowLocation } from '@reach/router'
import { Footer } from './Footer'
import {
  calendarToDictionary,
  getDateKey,
  transformDates,
  ICalendar,
  IServerEvent,
} from '../services/calendarService'
import { Logo } from './Images/Logo'
import { CalendarIcon } from './Images/Icons'
import { CalendarModal } from './Modals/CalendarModal'
import { CountDown } from './Calendar/CountDown'
import { Year } from './Calendar/Year'

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.1rem;
  white-space: nowrap;

  svg {
    width: 3rem;
    vertical-align: middle;
  }

  span {
    margin-left: 1rem;
    vertical-align: middle;
  }

  @media (max-width: 500px) {
    grid-column: 1 / 3;
    text-align: center;
  }
`

const TopBar = styled.header`
  margin: 2rem auto;
  max-width: 1225px;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
  }

  @media (max-width: 800px) {
    padding: 0 1rem;
  }

  @media (max-width: 500px) {
    grid-template-rows: auto auto auto;
  }
`

const CalendarButton = styled.button`
  margin: 0 auto;
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

  @media (max-width: 1200px) {
    margin-right: 0;
    grid-column: 2;
    grid-row: 1;
  }

  @media (max-width: 500px) {
    margin: 2rem auto 0;
    grid-row: initial;
    grid-column: 1 / 3;
  }
`

interface IProps {
  location: WindowLocation
}

export function App({ location }: IProps) {
  const [year] = useState(new Date().getFullYear())
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
  const [calendarPath, events, dayDictionary] = useMemo(() => {
    const content: ICalendar<IServerEvent> = JSON.parse(data.calendars.nodes[0].internal.content)
      .VCALENDAR[0]
    const calendarPath: string = data.calendars.nodes[0].relativePath.relativePath
    const events = content.VEVENT.map(transformDates)
    const dayDictionary = calendarToDictionary(events)

    console.log(dayDictionary)

    return [calendarPath, events, dayDictionary]
  }, [data])

  function getEvents(day: Date) {
    return dayDictionary[getDateKey(day)] || []
  }

  return (
    <>
      <TopBar>
        <Title>
          <Logo />
          <span>Calendar {year}</span>
        </Title>
        <CountDown events={events} />
        <CalendarButton
          onKeyDown={event => {
            if (event.key === 'Escape') {
              setOpenCalendarModal(false)
            }
          }}
          onClick={() => setOpenCalendarModal(true)}
        >
          <CalendarIcon />
          <span>Add to your own calendar</span>
        </CalendarButton>
      </TopBar>

      <main>
        <Year year={year} getEvents={getEvents} />
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
