import React from 'react';
import Tabs, { TabsItem } from './tabs';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

describe('basic test', () => {
  beforeEach(() => {
    cleanup()
  })
  it('should render correctly for different props TabPosition', () => {
    const wrapp = render(<Tabs type="inline" TabPosition="top">
      <TabsItem key="1" label="hello">hello</TabsItem>
      <TabsItem key="2" label="12">123</TabsItem>
    </Tabs>)
    expect(wrapp).toMatchSnapshot()
  })
})