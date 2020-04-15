import React, { createContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { TabsItemProps } from './tabsItem';
import TabsLabel, { ValueType } from './tabsLabel';

type TabsType = 'inline' | 'card' | 'editCard';
type TabsSize = 'small' | 'default' | 'large';
type TabPosition = 'top' | 'bottom' | 'right' | 'left';

interface TabsProps {
  disabled?:boolean;
  children: React.ReactNode;
  type?: TabsType;
  size?: TabsSize;
  TabPosition?: TabPosition;
  onTabClick?: Function;
  onNextClick?: Function;
  onPrevClick?: Function;
  style?: React.CSSProperties;
}

export interface ITabsContext {
  index: number;
  TabPosition?: TabPosition;
  onTabClick?: (index: number) => void;
}

export const TabsContext = createContext<ITabsContext>({index: 0});

const Tabs: React.FC<TabsProps> = ({ type, size, TabPosition, onTabClick, style, children }) => {
  
  const [selectedIndex, setSelect] = useState(0);
  const [labels, setLabel] = useState<ValueType[]>([]);
  function handleSelect(index: number) {
    setSelect(index);
    onTabClick && onTabClick();
  }

  const context = {
    index: selectedIndex,
    TabPosition,
    onTabClick: handleSelect
  }
  
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const disabledLabel = childElement.props.disabled || false;
        setLabel(v => [...v, {index, label:childElement.props.label, disabled: disabledLabel}]);
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
  }, [children])

  const renderContent = () => {
    const Content = React.Children.map(children , (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        return React.cloneElement(childElement, {index})
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
    return Content
  }

  const itemClass = classnames('tabs', 
    `tabs-${type}`, 
    `tabs-${size}`, 
    `tabs-${TabPosition}`
  )

  return (
    <div className={itemClass} style={style}>
      <TabsContext.Provider value={context}>
        {
          TabPosition === 'bottom' 
          ? <><div className="tabs-content-container">{renderContent()}</div><TabsLabel values={labels} /></>
          : <><TabsLabel values={labels} /><div className="tabs-content-container">{renderContent()}</div></>
        }
      </TabsContext.Provider>
    </div>
  )
}

Tabs.defaultProps = {
  type: 'inline',
  size: 'default',
  TabPosition: 'top',
}

export default Tabs;