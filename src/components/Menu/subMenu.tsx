import React, { useContext, useState, useEffect, useRef, CSSProperties, createRef, ReactNode } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem';
import PopUp from '../popUp/PopUp';
import Icon from '../Icon/icon';
import Animate from '../Animate/animate';
import { CSSTransition } from 'react-transition-group';

interface SubMenuProps {
  handleKey: string;
  className?: string;
  title:string;
  disabled?:boolean;
  parent?: () => ReactNode;
  clickRes?: () => void;
  children?: React.ReactNode[];
}

const SubMenu:React.FC<SubMenuProps> = ({ handleKey, className, title, disabled, clickRes, children, parent }) => {

  const [menuOpen, setOpen] = useState(false);
  const [childSelect, setStatus] = useState(false);
  const context = useContext(MenuContext);
  const subContainRef = createRef<HTMLLIElement>()

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
    setStatus(false)
    React.Children.forEach(children, child => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'SubMenu') {
        const subChild = child as React.FunctionComponentElement<SubMenuProps>;
        const subChildList = React.Children.toArray(subChild.props.children);
        if (loopCheck(subChildList)) {
          setStatus(true);
        }  
      } else {
        if (context.selectKey.findIndex(value => value === childElement.props.handleKey) >= 0) {
          setStatus(true)
        }
      }
    })
  }, [context.selectKey])

  const classes = classnames('submenu', "submenu-title", className, {
    'is-disabled': disabled,
    'menu-open': menuOpen,
    'is-active': childSelect
  })

  // 设置窗口关闭时间间隔
  let timer: any;
  const handleMouse = (toggle: boolean, timeOut: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, timeOut)
  }

  // const handleClick = (e:React.MouseEvent) => {
  //   e.preventDefault();
  //   setOpen(!menuOpen);
  // }

  // inline 属性
  // const clickEvent = context.inline
  //   ? {onClick: handleClick} 
  //   : {};
  
  const mouseEvent =  {
    onMouseEnter: () => {handleMouse(true, 50)},
    onMouseLeave: () => {handleMouse(false, 50)}
  };

  // 渲染子组件
  const renderChild = () => {
    
    const childrenComponent = React.Children.map(children, (child) => {
      // 检查子组件是否为MenuItem或SubMenu
      // 若为规定的子组件且渲染模式为inline，为其传入handleMouse函数
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
            // 给子级传入handleMouse 函数， 当点击事件在子级触发时执行，并且handleMouse触发以umount父级，并且如果有父级的父级的话在50ms的延迟下再unmount父级的父级
            clickRes: () => {handleMouse(false, 50); setTimeout(() => {clickRes && clickRes()}, 50)},
            parent: () => subContainRef.current
          })
      } else {
        console.error("Menu has a child which is not MenuItem component")
      }
    })

    if (context.subMode == 'pop') {
      return (
        <PopUp 
          getTriggerNode={() => subContainRef.current} 
          popDirec={context.mode == 'horizontal' && !parent ? 'bottom':'right'}
          popUpStyle={{background: "white", boxShadow: "0 0 3px 1px #666", minWidth:"80px"}}
          arrowSize={8}
        >
          <ul
            className="subMenu-payload"
            //className={`subItem-container ${context.inline? 'inline': "outline"}`} 
          >
            {childrenComponent}
          </ul>
        </PopUp>
      )
    }
  }
  
  return (
    <li className={classes} {...mouseEvent} ref={subContainRef} key={handleKey}>
        { title }
        {/* <div className={`arrow-${context.inline || context.mode === 'horizontal' ? "up-down": "left-right"} ${menuOpen ? 'open' : "" }`}/> */}
      { menuOpen && renderChild() }
    </li>
  )
}

export default SubMenu;
