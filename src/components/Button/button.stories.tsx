import React from 'react';
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import Button from './button';


storiesOf('button 按钮', module)
  .add('三种基本按钮类型和其不可用状态', () => (
    <>
      <Button type="link">link</Button>
      <Button disabled type="link">link</Button>
      <br />
      <Button type="default">default button</Button>
      <Button disabled type="default">default button</Button>
      <br />
      <Button type="primary">primary button</Button>
      <Button disabled type="primary">primary button</Button>
    </>
  ))
  .add('可设置三种大小', () => {

    return (
      <>
        <input name="size" type="radio" value="sm" />
        <input name="size" type="radio" value="default" checked/>
        <input name="size" type="radio" value="lg"/>
        <Button type="link">link</Button>
        <Button type="default">default button</Button>
        <Button type="primary">primary button</Button>
      </>
    )
  }
    
  )
  .add('危险按钮', () => (
    <>
      <Button danger type="link">link</Button>
      <br />
      <Button danger type="default">default button</Button>
      <br />
      <Button danger type="primary">primary button</Button>
    </>
  ))
  .add('填充整个父级的宽度', () => (
    <> 
      <Button type="link" block>link</Button>
      <Button type="default" block>default button</Button>
      <Button type="primary" block>primary button</Button>
    </>
  ))