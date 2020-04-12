import React, {useState} from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';

function App() {
  return (
    <div className="App" style={{margin: "10px"}}>
      <Tabs onTabClick={() => console.log("hello")} size="large">
        <TabsItem label="testing">
          hello
        </TabsItem>
        <TabsItem label="hello">
          hello2
        </TabsItem>
        <TabsItem label="asdfasdf">
          hello3
        </TabsItem>
        <TabsItem label="123zxc">
          hello4
        </TabsItem>
      </Tabs>
    </div>
  );
}

export default App;
