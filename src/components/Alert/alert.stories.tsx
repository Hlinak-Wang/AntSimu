import React from 'react';
import Alert from './alert';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Alert 警告', module)
  .add('基本样式', () => (
    <>
      <Alert type="success" message="success alert"/>
      <Alert type="info" message="info alert"/>
      <Alert type="error" message="error alert"/>
      <Alert type="warning" message="warning alert"/>
    </>
  ))
  .add('可关闭的警告', () => (
    <>
      <Alert type="success" message="success alert" closable/>
      <Alert type="info" message="info alert" closable/>
      <Alert type="error" message="error alert" closable/>
      <Alert type="warning" message="warning alert" closable/>
    </>
  ))