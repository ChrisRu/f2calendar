import differenceInMilliseconds from 'date-fns/differenceInMilliseconds'
import { IEvent } from './calendarService'

export function hasNotificationPermissions() {
  return 'Notification' in window && Notification.permission === 'granted'
}

export function requestNotificationPermissions() {
  return new Promise<void>((resolve, reject) => {
    if (!('Notification' in window)) {
      reject('This browser does not support system notifications')
    } else if (Notification.permission === 'granted') {
      resolve()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          resolve()
        } else {
          reject('Notification permissions were not granted')
        }
      })
    }
  })
}

export function createNotification(title: string, options?: NotificationOptions) {
  return new Notification(title, {
    icon: '/images/f2-logo.png',
    ...options,
  })
}

let timeout: number
export function createNotificationForEvent(event: IEvent | undefined, currentDate: Date) {
  if (event === undefined) {
    return
  }

  const difference = differenceInMilliseconds(event.DTSTART, currentDate)

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    createNotification('Now live!', {
      body: `${event.SUMMARY} at ${event.LOCATION} is starting now`,
    })
  }, difference)
}
