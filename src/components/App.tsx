import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Footer } from './Footer'
import { currentDate, parse } from '../services/dates'
import { Calendar } from './Calendar'
import { IPreEvent, IEvent } from '../services/calendar'

function parseDate(event: IPreEvent, timeZone: string): IEvent {
  return Object.assign(event, {
    DTSTART: parse(event.DTSTART, timeZone),
    DTEND: parse(event.DTEND, timeZone),
  })
}

const Title = styled.h1`
  margin: 0;
  padding: 0;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.3rem;

  .gatsby-image-wrapper {
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
  const [calendarName, setCalendarName] = useState('Calendar')

  const data = useStaticQuery(graphql`
    {
      calendars: allIcs(filter: { relativePath: { name: { eq: "f2_calendar" } } }) {
        nodes {
          internal {
            content
          }
        }
      }

      f2Logo: file(relativePath: { eq: "F2-logo.png" }) {
        childImageSharp {
          fixed(width: 70) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const content = JSON.parse(data.calendars.nodes[0].internal.content)

  useEffect(() => {
    setCalendarName(`Calendar ${currentDate().getFullYear()}`)
  }, [])

  function getDateKey(day: Date) {
    return day.getMonth() + ':' + day.getDate()
  }

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
          <Img fixed={data.f2Logo.childImageSharp.fixed} alt="F2 Logo" />
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
