import React, {useState} from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/Button';

function App() {

  return (
    <div className="App">
      <Button size={ButtonSize.large}>hello</Button>
      <Button btnType={ButtonType.link} href="https://www.baidu.com" disabled>baidu</Button>
      <Button btnType={ButtonType.link} href="https://www.baidu.com">baidu</Button>
      <Button size={ButtonSize.small}>small</Button>
      <Button btnType={ButtonType.primary}>small</Button>
      <Button btnType={ButtonType.primary} danger>danger</Button>
      <Button btnType={ButtonType.primary} disabled>disabled</Button>
      <Button disabled>disabled</Button>
    </div>
  );
}

export default App;
