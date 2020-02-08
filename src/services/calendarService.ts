import parseISO from 'date-fns/parseISO'

export interface IEventBase {
  UID?: string
  DESCRIPTION: string
  'X-WINNER'?: string
  LOCATION?: string
  SEQUENCE: string
  STATUS: string
  SUMMARY: string
  TRANSP: string
}

export interface IServerEvent extends IEventBase {
  DTSTART: string
  DTEND: string
  DTSTAMP: string
  CREATED: string
  'LAST-MODIFIED': string
}

export interface IEvent extends IEventBase {
  DTSTART: Date
  DTEND: Date
  DTSTAMP: string
  CREATED: string
  'LAST-MODIFIED': string
}

export interface ICalendar<T extends IEventBase> {
  PRODID?: string
  VERSION?: string
  CALSCALE: 'string'
  METHOD?: string
  'X-WR-CALNAME'?: string
  'X-WR-TIMEZONE': string
  VEVENT: T[]
}

export function transformDates(event: IServerEvent): IEvent {
  return Object.assign(event, {
    DTSTART: parseISO(event.DTSTART),
    DTEND: parseISO(event.DTEND),
  })
}

export function getDateKey(day: Date) {
  console.log(day)
  return day.toISOString().slice(0, 10)
}

export function calendarToDictionary(events: IEvent[]) {
  type Dict = {
    [date: string]: IEvent[]
  }

  return events.reduce<Dict>((dict, nextDate) => {
    const key = getDateKey(nextDate.DTSTART)
    if (key in dict) {
      dict[key].push(nextDate)
    } else {
      dict[key] = [nextDate]
    }
    return dict
  }, {})
}

export function getTimezone() {
  // Chrome, Firefox
  const timezone = /.*\s(.+)/.exec(
    new Date().toLocaleDateString(navigator.language, { timeZoneName: 'short' }),
  )
  if (timezone !== null) {
    return timezone[1]
  }

  // IE, some loss in accuracy due to guessing at the abbreviation
  // Note: This regex adds a grouping around the open paren as a
  //       workaround for an IE regex parser bug
  const parsedTimezone = new Date().toTimeString().match(/[A-Z](?!.*[(])/g)
  if (parsedTimezone !== null) {
    return parsedTimezone.join('')
  }

  // Fallback
  return Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.split('/')
    .pop()
}
