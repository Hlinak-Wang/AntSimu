import React, { useState } from 'react';
import Input from './input';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const Control = () => {
  const [value, setValue] = useState("");
  return (
    <Input value={value} onChange={e => {setValue(e.target.value)}} />
  )
}


storiesOf('Input', module)
  .add('Input', () => (
    <Input />
  ))
  .add('Input disabled', () => (
    <Input disabled />
  ))
  .add('Input prefix 和 suffix', () => (
    <Input inputPrefix="hello" inputSuffix="sss" />
  ))
  .add('Input 的尺寸', () => (
    <div>
      <Input size="sm" />
      <Input size="mid" />
      <Input size="lg" />
    </div>
  ))
  .add('test', () => (
    <Control />
  ))