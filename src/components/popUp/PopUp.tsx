import React, { FC, ReactNode, createRef, useState, useEffect, CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import {placeDirec, position} from './popFromPare'

export interface IPopMenu {
  popDirec: placeDirec
  popUpStyle?: CSSProperties
  arrowSize?: number,
  mountTo?: HTMLElement,
  topShift?: number;
  leftShift?: number;
  getTriggerNode: () => ReactNode
}

const PopUp:FC<IPopMenu> = props => {

  const {
    popDirec,
    popUpStyle,
    arrowSize,
    getTriggerNode,
    mountTo,
    topShift,
    leftShift,
    children
  } = props

  const pop = createRef<HTMLDivElement>()
  const [popPosition, setPostion] = useState<CSSProperties>({top: -999, left: -999})

  // reset the position when component mount
  useEffect(() => {
    positionSet()
  }, [])

  const positionSet = () => {
    const triggerNode = getTriggerNode()
    const popNode = pop.current
    if (!triggerNode || !popNode) { return } // 当trigger或自身未mount的时候退出
    const expectPosition = position(popDirec, popNode, triggerNode)
    setPostion({top: expectPosition.top + topShift!, left: expectPosition.left + leftShift!})
  }

  const popClass = classnames('pop-item', {
    [`pop-direc-${popDirec}`]: true,
  })

  let arrowStyle:CSSProperties = {}
  switch (popDirec) {
    case "top": arrowStyle = {borderTopColor: popUpStyle!.background as string}; break;
    case "bottom":  arrowStyle = {borderBottomColor: popUpStyle!.background as string}; break;
    case "right":  arrowStyle = {borderRightColor: popUpStyle!.background as string}; break;
    case "left":  arrowStyle = {borderLeftColor: popUpStyle!.background as string}; break;
  }

  return ReactDOM.createPortal(
    <div 
      className={popClass} 
      style={{...popPosition}} 
      ref={pop}
    >
      <div className="popText-payload" style={{...popUpStyle}}>
        {children}
      </div>
      {
        arrowSize && 
        <div className="popText-arrow" style={{borderWidth: arrowSize, ...arrowStyle}}></div>
      }
    </div>
  , mountTo!)
}

PopUp.defaultProps = {
  popUpStyle: {background: "white", boxShadow: "0 0 5px 1px #333"},
  mountTo: document.body,
  topShift: 0,
  leftShift: 0
}

export default PopUp;