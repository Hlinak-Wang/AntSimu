import React, { useContext, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';
import Animate from '../Animate/animate';

interface SubMenuProps {
  index?: string;
  className?: string;
  title:string;
  disabled?:boolean;
  defaultOpen?: boolean;
  clickRes?: () => void;
}

const SubMenu:React.FC<SubMenuProps> = ({ index, className, title, disabled, defaultOpen, clickRes, children }) => {

  const [menuOpen, setOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classnames('submenu', className, {
    'is-disabled': disabled,
    'menu-open': menuOpen,
    'child-selected': index && context.index.indexOf(index) === 0
  })

  let timer: any;
  const handleMouse = (toggle: boolean, timeOut: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, timeOut)
  }

  const handleClick = (e:React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }

  const clickEvent = context.mode === 'left' || context.mode === 'right'
    ? {onClick: handleClick} 
    : {};
  
  const mouseEvent = context.mode !== 'left' && context.mode !== 'right' ? {
    onMouseEnter: () => {handleMouse(true, 50)},
    onMouseLeave: () => {handleMouse(false, 50)}
  } : {};

  const renderChild = () => {
    
    const childrenComponent = React.Children.map(children, (child, childindex) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          key: `${index}-${childindex}`,
          // 给子级传入handleMouse 函数， 当点击事件在子级触发时执行，并且handleMouse触发以umount父级，并且如果有父级的父级的话在50ms的延迟下再unmount父级的父级
          clickRes: () => {handleMouse(false, 50); setTimeout(() => {clickRes && clickRes()}, 50)}
        })
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })

    return (
    <Animate
      in={menuOpen}
      timeout={300}
      classNames={`pull-out-${context.mode}`}
    >
      <ul className="submenu-item">
        {childrenComponent}
      </ul>
    </Animate>
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
