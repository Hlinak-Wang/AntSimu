import React, { useContext, useEffect, ReactNode } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';
import Animate from '../Animate/animate';

export interface MenuItemProps {
  handleKey: string;
  disabled?:boolean;
  className?:string;
  style?:React.CSSProperties;
  clickRes?: () => void;
  parent?: () => ReactNode;
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
  const {
    handleKey,
    disabled,
    className,
    style,
    children,
    clickRes
  } = props;
  
  const context = useContext(MenuContext);
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.selectKey.findIndex(v => v === handleKey) >= 0
  });

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(handleKey)
    }
    if (clickRes) {
      clickRes()
    }
  };
  
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem