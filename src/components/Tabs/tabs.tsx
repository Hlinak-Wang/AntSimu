import React, { createContext, useState, useRef } from 'react';
import classnames from 'classnames';
import { TabsItemProps } from './tabsItem';
import TabsLabel from './tabsLabel';

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
}

export interface ITabsContext {
  index: number;
  sliderCSS?: React.CSSProperties;
  setCSS?: ({}) => void;
  onTabClick?: (index: number) => void
}

export const TabsContext = createContext<ITabsContext>({index: 0});

const Tabs: React.FC<TabsProps> = ({ type, size, TabPosition, onTabClick, children }) => {
  
  const [selectedIndex, setSelect] = useState(0);
  const [sliderCSS, setCSS] = useState<React.CSSProperties>({});
  function handleSelect(index: number) {
    setSelect(index);
    onTabClick && onTabClick();
  }

  const context = {
    index: selectedIndex,
    sliderCSS,
    setCSS,
    onTabClick: handleSelect
  }
  
  const renderLabel = () => {
    const Label = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        return React.cloneElement(<TabsLabel>{childElement.props.label}</TabsLabel>, 
        {index})
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
    return Label
  }

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
    <div className={itemClass}>
      <TabsContext.Provider value={context}>
        <ul className="tabs-label">
          {renderLabel()}
          <div className="tabs-slider" style={sliderCSS}></div>
        </ul>
        {renderContent()}
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