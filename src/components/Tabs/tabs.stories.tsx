import React from 'react';
import Tabs, {TabsItem} from './tabs';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../Button/button';

const arr = (props: Object) => (
  <Tabs {...props}>
  <TabsItem label="1" key="1" disabled>
    label 1
  </TabsItem>
  <TabsItem label="2" key="2" disabled>
    label 2
  </TabsItem>
  <TabsItem label="3" key="3">
    label 3
  </TabsItem>
  <TabsItem label="4" key="4">
    label 4
  </TabsItem>
  <TabsItem label="5" key="5">
    label 5
  </TabsItem>
  <TabsItem label="6" key="6">
    label 6
  </TabsItem>
  <TabsItem label="7" key="7">
    label 7
  </TabsItem>
  <TabsItem label="6" key="8">
    label 6
  </TabsItem>
  <TabsItem label="7" key="9">
    label 7
  </TabsItem>
  <TabsItem label="6" key="10">
    label 6
  </TabsItem>
  <TabsItem label="7" key="11">
    label 7
  </TabsItem>
  <TabsItem label="4" key="12">
    label 4
  </TabsItem>
  <TabsItem label="5" key="13">
    label 5
  </TabsItem>
  <TabsItem label="6" key="14">
    label 6
  </TabsItem>
  <TabsItem label="7" key="15">
    label 7
  </TabsItem>
  <TabsItem label="6" key="16">
    label 6
  </TabsItem>
  <TabsItem label="7" key="17">
    label 7
  </TabsItem>
  <TabsItem label="4" key="18">
    label 4
  </TabsItem>
  <TabsItem label="5" key="19">
    label 5
  </TabsItem>
  <TabsItem label="6" key="20">
    label 6
  </TabsItem>
  <TabsItem label="7" key="21">
    label 7
  </TabsItem>
  <TabsItem label="6" key="22">
    label 6
  </TabsItem>
  <TabsItem label="7" key="23">
    label 7
  </TabsItem>
  <TabsItem label="6" key="24">
    label 6
  </TabsItem>
  <TabsItem label="7" key="25">
    label 7
  </TabsItem>
  <TabsItem label="4" key="26">
    label 4
  </TabsItem>
  <TabsItem label="5" key="27">
    label 5
  </TabsItem>
  <TabsItem label="6" key="28">
    label 6
  </TabsItem>
  <TabsItem label="7" key="29">
    label 7
  </TabsItem>
  <TabsItem label="6" key="30">
    label 6
  </TabsItem>
  <TabsItem label="7" key="31">
    label 7
  </TabsItem>
  <TabsItem label="4" key="32">
    label 4
  </TabsItem>
  <TabsItem label="5" key="33">
    label 5
  </TabsItem>
  <TabsItem label="6" key="34">
    label 6
  </TabsItem>
  <TabsItem label="7" key="35">
    label 7
  </TabsItem>
  </Tabs>
);
  
const button = <><Button>tesa</Button></>;

storiesOf('Tabs', module)
  .add('基础样式', () => (
    arr({TabPosition: "top", defaultActiveKey: "10", tabBarExtraContent:button})
  ))
  .add('可设置方向', () => (
    arr({TabPosition: "bottom", tabBarExtraContent:button})
  ))
  .add('left', () => (
    arr({TabPosition:"left", style: {height: "500px"}, tabBarExtraContent:button})
  ))
  .add('right', () => (
    arr({TabPosition:"right", style: {height: "500px"}, tabBarExtraContent:button})
  ))