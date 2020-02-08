import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  font-size: 0.9em;
  margin: 2rem 0 5rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.7);

  p {
    margin: 0.3rem;
  }

  a {
    color: #444;

    &:hover {
      color: #000;
    }
  }
`

export function Footer() {
  return (
    <FooterWrapper>
      <p>Your way of finding FIA&nbsp;Formula&nbsp;2 upcoming races, schedules, and calendars.</p>
      <p>
        Also check out <a href="https://f2standings.com">F2 Standings</a>!
      </p>
      <br />
      <p>
        Crafted in 2019 by{' '}
        <a rel="noopener noreferrer" target="_blank" href="https://ruigrok.info">
          Christian&nbsp;Ruigrok
        </a>{' '}
        with artwork from{' '}
        <a rel="noopener noreferrer" target="_blank" href="https://pavelruzicka.com">
          Pavel&nbsp;Růžička
        </a>
        .
      </p>
    </FooterWrapper>
  )
}
