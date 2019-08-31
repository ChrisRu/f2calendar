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
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  padding: 0.5rem 0.8rem;
`

const Option = styled.a`
  margin: 0.3rem 0;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #000;
  transition: background-color 0.1s;

  &:hover {
    background-color: #f2f2f2;
  }

  svg {
    width: 1.6rem;
    vertical-align: middle;
    margin-right: 1rem;
  }

  span {
    vertical-align: middle;
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
        <Option href={`http://www.google.com/calendar/render?cid=${protocol}${calendarLocation}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M113.47 309.408L95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
              fill="#fbbb00"
            />
            <path
              d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
              fill="#518ef8"
            />
            <path
              d="M416.253 455.624l.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
              fill="#28b446"
            />
            <path
              d="M419.404 58.936l-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
              fill="#f14336"
            />
          </svg>
          <span>Add to Google Calendar</span>
        </Option>

        <Option href={`webcal:${calendarLocation}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M496 112.011H272c-8.832 0-16 7.168-16 16s7.168 16 16 16h177.376l-98.304 76.448-70.496-44.832-17.152 27.008 80 50.88a15.915 15.915 0 0 0 8.576 2.496c3.456 0 6.944-1.12 9.824-3.36L480 160.715v207.296H272c-8.832 0-16 7.168-16 16s7.168 16 16 16h224c8.832 0 16-7.168 16-16v-256c0-8.832-7.168-16-16-16z"
              fill="#1976d2"
            />
            <path
              d="M282.208 19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256 48A15.955 15.955 0 0 0 0 80.011v352c0 7.68 5.472 14.304 13.056 15.712l256 48c.96.192 1.952.288 2.944.288 3.712 0 7.328-1.28 10.208-3.68a16.006 16.006 0 0 0 5.792-12.32v-448c0-4.768-2.112-9.28-5.792-12.32z"
              fill="#2196f3"
            />
            <path
              d="M144 368.011c-44.096 0-80-43.072-80-96s35.904-96 80-96 80 43.072 80 96-35.904 96-80 96zm0-160c-26.464 0-48 28.704-48 64s21.536 64 48 64 48-28.704 48-64-21.536-64-48-64z"
              fill="#fafafa"
            />
          </svg>
          <span>Add to Outlook</span>
        </Option>

        <Option href={`webcal:${calendarLocation}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 305 305">
            <path d="M40.738 112.119c-25.785 44.745-9.393 112.648 19.121 153.82C74.092 286.523 88.502 305 108.239 305c.372 0 .745-.007 1.127-.022 9.273-.37 15.974-3.225 22.453-5.984 7.274-3.1 14.797-6.305 26.597-6.305 11.226 0 18.39 3.101 25.318 6.099 6.828 2.954 13.861 6.01 24.253 5.815 22.232-.414 35.882-20.352 47.925-37.941 12.567-18.365 18.871-36.196 20.998-43.01l.086-.271a2.5 2.5 0 0 0-1.328-3.066c-.032-.015-.15-.064-.183-.078-3.915-1.601-38.257-16.836-38.618-58.36-.335-33.736 25.763-51.601 30.997-54.839l.244-.152a2.498 2.498 0 0 0 .71-3.511c-18.014-26.362-45.624-30.335-56.74-30.813a50.043 50.043 0 0 0-4.95-.242c-13.056 0-25.563 4.931-35.611 8.893-6.936 2.735-12.927 5.097-17.059 5.097-4.643 0-10.668-2.391-17.645-5.159-9.33-3.703-19.905-7.899-31.1-7.899-.267 0-.53.003-.789.008-26.03.383-50.626 15.275-64.186 38.859z" />
            <path d="M212.101.002c-15.763.642-34.672 10.345-45.974 23.583-9.605 11.127-18.988 29.679-16.516 48.379a2.499 2.499 0 0 0 2.284 2.164c1.064.083 2.15.125 3.232.126 15.413 0 32.04-8.527 43.395-22.257 11.951-14.498 17.994-33.104 16.166-49.77a2.515 2.515 0 0 0-2.587-2.225z" />
          </svg>
          <span>Add to macOS Calendar</span>
        </Option>

        <Option href={`${protocol}${calendarLocation}`}>
          <span>Download file (for other calendars)</span>
        </Option>
      </ContentWrapper>
    </CalendarModalWrapper>
  )
}
