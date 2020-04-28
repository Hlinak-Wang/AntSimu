import React, { useContext } from 'react';
import classnames from 'classnames';
import { TabsContext, TabsItemProps } from './tabs';

export interface TabsContentProps {
  items: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ items }) => {

  const context = useContext(TabsContext);

  return (
    <div className="tabs-content-container">
      {
        React.Children.map(items , child => {
          const childElement = child as React.FunctionComponentElement<TabsItemProps>;
          const displayName = childElement.type.displayName || childElement.type.name;
          if (displayName !== 'TabsItem') {
            console.error("Tabs has a child which is not TabsItem component")
          }
          const cls = classnames('tabs-content', {
            'active': context.activeKey !== undefined && context.activeKey === childElement.key,
            'diabled': childElement.props.disabled
          })
          return <div className={cls} style={childElement.props.style ? childElement.props.style : {}}>{childElement.props.children}</div>;
        })
      }
    </div>
  )
}


export default TabsContent;