import React, { Fragment, Component, createElement } from 'react';

import "../src/styles/index.scss";
import './storyStyle.scss';
import { addDecorator, addParameters  } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)


addDecorator(storyWrapper);
addDecorator(withInfo); 
addParameters({
  info: {
    inline: true,
    header: false,
  }
});
 