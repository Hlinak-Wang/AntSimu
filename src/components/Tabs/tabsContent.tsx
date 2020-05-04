import React, { FC, useContext, useState, useCallback } from 'react';
import classnames from 'classnames';
import { TabsContext, TabsItemProps } from './tabs';
import { CSSTransition } from 'react-transition-group';

export interface TabsContentProps {
  items: React.ReactNode;
}

const TabsContent: FC<TabsContentProps> = ({ items }) => {

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

            const cls = classnames("tabs-content", {
              "tabs-content-active": context.activeKey === childElement.key
            })

            return (
                <div 
                  className={cls} style={childElement.props.style ? childElement.props.style : {}}
                >
                {childElement.props.children}
                </div>
            );
          })
        } 
    </div>
  )
}


export default TabsContent;