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
