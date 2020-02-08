import React from 'react'
import styled from 'styled-components'
import addDays from 'date-fns/addDays'
import { weeks } from './constants'
import { Day, WeekDay } from './Day'
import { IEvent } from '../../services/calendarService'

const daysInTheWeek = 7

const MonthWrapper = styled.div`
  margin: 1em 2em;
`

const DaysWrapper = styled.div`
  width: ${2.1 * daysInTheWeek}rem;
  text-align: center;
`

const MonthName = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
`

interface IProps {
  name: string
  dayAmount: number
  startDate: Date
  getEvents: (day: Date) => IEvent[]
}

export function Month({ name, dayAmount, startDate, getEvents }: IProps) {
  function prefixMonthDays(day: Date) {
    const prefill = (day.getDay() === 0 ? 7 : day.getDay()) - 1

    return Array(prefill)
      .fill(undefined)
      .map((_, i) => addDays(startDate, -i - 1))
      .reverse()
  }

  function postfixMonthDays(index: number, monthSize: number) {
    return Array(daysInTheWeek - 1 - (monthSize % daysInTheWeek))
      .fill(undefined)
      .map((_, i) => addDays(startDate, index + 1 + i))
  }

  const days = Array(dayAmount)
    .fill(undefined)
    .map((_, i) => addDays(startDate, i))
    .reduce((month, day, index, arr) => {
      if (index === 0) {
        month = prefixMonthDays(day)
        month.push(day)
        return month
      }

      if (index === arr.length - 1 && (month.length + 1) % daysInTheWeek !== 0) {
        month.push(day)
        month.concat(postfixMonthDays(index, month.length - 1))
        return month
      }

      month.push(day)
      return month
    }, [] as Date[])

  return (
    <MonthWrapper>
      <MonthName>{name}</MonthName>
      <DaysWrapper>
        {weeks.map(day => (
          <WeekDay key={day + name} title={day}>
            {day.charAt(0)}
          </WeekDay>
        ))}
        {days.map(day => (
          <Day key={day.toString()} month={name} day={day} events={getEvents(day)} />
        ))}
      </DaysWrapper>
    </MonthWrapper>
  )
}
