import React from 'react';
import styled from 'styled-components';
import { months } from './util';
import { Month } from './Month';
import { IEvent } from '../../hooks/calendarApi';
import { addMonths, getDaysInMonth } from 'date-fns';

const YearWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 14px;
`;

interface IProps {
  getEvents: (day: Date) => IEvent[];
}

export function Year({ getEvents }: IProps) {
  const firstDay = new Date('2019/01/01');

  return (
    <YearWrapper>
      {months.map((month, index) => {
        const startDate = addMonths(firstDay, index);

        return (
          <Month
            getEvents={getEvents}
            key={startDate.getMonth()}
            name={month}
            dayAmount={getDaysInMonth(startDate)}
            startDate={startDate}
          />
        );
      })}
    </YearWrapper>
  );
}
