import React from 'react'
import styled from 'styled-components'
import { useCalendarApi, IEvent } from '../hooks/calendarApi'
import { Footer } from './Footer'
import { currentDate } from '../services/dates'
import { Calendar } from './Calendar'

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
  const { data, isLoading, isError } = useCalendarApi('/f2_calendar.ics')

  if (isError) {
    return <div>Something went wrong loading while loading the calendar</div>
  }

  if (isLoading || data.length === 0) {
    return null
  }

  const calendarName = `Calendar ${currentDate.getFullYear()}`

  function getDateKey(day: Date) {
    return day.getMonth() + ':' + day.getDate()
  }

  const dayDictionary = data.reduce(
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
