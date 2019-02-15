import React, { useEffect } from 'react';
import styled from 'styled-components';
import { parseICS } from '../services/ICSParser';

const Code = styled.code`
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
  color: #fff;
  max-height: 30vh;
  overflow: hidden;
  display: block;
`;

const Title = styled.h3`
  font-family: sans-serif;
  text-align: center;
  margin: 5rem 0;
  font-size: 3rem;
`;

function App() {
  const [data, setData] = React.useState('');

  useEffect(() => {
    void fetch('/f2_calendar.ics')
      .then(res => res.text())
      .then(parseICS)
      .then(data => setData(JSON.stringify(data, null, 4)));
  }, []);

  return (
    <>
      <Title>Coming soon™</Title>
      <Code>{data}</Code>
    </>
  );
}

export default App;
