import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './select';
import Option from './option';

storiesOf('select', module)
  .add('base', () => (
    <Select>
      <Option value="1" label="test1">
        test
      </Option>
      <Option value="2" label="test2">
        test
      </Option>
    </Select>
  ))
  .add('mutiple', () => (
    <Select mutiple allowEnter autoFocus listHeight={300} maxTagCount={2}>
      <Option value="1" label="test1">
        test1
      </Option>
      <Option value="2" label="test2">
        test2
      </Option>
      <Option value="3" label="test3">
        3
      </Option>
      <Option value="4" label="test4">
      test4
      </Option>
      <Option value="5" label="test5">
      test5
      </Option>
      <Option value="6" label="test6">
      test6
      </Option>
      <Option value="7" label="test7">
      test7
      </Option>
      <Option value="8" label="test8">
      test8
      </Option>
      <Option value="9" label="test9">
      test9
      </Option>
      <Option value="10" label="10">
      10
      </Option>
      <Option value="11" label="t11">
        t11
      </Option>
      <Option value="12" label="12">
        12
      </Option>
      <Option value="13" label="13">
        13
      </Option>
      <Option value="14" label="14">
        14
      </Option>
      <Option value="15" label="15">
        15
      </Option>
      <Option value="16" label="16">
        16
      </Option>
      <Option value="17" label="18">
        18
      </Option>
      <Option value="19" label="19">
        19
      </Option>
      <Option value="20" label="21">
        21
      </Option>
      <Option value="22" label="22">
        22
      </Option>
      <Option value="23" label="23">
        23
      </Option>
      <Option value="24" label="24">
        24
      </Option>
      <Option value="25" label="25">
        25
      </Option>
      <Option value="26" label="26">
        26
      </Option>
    </Select>
  ))