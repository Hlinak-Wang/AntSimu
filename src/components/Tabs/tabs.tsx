import React, { createContext, useState, useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import { TabsItemProps } from './tabsItem';
import TabsLabel, { Ilabel } from './tabsLabel';
import Scroller from './scroller';

type TabsType = 'inline' | 'card';
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
  onEdit?: (targetIndex: number, action: 'add' | 'remove') => void;
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
  const [labels, setLabel] = useState<Ilabel[]>([]);
  const testRef = useRef<HTMLDivElement | null>(null);

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

  const removeTabs = (targetIndex: number, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(targetIndex, 'remove')
    }
  }

  const addTabs = (targetIndex: number) => {
    if (onEdit) {
      onEdit(targetIndex, 'add')
    }
  }

  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const disabledLabel = childElement.props.disabled || false;
        const closable = childElement.props.closable || false;
        setLabel(v => [...v, {index, label:childElement.props.label, disabled: disabledLabel, closable}]);
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

  

  return (
    <div className={itemClass} style={style}>
      <TabsContext.Provider value={context}>
        {
          TabPosition === 'bottom' 
          ? <>
            {renderContent()}
            <Scroller 
              activeIndex={context.index} 
              direction={TabPosition === 'bottom' || TabPosition === 'top' ? 'horizontal' : 'vertical'} 
              items={children}
              changeActive={context.onTabClick}
            />
          </>
          : <>
            <Scroller 
              activeIndex={context.index} 
              direction={TabPosition === 'top' ? 'horizontal' : 'vertical'}
              items={children}
              changeActive={context.onTabClick}
            />
            {renderContent()}
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