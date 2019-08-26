import React from 'react'

interface IContentProps {
  summary?: string
  day: Date
  isToday: boolean
}

export function DayContent({ summary, day, isToday }: IContentProps) {
  const dayNumber = day.getDate()
  const title =
    summary ||
    day.toLocaleString('en-uk', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  return <span title={(isToday ? 'Today: ' : '') + title}>{dayNumber}</span>
}
