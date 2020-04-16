import React, {useState} from 'react';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';

function App() {
  return (
    <div className="App" style={{margin: "10px", padding: "10px"}}>
      <Tabs onTabClick={() => console.log("hello")} style={{height: "500px"}} size="large" TabPosition='left' type="card">
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
