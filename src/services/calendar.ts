export interface ICalendar<T extends IGenericEvent> {
  PRODID?: string
  VERSION?: string
  CALSCALE: 'string'
  METHOD?: string
  'X-WR-CALNAME'?: string
  'X-WR-TIMEZONE': string
  VEVENT: T[]
}

export interface IGenericEvent {
  UID?: string
  DESCRIPTION: string
  'X-WINNER'?: string
  LOCATION?: string
  SEQUENCE: string
  STATUS: string
  SUMMARY: string
  TRANSP: string
}

export interface IPreEvent extends IGenericEvent {
  DTSTART: string
  DTEND: string
  DTSTAMP: string
  CREATED: string
  'LAST-MODIFIED': string
}

export interface IEvent extends IGenericEvent {
  DTSTART: Date
  DTEND: Date
  DTSTAMP: string
  CREATED: string
  'LAST-MODIFIED': string
}
