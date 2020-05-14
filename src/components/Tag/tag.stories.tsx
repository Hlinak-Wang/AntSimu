import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag from './tag';

storiesOf('tag', module)
  .add('base', () => (
    <Tag>tag</Tag>
  ))
  .add('closable', () => (
    <Tag closable>closable</Tag>
  ))
  .add('color', () => (
    <div>
      <Tag type="default">default</Tag>
      <Tag type="success">success</Tag>
      <Tag type="info">info</Tag>
      <Tag type="warning">warning</Tag>
      <Tag type="error">error</Tag>
    </div>
    
  ))