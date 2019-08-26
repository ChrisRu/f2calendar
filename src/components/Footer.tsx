import React from 'react'
import styled from 'styled-components'

const Content = styled.p`
  font-size: 0.9em;
  max-width: 1200px;
  margin: 2rem auto 5rem;
  padding: 1rem 2rem;
  text-align: center;

  p {
    margin: 0;
  }
`

const Link = styled.a`
  color: #444;

  &:hover {
    color: #000;
  }
`

export function Footer() {
  return (
    <footer>
      <Content>
        <p>The way to find the FIA Formula 2 upcoming races, schedules and calendars.</p>
        <p>
          Crafted in 2019 by{' '}
          <Link rel="noopener" target="_blank" href="https://ruigrok.info">
            Christian Ruigrok
          </Link>{' '}
          with artwork from{' '}
          <Link rel="noopener" target="_blank" href="https://pavelruzicka.com">
            Pavel Růžička
          </Link>
          .
        </p>
      </Content>
    </footer>
  )
}
