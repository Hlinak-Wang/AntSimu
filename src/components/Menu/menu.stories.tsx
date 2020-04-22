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
      <Menu mode="top">
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <SubMenu title="sub">
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
      </Menu>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>底部菜单</p>
      <Menu mode="bottom">
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <SubMenu title="sub">
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
      </Menu>
    </>
  ))
  .add('垂直菜单', () => (
    <> 
      <Menu mode="left" style={{width: "256px", float: "left"}}>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <SubMenu title="sub">
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
      </Menu>
      <Menu mode="right" style={{width: "256px", float: "right"}}>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <MenuItem>
          123
        </MenuItem>
        <SubMenu title="sub">
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
          <MenuItem>
            123
          </MenuItem>
        </SubMenu>
      </Menu>
    </>
  ))