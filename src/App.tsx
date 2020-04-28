import React, {useState} from 'react';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsContent';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
import Button from './components/Button/button';
import Animate from './components/Animate/animate';

library.add(fas);

function App() {

  const [show, setShow] = useState(false);

  return (
    <div className="App" style={{margin: "10px", padding: "10px"}}>
     
    </div>
  );
}

export default App;
