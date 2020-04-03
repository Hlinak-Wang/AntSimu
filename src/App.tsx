import React, {useState} from 'react';
import Button, {ButtonType, ButtonSize, ButtonHTMLType} from './components/Button/Button';

function App() {

  return (
    <div className="App">
      <Button size={ButtonSize.large}>hello</Button>
      <Button type={ButtonType.link} href="https://www.baidu.com" disabled>baidu</Button>
      <Button type={ButtonType.link} disabled>baidu</Button>
      <Button size={ButtonSize.small}>small</Button>
      <Button type={ButtonType.primary}>small</Button>
      <Button type={ButtonType.primary} danger>danger</Button>
      <Button type={ButtonType.primary} disabled HTMLType={ButtonHTMLType.button}>disabled</Button>
      <Button onClick={() => alert("hello")} disabled>disabled</Button>
    </div>
  );
}

export default App;
