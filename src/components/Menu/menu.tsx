import React, { useState, useEffect, createContext } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';
import { Context } from '@emotion/stylis';

type MenuMode = 'horizontal' | 'vertical';
type SubMenuMode = 'pop' | 'inline';
type SelectCallBack = (selectIndex: string) => void;

export interface MenuProps {
  mode?: MenuMode;
  subMode?: SubMenuMode;
  defaultIndex?: string[];
  className?: string;
  style?:React.CSSProperties;
  onSelect?:SelectCallBack;
  multiple?: boolean;
}
 
interface IMenuContext {
  selectKey: string[];
  onSelect?: SelectCallBack;
  mode?:MenuMode;
  subMode?: SubMenuMode;
}

export const MenuContext = createContext<IMenuContext>({selectKey: []})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode,
    subMode,
    defaultIndex,
    className,
    style,
    onSelect,
    multiple,
    children
  } = props;

  const [ currentActive, setActive ] = useState(defaultIndex ? defaultIndex : []);

  useEffect(() => {
    // 检查children是否为MenuItem或SubMenu
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

  // children的样式
  const passedContext: IMenuContext = {
    selectKey: currentActive ? [...currentActive] : [],
    onSelect: handleClick,
    mode,
    subMode,
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
  subMode: 'pop',
  multiple: false,
}
export default Menu;