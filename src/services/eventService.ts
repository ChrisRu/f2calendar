import { compareAsc } from 'date-fns'
import { IEvent } from './calendar'

export function groupEvents(events: IEvent[]) {
  return Object.values(
    events
      .filter(event => event.LOCATION)
      .reduce<{ [x: string]: IEvent[] }>((races, event) => {
        const location = event.LOCATION || '_'

        return {
          ...races,
          [location]: (races[location] || []).concat(event),
        }
      }, {}),
  )
}

export function sortEvents(a: IEvent, b: IEvent) {
  return compareAsc(a.DTEND, b.DTEND)
}

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

  const [_, countryCode] = race

  return countryCode
}
