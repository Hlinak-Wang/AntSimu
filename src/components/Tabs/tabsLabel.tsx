import React, { useContext, useRef } from 'react';
import classnames from 'classnames';
import { TabsContext } from './tabs';

interface TabsLabelProps {
  index?: number;
  onTabClick?: (selectIndex: number) => void;
}

const TabsLabel:React.FC<TabsLabelProps> = ({ index, children }) => {

  const context = useContext(TabsContext);
  const Ref = useRef<HTMLLIElement | null>(null)
  const labelClass = classnames('label-item', {
    'active': context.index === index
  })

  function handleClick() {  
    if (context.onTabClick && typeof index == 'number') {
      context.onTabClick(index)
      if (context.setCSS && Ref.current) {
        context.setCSS({
          width: `${Ref.current.clientWidth}px`,
          transform: `translate3d(${Ref.current.offsetLeft}px,0,0)`,
        })
      }
    }
  }

  return (
    <li className={labelClass} onClick={handleClick} ref={Ref}>
      {children}
    </li>
  )
}

TabsLabel.defaultProps = {
  index: 0
}
export default TabsLabel;