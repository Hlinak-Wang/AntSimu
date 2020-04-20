import React, {useState} from 'react';
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core';
import Icon from './components/Icon/icon';
library.add(fas);

function App() {
  const [list, setList] = useState([
    {label: "1", content: "1 content", closable: true},
    {label: "2", content: "2 content", closable: false},
    {label: "3", content: "3 content", closable: false},
    {label: "4", content: "4 content", closable: true},
    {label: "5", content: "5 content", closable: false},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6adsfasdfadsdfadsfadsfasfadsf", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6adsfasdfadsdfadsfadsfasfadsf", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6", content: "6 content", closable: true},
    {label: "6adsfasdfadsdfadsfadsfasfadsf", content: "6 content", closable: true},
  ])

  function remove(targetIndex: number) {
    console.log(targetIndex)
    setList(v => v.splice(targetIndex, 1))
    console.log(list)
  }

  function add(targetIndex: number) {

  }

  const onEdit = (targetIndex: number, action: 'add' | 'remove') => {
    if (action === 'add') {
      add(targetIndex)
    } else if (action === 'remove') {
      remove(targetIndex)
    }
  }

  console.log("rerender")

  return (
    <div className="App" style={{margin: "10px", padding: "10px"}}>
      <Tabs 
        onEdit={onEdit}
        onTabClick={() => console.log("hello")} 
        size="large" 
        TabPosition='left' 
        type="inline"
        style={{height: "300px"}}
        >
        {
          list.map(v => {
            
            return (
              <TabsItem label={v.label} closable={v.closable}>
                {v.content}
              </TabsItem>
            )
          })
        }
      </Tabs>
      <Icon icon="arrow-down" size="10x" theme="danger"/>
    </div>
  );
}

export default App;
