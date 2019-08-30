import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BellOffIcon, BellIcon } from './Images/Icons'
import {
  requestNotificationPermissions,
  createNotification,
  createNotificationForEvent,
  hasNotificationPermissions,
} from '../services/notificationService'
import { getNextEvent } from '../services/eventService'
import { IEvent } from '../services/calendarService'

const Button = styled.button`
  margin: 0 auto;
  box-sizing: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  padding: 0.3em 0.8em;
  background: #fff;
  color: #555;
  border-radius: 0.3em;
  font-size: 0.8em;
  position: relative;

  span {
    vertical-align: middle;
  }

  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
    width: 1.1rem;
    stroke: #666;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.1);
  }
`

interface IProps {
  events: IEvent[]
}

export function NotificationButton({ events }: IProps) {
  const [hasNotifications, setHasNotifications] = useState<boolean>(false)

  useEffect(() => {
    if (hasNotificationPermissions()) {
      createNotificationForEvent(getNextEvent(events), new Date())
      setHasNotifications(true)
    }
  }, [])

  async function toggleNotifications() {
    if (hasNotifications) {
      await requestNotificationPermissions()
      createNotification('Notifications will now be active!')
      createNotificationForEvent(getNextEvent(events), new Date())
      setHasNotifications(true)
    } else {
      setHasNotifications(false)
    }
  }

  return (
    <Button onClick={toggleNotifications}>
      {hasNotifications ? <BellOffIcon /> : <BellIcon />}
    </Button>
  )
}
