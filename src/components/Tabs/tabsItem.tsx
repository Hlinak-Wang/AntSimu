import React, { useContext } from 'react';
import classnames from 'classnames';
import { TabsContext } from './tabs';

export interface TabsItemProps {
  label: React.ReactNode;
  index?: number;
  children: React.ReactNode;
}

const TabsItem: React.FC<TabsItemProps> = ({index, children}) => {

  const context = useContext(TabsContext);

  const itemClass = classnames('tabs-content', {
    'active': context.index === index
  })

  return (
    <div className={itemClass}>
      {children}
    </div>
  )
}

export default TabsItem;