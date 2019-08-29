import React from 'react'
import styled from 'styled-components'
import { ModalWrapper, Overlay } from '../../styles/Modal'

const CalendarModalWrapper = styled(ModalWrapper)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ContentWrapper = styled.div`
  z-index: 1;
  padding: 0 1rem;
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: row;

  @media (max-width: 800px) {
    flex-flow: column;
  }
`

const Option = styled.div`
  margin: 2rem 1rem;
  max-width: 300px;

  h3 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0;
    margin-bottom: 0.5rem;
  }

  pre {
    margin: 0;
    max-width: 300px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 0.8rem;
  }
`

interface IProps {
  onClose: () => void
  calendarLocation: string
  protocol: string
}

export function CalendarModal({ calendarLocation, protocol, onClose }: IProps) {
  return (
    <CalendarModalWrapper>
      <Overlay onClick={onClose} />
      <ContentWrapper>
        <Option>
          <h3>Google Calendar</h3>
          <p>Copy the following url into your calendar to add the Formula 2 events.</p>
          <pre>
            {protocol}
            {calendarLocation}
          </pre>
        </Option>

        <Option>
          <h3>Outlook and macOS calendar</h3>
          <p>Click the following link to add the Formula 2 events to your calendar.</p>
          <a href={`webcal:${calendarLocation}`} title="Add to calendar">
            Add
          </a>
        </Option>

        <Option>
          <h3>Other (ICS File)</h3>
          <p>Download and import the ICS file into your calendar application of choice.</p>
          <a href={`${protocol}${calendarLocation}`}>Download</a>
        </Option>
      </ContentWrapper>
    </CalendarModalWrapper>
  )
}
