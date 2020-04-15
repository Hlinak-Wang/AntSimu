import React, {useState} from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';

function App() {
  return (
    <div className="App" style={{margin: "10px", padding: "10px"}}>
      <Tabs onTabClick={() => console.log("hello")} size="large" TabPosition='left' style={{ height: "200px"}}>
        <TabsItem label="testing">
          hello
        </TabsItem>
        <TabsItem label="test">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testing">
          hello
        </TabsItem>
        <TabsItem label="test">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testing">
          hello
        </TabsItem>
        <TabsItem label="test">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
        <TabsItem label="testi">
          hello
        </TabsItem>
      </Tabs>
    </div>
  );
}

export default App;
