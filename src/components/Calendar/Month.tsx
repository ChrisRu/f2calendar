import React from 'react'
import styled from 'styled-components'
import { addDays } from 'date-fns'
import { months, weeks } from './util'
import { Day, WeekDay } from './Day'
import { IEvent } from '../../services/calendar'

const daysInTheWeek = 7

const MonthWrapper = styled.div`
  margin: 1em 2em;
`

const DaysWrapper = styled.div`
  width: ${3 * daysInTheWeek}em;
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
    .reduce(
      (month, day, index, arr) => {
        if (index === 0) {
          return [...prefixMonthDays(day), day]
        }

        if (index === arr.length - 1 && (month.length + 1) % daysInTheWeek !== 0) {
          return [...month, day, ...postfixMonthDays(index, month.length)]
        }

        return [...month, day]
      },
      [] as (Date)[],
    )

  const month = months[startDate.getMonth()]

  return (
    <MonthWrapper>
      <MonthName>{name}</MonthName>
      <DaysWrapper>
        {weeks.map(day => (
          <WeekDay key={day + name} title={day}>
            {day.charAt(0)}
          </WeekDay>
        ))}
        <br />
        {days.map(day => (
          <Day key={day.toString() + name} month={month} day={day} events={getEvents(day)} />
        ))}
      </DaysWrapper>
    </MonthWrapper>
  )
}
