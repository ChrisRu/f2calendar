import React from 'react'
import styled from 'styled-components'
import addMonths from 'date-fns/addMonths'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { months } from './constants'
import { Month } from './Month'
import { IEvent } from '../../services/calendarService'

const YearWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 14px;
`

interface IProps {
  year: number
  getEvents: (day: Date) => IEvent[]
}

export function Year({ year, getEvents }: IProps) {
  const firstDay = new Date(year, 0, 1)

  return (
    <YearWrapper>
      {months.map((month, index) => {
        const startDate = addMonths(firstDay, index)

        return (
          <Month
            key={startDate.getMonth()}
            name={month}
            startDate={startDate}
            dayAmount={getDaysInMonth(startDate)}
            getEvents={getEvents}
          />
        )
      })}
    </YearWrapper>
  )
}
