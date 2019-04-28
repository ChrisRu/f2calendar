import React from 'react'
import styled from 'styled-components'

const Content = styled.p`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  text-align: right;
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
        2019 by <Link href="https://ruigrok.info">Christian Ruigrok</Link>
      </Content>
    </footer>
  )
}
