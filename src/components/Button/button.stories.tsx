import React, { useRef, useEffect, CSSProperties } from 'react';
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import Button, { ButtonSize } from './button';
import { useState } from '@storybook/addons';

storiesOf('button 按钮', module)
  .add('Button', () => {
    const margin: CSSProperties = {marginRight: "10px", marginBottom: "10px"}
    return (
    <div>
      <div>虚线框按钮</div>
      <Button btnType="dash" style={margin}>dash buttom</Button>
      <Button disabled btnType="dash" style={margin}>dash buttom</Button>
      <br />
      <div>标准按钮</div>
      <Button style={margin}>default button</Button>
      <Button disabled style={margin}>default button</Button>
      <br />
      <div>无背景按钮</div>
      <Button btnType="vacuum" style={margin}>vacuum button</Button>
      <Button disabled btnType="vacuum" style={margin}>vacuum button</Button>
    </div>
  )})
  .add('可设置三种大小', () => {
    
    const [size, setSize] = useState<ButtonSize>("mid")
    const margin: CSSProperties = {marginRight: "10px", marginBottom: "10px"}
    return (
      <div>
        <form>
          <label>small</label>
          <input name="size" type="radio" value="small" onChange={() => {setSize("sm")}}/>
          <label>middian</label>
          <input name="size" type="radio" value="default" defaultChecked onChange={() => setSize("mid")}/>
          <label>large</label>
          <input name="size" type="radio" value="large"  onChange={() => setSize("lg")}/>
        </form>
        <Button btnType="dash" size={size} style={margin}>dash button</Button>
        <Button size={size} style={margin}>default button</Button>
        <Button btnType="vacuum" size={size} style={margin}>vacuum button</Button>
      </div>
    )
  }
    
  )
  .add('危险按钮', () => {
    const margin: CSSProperties = {marginRight: "10px", marginBottom: "10px"}
    return (
    <div>
      <Button danger btnType="dash" style={margin}>link</Button>
      <br />
      <Button danger style={margin}>default button</Button>
      <br />
      <Button danger btnType="vacuum" style={margin}>primary button</Button>
    </div>
  )})
  .add('填充整个父级的宽度', () => {
    const margin: CSSProperties = {marginBottom: "10px"}
    return (
    <div> 
      <Button btnType="dash" block style={margin}>link</Button>
      <Button block style={margin}>default button</Button>
      <Button btnType="vacuum" block style={margin}>primary button</Button>
    </div>
  )})