import React from 'react';
import Tabs from './tabs';
import TabsItem from './tabsItem';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

describe('basic test', () => {
  it('should render correctly for different props TabPosition', () => {
    const wrapp = render(<Tabs type="inline" TabPosition="top">
      <TabsItem label="1">hello</TabsItem>
      <TabsItem label="2">123</TabsItem>
    </Tabs>)
    expect(wrapp).toMatchSnapshot();
  })
})