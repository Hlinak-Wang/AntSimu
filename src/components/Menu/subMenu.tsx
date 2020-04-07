import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';

interface SubMenuProps {
  index?: string;
  className?: string;
  title:string;
  disabled?:boolean;
  defaultOpen?: boolean;
}

const SubMenu:React.FC<SubMenuProps> = ({ index, className, title, disabled, defaultOpen, children }) => {

  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classnames('submenu', className, {
    'is-disabled': disabled,
    'menu-open': menuOpen
  })

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  const clickEvent = context.mode === 'vertical' 
    ? {onClick: handleClick} 
    : {};
  
  const mouseEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
    onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
  } : {};

  const renderChild = () => {
    const childrenComponent = React.Children.map(children, (child, childindex) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${childindex}`
        })
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })
    return (
      <ul className="submenu-item">
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li key={index} className={classes} {...mouseEvent}>
      <div className="submenu-title" {...clickEvent}>
        { title }
      </div>
      { renderChild() }
    </li>
  )
}

export default SubMenu;
