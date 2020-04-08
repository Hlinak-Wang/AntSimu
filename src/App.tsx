import React, {useState} from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  const message = (
    <p style={{margin: 0}}>alert</p>
  )

  return (
    <div className="App">
      <Menu mode="horizontal">
        <MenuItem disabled>
          234
        </MenuItem>
        <MenuItem>
          asdf
        </MenuItem>
        <MenuItem>
          2sgdf
        </MenuItem>
        <SubMenu title="test">
          <MenuItem>
            1
          </MenuItem>
          <MenuItem>
            2
          </MenuItem>
          <MenuItem>
            3
          </MenuItem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
