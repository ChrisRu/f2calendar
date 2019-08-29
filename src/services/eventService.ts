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
