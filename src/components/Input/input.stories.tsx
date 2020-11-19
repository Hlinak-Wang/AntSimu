import React, { useState, useRef, useEffect } from 'react';
import Input from './input';
import Button from '../Button/button';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Control = () => {
  const [value, setValue] = useState("");
  const testRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    console.log(testRef.current!.width);
  }, [testRef])
  return (
    <Input value={value} onChange={e => {setValue(e.target.value)}} ref={testRef}/>
  )
}

const button = <Button>prefix</Button>;

storiesOf('Input', module)
  .add('Input', () => (
    <Input />
  ))
  .add('Input disabled', () => (
    <Input disabled />
  ))
  .add('Input 的尺寸', () => (
    <div>
      <Input size="sm" />
      <br />
      <Input size="mid" />
      <br />
      <Input size="lg" />
    </div>
  ))
  .add('addBefore and addAfter', () => (
    <div>
      <Input addBefore="www." addAfter=".com"/>
      <br />
      <Input addBefore="www."/>
      <br />
      <Input addAfter=".com"/>
    </div>
    
  ))
  .add('inputPrefix and inputSuffix', () => (
    <Input inputPrefix={button} inputSuffix="test" />
  ))
  .add('addon and pre', () => (
    <Input addBefore="www." addAfter=".com" inputPrefix={button} inputSuffix="test"/>
  ))