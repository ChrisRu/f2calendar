import React from 'react'
import styled from 'styled-components'
import { months } from './constants'
import { Month } from './Month'
import { IEvent } from '../../services/calendar'
import { addMonths, getDaysInMonth } from 'date-fns'

const YearWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 14px;
`

interface IProps {
  getEvents: (day: Date) => IEvent[]
}

export function Year({ getEvents }: IProps) {
  const firstDay = new Date('2019/01/01')

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
