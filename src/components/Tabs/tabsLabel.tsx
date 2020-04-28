import React, { useContext, useState, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { TabsContext, TabsItemProps } from './tabs';
import Scroll from './scroller';

interface TabsLabelProps {
  items: React.ReactNode;
}

const TabsLabel:React.FC<TabsLabelProps> = ({ items }) => {
  const [activeNode, setActiveNode] = useState();

  const context = useContext(TabsContext);

  const ActiveCall = useCallback(node => {
    if (node !== null) {
      setActiveNode(node)
    }
  }, []);

  return (
    <Scroll>
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