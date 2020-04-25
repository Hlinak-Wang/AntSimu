import React, { useContext, useState, useEffect, useRef } from 'react';
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
  const subContainRef = useRef<HTMLLIElement | null>(null)

  function loopCheck(children: React.ReactNode[]):boolean {
    
    for (let i = 0; i < children.length; i++) {
      let childElement = children[i] as React.FunctionComponentElement<MenuItemProps>;
      let displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'SubMenu') {
        let subChild = children[i] as React.FunctionComponentElement<SubMenuProps>;
        let subChildList = React.Children.toArray(subChild.props.children);
        return loopCheck(subChildList);
      } else {
        if (context.selectKey.findIndex(value => value === childElement.props.handleKey) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    console.log("efftec")
    setStatus(false)
    React.Children.forEach(children, child => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      console.log(childElement)
      if (displayName === 'SubMenu') {
        const subChild = child as React.FunctionComponentElement<SubMenuProps>;
        const subChildList = React.Children.toArray(subChild.props.children);
        if (loopCheck(subChildList)) {
          console.log("been")
          setStatus(true);
        }  
      } else {
        console.log(childSelect)
        if (context.selectKey.findIndex(value => value === childElement.props.handleKey) >= 0) {
          console.log("setrue")
          setStatus(true)
        }
      }
    })
    console.log(context.selectKey)
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

  const clickEvent = context.inline
    ? {onClick: handleClick} 
    : {};
  
  const mouseEvent = !context.inline ? {
    onMouseEnter: () => {handleMouse(true, 50)},
    onMouseLeave: () => {handleMouse(false, 50)}
  } : {};

  const renderChild = () => {
    
    const childrenComponent = React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return context.inline 
          ? childElement
          : React.cloneElement(childElement, {
            // 给子级传入handleMouse 函数， 当点击事件在子级触发时执行，并且handleMouse触发以umount父级，并且如果有父级的父级的话在50ms的延迟下再unmount父级的父级
            clickRes: () => {handleMouse(false, 50); setTimeout(() => {clickRes && clickRes()}, 50)}
          })
        
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })

    let subMenuPosition;
    if (clickRes !== undefined || context.mode === 'vertical') {
      subMenuPosition = {top: "0", left: subContainRef.current ? `${subContainRef.current.clientWidth + 5}px` : "50px"}
    } else {
      subMenuPosition = {left: "0", top: subContainRef.current ? `${subContainRef.current.clientHeight + 5}px` : "50px"}
    }

    return (
    <Animate
      in={menuOpen}
      timeout={300}
      classNames={`pull-out-top`}
    >
      <ul 
        className={`subItem-container ${context.inline? 'inline': "outline"}`} 
        style={subMenuPosition}
      >
        {childrenComponent}
      </ul>
    </Animate>
    )
  }
  
  return (
    <li className={classes} {...mouseEvent} ref={subContainRef}>
      <div className="submenu-title" {...clickEvent}>
        { title }
        <div className={`arrow-${context.inline || context.mode === 'horizontal' ? "up-down": "left-right"} ${menuOpen ? 'open' : "" }`}/>
      </div>
      { renderChild() }
    </li>
  )
}

export default SubMenu;
