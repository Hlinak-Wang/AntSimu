import React from 'react';
import Tabs from './tabs';
import TabsItem from './tabsItem';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

storiesOf('Tabs', module)
  .add('基础样式', () => (
    <Tabs>
      <TabsItem label="1">
        hello
      </TabsItem>
      <TabsItem label="2">
        hello
      </TabsItem>
      <TabsItem label="3">
        hello
      </TabsItem>
      <TabsItem label="4">
        hello
      </TabsItem>
      <TabsItem label="5">
        hello
      </TabsItem>
      <TabsItem label="6">
        hello
      </TabsItem>
      <TabsItem label="7">
        hello
      </TabsItem>
      <TabsItem label="8">
        hello
      </TabsItem>
      <TabsItem label="9">
        hello
      </TabsItem>
      <TabsItem label="10">
        hello
      </TabsItem>
      <TabsItem label="11">
        hello
      </TabsItem>
      <TabsItem label="12">
        hello
      </TabsItem>
      <TabsItem label="13">
        hello
      </TabsItem>
    </Tabs>
  ))