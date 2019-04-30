import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Footer } from './Footer'
import { currentDate, parse } from '../services/dates'
import { Calendar } from './Calendar'
import { IPreEvent, IEvent } from '../services/calendar'

function parseDate(event: IPreEvent, timeZone: string) {
  return Object.assign(event, {
    DTSTART: parse(event.DTSTART, timeZone),
    DTEND: parse(event.DTEND, timeZone),
  }) as IEvent
}

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.3rem;

  img {
    width: 70px;
    vertical-align: middle;
    margin-right: 1rem;
  }
`

const TopBar = styled.header`
  margin: 2rem auto 1rem;
  max-width: 1400px;
  display: flex;
  padding: 0 2rem;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`

export function App() {
  const data = useStaticQuery(graphql`
    {
      allIcs(filter: { relativePath: { name: { eq: "f2_calendar" } } }) {
        nodes {
          internal {
            content
          }
        }
      }
    }
  `)

  const content = JSON.parse(data.allIcs.nodes[0].internal.content)

  const calendarName = `Calendar ${currentDate.getFullYear()}`

  function getDateKey(day: Date) {
    return day.getMonth() + ':' + day.getDate()
  }

  const dayDictionary = (content.VCALENDAR[0].VEVENT.map((date: IPreEvent) =>
    parseDate(date, Intl.DateTimeFormat().resolvedOptions().timeZone),
  ) as IEvent[]).reduce(
    (dict, nextDate) => {
      const key = getDateKey(nextDate.DTSTART)
      dict[key] = (dict[key] || []).concat(nextDate)
      return dict
    },
    {} as { [x: string]: IEvent[] },
  )

  function getEvents(day: Date) {
    return dayDictionary[getDateKey(day)] || []
  }

  return (
    <>
      <TopBar>
        <Title>
          <img src="/images/F2-logo.png" />
          {calendarName}
        </Title>
      </TopBar>
      <main>
        <Calendar getEvents={getEvents} />
      </main>
      <Footer />
    </>
  )
}
