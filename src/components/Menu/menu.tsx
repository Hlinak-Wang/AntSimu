import React, { useState, createContext } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'vertical' | 'horizontal';
type SelectCallBack = (selectIndex: string) => void;

export interface MenuProps {
  mode?: MenuMode;
  defaultIndex?: string;
  className?: string;
  style?:React.CSSProperties;
  onSelect?:SelectCallBack
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallBack;
  mode?:MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" })

const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode,
    defaultIndex,
    className,
    style,
    onSelect,
    children
  } = props;

  const [ currentActive, setActive ] = useState(defaultIndex)

  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode
  }

  const classes = classnames('menu', className, {
    [`menu-${mode}`]: mode
  });

  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })
  }

  return (
    <ul className={classes} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChild()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  mode: 'vertical',
  defaultIndex: "0"
}
export default Menu;