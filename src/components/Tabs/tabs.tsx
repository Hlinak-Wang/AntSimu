import React, { createContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { TabsItemProps } from './tabsItem';
import TabsLabel, { ITabsLabel } from './tabsLabel';

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
  closable?: boolean;
  onEdit?: (targetKey: number | React.MouseEvent<HTMLElement>, action: 'add' | 'remove') => void;
}

export interface ITabsContext {
  index: number;
  TabPosition?: TabPosition;
  closable?: boolean;
  onTabClick?: (index: number) => void;
}

export const TabsContext = createContext<ITabsContext>({index: 0});

const Tabs: React.FC<TabsProps> = ({ type, size, TabPosition, closable, onEdit, onTabClick, style, children }) => {
  
  const [selectedIndex, setSelect] = useState(0);
  const [labels, setLabel] = useState<ITabsLabel>({
    labels: []
  });

  function handleSelect(index: number) {
    setSelect(index);
    onTabClick && onTabClick();
  }

  const context = {
    index: selectedIndex,
    TabPosition,
    closable,
    onTabClick: handleSelect
  }
  
  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const disabledLabel = childElement.props.disabled || false;
        setLabel(v => ({labels: [...v.labels, {index, label:childElement.props.label, disabled: disabledLabel}], ...v.onTabClick, ...v.style}));
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
  }, [])

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
    return (
      <div className="tabs-content-container">
        {Content}
      </div>
    )
  }

  const itemClass = classnames('tabs', 
    `tabs-${type}`, 
    `tabs-${size}`, 
    `tabs-${TabPosition}`
  )

  const removeTabs = (targetKey: number, e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (onEdit) {
      onEdit(targetKey, 'remove')
    }
  }

  return (
    <div className={itemClass} style={style}>
      <TabsContext.Provider value={context}>
        {
          type === 'editCard'
          ? <button>x</button>
          : null
        }
        {
          TabPosition === 'bottom' 
          ? <>{renderContent()}<TabsLabel {...labels} /></>
          : <><TabsLabel {...labels} />{renderContent()}</>
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