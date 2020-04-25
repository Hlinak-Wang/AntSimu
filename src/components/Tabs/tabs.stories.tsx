import React from 'react';
import Tabs from './tabs';
import TabsItem from './tabsItem';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

storiesOf('Tabs', module)
  .add('基础样式', () => (
    <Tabs type="card">
      <TabsItem label="1" disabled>
        label 1
      </TabsItem>
      <TabsItem label="2">
        label 2
      </TabsItem>
      <TabsItem label="3">
        label 3
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
    </Tabs>
  ))
  .add('可设置方向', () => (
    <Tabs TabPosition="bottom" type="card">
      <TabsItem label="1" disabled>
        label 1
      </TabsItem>
      <TabsItem label="2">
        label 2
      </TabsItem>
      <TabsItem label="3">
        label 3
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
    </Tabs>
  ))
  .add('left', () => (
    <Tabs TabPosition="left" type="card">
      <TabsItem label="1">
        label 1
      </TabsItem>
      <TabsItem label="2">
        label 2
      </TabsItem>
      <TabsItem label="3">
        label 3
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
    </Tabs>
  ))
  .add('right', () => (
    <Tabs TabPosition="right" type="card">
      <TabsItem label="1">
        label 1
      </TabsItem>
      <TabsItem label="2">
        label 2
      </TabsItem>
      <TabsItem label="3">
        label 3
      </TabsItem>
      <TabsItem label="4">
        label 4
      </TabsItem>
      <TabsItem label="5">
        label 5
      </TabsItem>
      <TabsItem label="6">
        label 6
      </TabsItem>
      <TabsItem label="7">
        label 7
      </TabsItem>
    </Tabs>
  ))