import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?:boolean;
  className?:string;
  style?:React.CSSProperties;
  clickRes?: () => void
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children,
    clickRes
  } = props;

  const context = useContext(MenuContext)
  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
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