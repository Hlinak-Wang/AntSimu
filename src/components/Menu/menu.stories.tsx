import React from 'react';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';

storiesOf('Menu 菜单', module)
  .add('水平菜单', () => (
    <>
      <p>顶部菜单</p>
      <Menu mode="horizontal">
        <MenuItem handleKey="1">
          123
        </MenuItem>
        <MenuItem handleKey="2">
          123
        </MenuItem>
        <SubMenu title="sub" handleKey="g1">
          <MenuItem handleKey="5">
            123
          </MenuItem>
          <MenuItem handleKey="6">
            123
          </MenuItem>
          <SubMenu title="sub2" handleKey="g2">
          <MenuItem handleKey="51">
            123
          </MenuItem>
          <MenuItem handleKey="61">
            123
          </MenuItem>
        </SubMenu>
        </SubMenu>
      </Menu>
    </>
  ))
  .add('垂直菜单', () => (
    <> 
      <Menu mode="vertical" style={{width: "256px", float: "left"}} inline>
        <MenuItem handleKey="1">
          123
        </MenuItem>
        <MenuItem handleKey="2">
          123
        </MenuItem>
        <SubMenu title="sub" handleKey="g1">
          <MenuItem handleKey="5">
            123
          </MenuItem>
          <MenuItem handleKey="6">
            123
          </MenuItem>

        </SubMenu>
      </Menu>
    </>
  ))
  .add('设置inline属性', () => (
    <Menu mode="horizontal" inline>
        <MenuItem handleKey="1">
          123
        </MenuItem>
        <MenuItem handleKey="2">
          123
        </MenuItem>
        <SubMenu title="sub" handleKey="g1">
          <MenuItem handleKey="5">
            123
          </MenuItem>
          <MenuItem handleKey="6">
            123
          </MenuItem>
          <SubMenu title="sub2" handleKey="g2">
          <MenuItem handleKey="51">
            123
          </MenuItem>
          <MenuItem handleKey="61">
            123
          </MenuItem>
        </SubMenu>
        <MenuItem handleKey="22">
          123
        </MenuItem>
        </SubMenu>
        <MenuItem handleKey="23">
          123
        </MenuItem>
        <MenuItem handleKey="24">
          123
        </MenuItem>
      </Menu>
  ))