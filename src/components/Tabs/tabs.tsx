import React, { FC, createContext, useState, useEffect } from 'react';
import classnames from 'classnames';
import Scroller from './scroller';
import TabsContent from './tabsContent'
import TabsLabel from './tabsLabel';

type TabsType = 'inline' | 'card';
type TabsSize = 'small' | 'default' | 'large';
type TabPosition = 'top' | 'bottom' | 'right' | 'left';

export interface TabsItemProps {
  label: React.ReactNode;
  closable?: boolean;
  style?:React.CSSProperties;
  disabled?:boolean;
  key: string;
  children:React.ReactNode;
}

interface TabsProps {
  disabled?:boolean;
  children: React.ReactNode;
  type?: TabsType;
  size?: TabsSize;
  defaultActiveKey?: string;
  tabBarExtraContent?: React.ReactNode;
  TabPosition?: TabPosition;
  onTabClick?: Function;
  onNextClick?: Function;
  onPrevClick?: Function;
  style?: React.CSSProperties;
  closable?: boolean;
  onEdit?: (targetIndex: string, action: 'add' | 'remove') => void;
}

export interface ITabsContext {
  activeKey?: string;
  TabPosition?: TabPosition;
  closable?: boolean;
  tabClickRes?: (index: string) => void;
}

export class TabsItem extends React.Component<TabsItemProps>{}

export const TabsContext = createContext<ITabsContext>({});

const Tabs: FC<TabsProps> = (props) => {
  
  const { 
    type, 
    size, 
    defaultActiveKey, 
    tabBarExtraContent, 
    TabPosition, 
    closable, 
    onEdit, 
    onTabClick, 
    style, 
    children 
  } = props;

  const [activeKey, setSelect] = useState(defaultActiveKey);

  function handleSelect(index: string) {
    setSelect(index);
    onTabClick && onTabClick();
  }

  const context = {
    activeKey,
    TabPosition,
    closable,
    tabClickRes: handleSelect
  }

  const removeTabs = (targetKey: string, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(targetKey, 'remove')
    }
  }

  const addTabs = (targetKey: string) => {
    if (onEdit) {
      onEdit(targetKey, 'add')
    }
  }

  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName !== 'TabsItem') {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
  }, [children])

  const itemClass = classnames('tabs', 
    `tabs-${type}`, 
    `tabs-${size}`, 
    `tabs-${TabPosition}`
  )

  return (
    <div className={itemClass} style={style}>
      <TabsContext.Provider value={context}>
        {
          TabPosition === 'bottom' || TabPosition === 'right'
          ? <>
            <TabsContent 
              items={children}
            />
            <div className="tabs-labels-container">
              {tabBarExtraContent}
              <TabsLabel 
                items={children}
              />
            </div>
            
          </>
          : <>
            <div className="tabs-labels-container">
              {tabBarExtraContent}
              <TabsLabel 
                items={children}
              />
            </div>
            <TabsContent 
              items={children}
            />
          </>
        }
      </TabsContext.Provider>
    </div>
  )
}

Tabs.defaultProps = {
  type: 'inline',
  size: 'default',
  TabPosition: 'top',
  closable: false,
}

export default Tabs;