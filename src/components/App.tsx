import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Footer } from './Footer'
import { parse } from '../services/dates'
import { Year as Calendar } from './Calendar/Year'
import { IPreEvent, IEvent } from '../services/calendar'
import { Logo } from './Images/Logo'
import { CalendarIcon } from './Images/Icons'
import { CalendarModal } from './Modals/CalendarModal'

function parseDate(event: IPreEvent, timeZone: string): IEvent {
  return Object.assign(event, {
    DTSTART: parse(event.DTSTART, timeZone),
    DTEND: parse(event.DTEND, timeZone),
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

interface IProps {
  host: string
  protocol: string
}

export function App({ host, protocol }: IProps) {
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

  const dayDictionary = content.VCALENDAR[0].VEVENT.map((date: IPreEvent) =>
    parseDate(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
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
        </CalendarButton>
      </TopBar>
      <main>
        <Calendar getEvents={getEvents} />
        {calendarModalOpen ? (
          <CalendarModal
            calendarLocation={`//${host}/calendars/${data.calendars.nodes[0].relativePath.relativePath}`}
            protocol={protocol}
            onClose={() => setOpenCalendarModal(false)}
          />
        ) : null}
      </main>
      <Footer />
    </>
  )
}
