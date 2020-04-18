import React, { useContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { TabsContext } from './tabs';

export type Ilabel = {
  index: number;
  label: React.ReactNode;
  disabled: boolean;
  closable: boolean;
}

export type ITabsLabel = {
  labels: Ilabel[];
  style?:React.CSSProperties;
  onTabClick?: (selectIndex: number) => void;
  rmTabs?: (targetIndex: number, e: React.MouseEvent<HTMLElement>) => void;
}

const TabsLabel:React.FC<ITabsLabel> = ({ labels, rmTabs }) => {

  return (
    <div className="show-container">
      <ul className="tabs-label">
        
      </ul>
    </div>
  )
}

export default TabsLabel;