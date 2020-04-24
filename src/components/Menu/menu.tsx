import React, { useState, useEffect, createContext } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';
import { Context } from '@emotion/stylis';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallBack = (selectIndex: string) => void;

export interface MenuProps {
  mode?: MenuMode;
  defaultIndex?: string[];
  className?: string;
  style?:React.CSSProperties;
  onSelect?:SelectCallBack;
  multiple?: boolean;
  inline?: boolean;
}
 
interface IMenuContext {
  selectKey: string[];
  onSelect?: SelectCallBack;
  mode?:MenuMode;
  inline?:boolean;
}

export const MenuContext = createContext<IMenuContext>({selectKey: []})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode,
    defaultIndex,
    className,
    style,
    onSelect,
    multiple,
    inline,
    children
  } = props;

  const [ currentActive, setActive ] = useState(defaultIndex ? defaultIndex : []);

  useEffect(() => {
    React.Children.forEach(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName !== 'MenuItem' && displayName !== 'SubMenu') {
        console.error("Menu has a child which is not MenuItem or SubMenu component")
      }
    })
  }, [children]);

  
  const handleClick = (index: string) => {
    if (multiple) {
      const activeIndex = currentActive.findIndex(e => e === index);
      if (activeIndex >= 0) {
        setActive(v => {
          const a = [...v]
          a.splice(activeIndex, 1)
          return a;
        });
      } else {
        setActive(v => [...v, index]);
      }
    } else {
      setActive([index]);
    }
    
    onSelect && onSelect(index) 
  }

  const passedContext: IMenuContext = {
    selectKey: currentActive ? [...currentActive] : [],
    onSelect: handleClick,
    mode,
    inline
  }

  const classes = classnames('menu', className, {
    [`menu-${mode}`]: mode
  });

  return (
    <ul className={classes} data-testid="test-menu" style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}


Menu.defaultProps = {
  mode: 'vertical',
  multiple: false,
  inline: false
}
export default Menu;