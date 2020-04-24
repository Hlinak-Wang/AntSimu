import React, { useContext, useState, useEffect } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Animate from '../Animate/animate';

interface SubMenuProps {
  handleKey: string;
  className?: string;
  title:string;
  disabled?:boolean;
  defaultOpen?: boolean;
  clickRes?: () => void;
  children?: React.ReactNode[];
}

const SubMenu:React.FC<SubMenuProps> = ({ handleKey, className, title, disabled, defaultOpen, clickRes, children }) => {

  const [menuOpen, setOpen] = useState(false);
  const [childSelect, setStatus] = useState(false);
  const context = useContext(MenuContext);
  
  function loopCheck(children: React.ReactNode[]):boolean {
    
    for (let i = 0; i < children.length; i++) {
      let childElement = children[i] as React.FunctionComponentElement<MenuItemProps>;
      let displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'SubMenu') {
        let subChild = children[i] as React.FunctionComponentElement<SubMenuProps>;
        let subChildList = React.Children.toArray(subChild.props.children);
        return loopCheck(subChildList);
      } else {
        if (context.selectKey.indexOf(childElement.props.handleKey) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    
    React.Children.forEach(children, child => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      console.log(childElement)
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'SubMenu') {
        
        const subChild = child as React.FunctionComponentElement<SubMenuProps>;
        const subChildList = React.Children.toArray(subChild.props.children);
        if (loopCheck(subChildList)) {
          setStatus(true);
        }        
      } else {
        if (context.selectKey.indexOf(childElement.props.handleKey) >= 0) {
          setStatus(true)
        }
      }
    })
  }, [context.selectKey])

  const classes = classnames('submenu', className, {
    'is-disabled': disabled,
    'menu-open': menuOpen,
    'child-selected': childSelect
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

  const clickEvent = context.mode === 'vertical'
    ? {onClick: handleClick} 
    : {};
  
  const mouseEvent = context.mode === 'horizontal' ? {
    onMouseEnter: () => {handleMouse(true, 50)},
    onMouseLeave: () => {handleMouse(false, 50)}
  } : {};

  const renderChild = () => {
    
    const childrenComponent = React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        if (context.inline) {
          return childElement;
        } else {
          return React.cloneElement(childElement, {
            // 给子级传入handleMouse 函数， 当点击事件在子级触发时执行，并且handleMouse触发以umount父级，并且如果有父级的父级的话在50ms的延迟下再unmount父级的父级
            clickRes: () => {handleMouse(false, 50); setTimeout(() => {clickRes && clickRes()}, 50)}
          })
        }
        
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })

    return (
    <Animate
      in={menuOpen}
      timeout={300}
      classNames={`pull-out-top`}
    >
      <ul className="submenu-item">
        {childrenComponent}
      </ul>
    </Animate>
    )
  }
  
  return (
    <li className={classes} {...mouseEvent}>
      <div className="submenu-title" {...clickEvent}>
        { title }
        <div className={`arrow-${context.mode} ${menuOpen ? 'open' : "" }`}/>
      </div>
      { renderChild() }
    </li>
  )
}

export default SubMenu;
