import isAfter from 'date-fns/isAfter'
import closestIndexTo from 'date-fns/closestIndexTo'
import { IEvent } from './calendarService'

const countryData = [
  ['Bahrain', 'SA'],
  ['Baku', 'AZ'],
  ['Barcelona', 'ES'],
  ['de Jerez', 'ES'],
  ['Monaco', 'MC'],
  ['Paul Ricard', 'FR'],
  ['Austria', 'AT'],
  ['Silverstone', 'UK'],
  ['Hungaroring', 'HU'],
  ['Spa-Francorchamps', 'BE'],
  ['Monza', 'IT'],
  ['Sochi', 'RU'],
  ['Abu Dhabi', 'AE'],
]

export function getCountryCode(raceDescription?: string) {
  if (!raceDescription) {
    return ''
  }

  const race = countryData.find(([circuit]) => raceDescription.includes(circuit))
  if (!race) {
    console.error('Unknown circuit: ' + raceDescription)
    return ''
  }

  const [, countryCode] = race

  return countryCode
}

export function getNextEvent(events: IEvent[]): IEvent | undefined {
  const currentDate = new Date()
  const upcomingEvents = events.filter(event => isAfter(event.DTEND, currentDate))
  const closestEventIndex = closestIndexTo(currentDate, upcomingEvents.map(event => event.DTSTART))
  return upcomingEvents[closestEventIndex]
}
