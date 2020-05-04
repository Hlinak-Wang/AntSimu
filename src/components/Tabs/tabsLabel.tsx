import React, { FC, FunctionComponentElement, ReactNode, useContext, useState, useEffect, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { TabsContext, TabsItemProps } from './tabs';
import Scroll from './scroller';

interface TabsLabelProps {
  items: ReactNode;
}

function getDefaultActiveKey(children: ReactNode) {
  let defaultActiveKey: string | undefined = undefined;

  React.Children.forEach(children, child => {
    const childElement = child as FunctionComponentElement<TabsItemProps>;
    if (child && !childElement.props.disabled && defaultActiveKey === undefined) {
      defaultActiveKey = childElement.key as string;
    }
  });

  return defaultActiveKey;
}

const TabsLabel:FC<TabsLabelProps> = ({ items }) => {
  const [activeNode, setActiveNode] = useState();

  useEffect(() => {
    if (context.activeKey === undefined) {
      const defaultActiveKey = getDefaultActiveKey(items);
      if (defaultActiveKey !== undefined) {
        context.tabClickRes && context.tabClickRes(defaultActiveKey);
      }
    }
  }, [])

  const context = useContext(TabsContext);

  const ActiveCall = useCallback(node => {
    if (node !== null) {
      setActiveNode(node)
    }
  }, []);

  return (
    <Scroll
      direction={context.TabPosition === 'bottom' || context.TabPosition === 'top' ? 'horizontal' : 'vertical'} 
      activeRef={activeNode}
    >
    {
      React.Children.map(items, child => {
        const childElement = child as React.FunctionComponentElement<TabsItemProps>;
        const displayName = childElement.type.displayName || childElement.type.name;
        if (displayName !== 'TabsItem') {
          console.error("Tabs has a child which is not TabsItem component");
          return childElement;
        }

        const cls = classnames('label-item', { 
          active: context.activeKey === childElement.key,
          disabled: childElement.props.disabled
        }) 

        return (
          <div 
            onClick={() => context.tabClickRes && context.tabClickRes(childElement.key as string)} 
            ref={context.activeKey === childElement.key ? ActiveCall : null} 
            className={cls}
          >
            {childElement.props.label}
          </div>
        )
      })
    }
    </Scroll>
  )
}

export default TabsLabel;