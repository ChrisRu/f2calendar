import React, { useEffect } from 'react';
import styled from 'styled-components';
import { parseICS } from '../services/ICSParser';

const Code = styled.code`
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
`;

function App() {
  const [data, setData] = React.useState('');

  useEffect(() => {
    void fetch('/f2_calendar.ics')
      .then(res => res.text())
      .then(parseICS)
      .then(data => setData(JSON.stringify(data, null, 4)));
  }, []);

  return <Code>{data}</Code>;
}

export default App;
