import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  key: string;
  disabled?:boolean;
  className?:string;
  style?:React.CSSProperties;
  clickRes?: () => void
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
  const {
    key,
    disabled,
    className,
    style,
    children,
    clickRes
  } = props;

  const context = useContext(MenuContext)
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': key === context.index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof key === 'string')) {
      context.onSelect(key)
    }
    if (clickRes) {
      clickRes()
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem