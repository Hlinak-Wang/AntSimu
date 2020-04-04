import React, {useState} from 'react';
import Button, {ButtonType, ButtonSize, ButtonHTMLType} from './components/Button/button';
import Alert, {AlertType} from './components/Alert/alert';
function App() {
  const message = (
    <p style={{margin: 0}}>alert</p>
  )
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
      <Alert type={AlertType.success} message={message} closable/>
      <Alert type={AlertType.info} message="info" description="description test" closable/>
      <Alert type={AlertType.error} message="error" closable/>
      <Alert type={AlertType.warning} message="warning"/>
    </div>
  );
}

export default App;
