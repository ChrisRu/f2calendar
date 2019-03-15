import React from 'react';
import { addMonths, getDaysInMonth } from 'date-fns';
import styled from 'styled-components';
import { months } from './util';
import { Month } from './Month';
import { IEvent } from '../../hooks/calendarApi';

const YearWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 14px;
`;

interface IProps {
  getEvent: (day: Date) => IEvent | undefined;
}

export function Year({ getEvent }: IProps) {
  const firstDay = new Date('2019/01/01');

  return (
    <YearWrapper>
      {months.map((month, index) => {
        const startDate = addMonths(firstDay, index);

        return (
          <Month
            getEvent={getEvent}
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
