import React, { FC, useContext, MouseEvent, useEffect, useState } from 'react';
import { selectContext } from './select';

import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export interface OptionProps {
  /**是否禁用 */
  disabled?: boolean;
  /**选中该 Option 后显示在Input框里的额内容 */
  label: string;
  /**默认根据此属性值进行筛选 */
  value: string | number;
  /**Option 器类名 */
  className?: string;
}

export const Option: FC<OptionProps> = (props) => {

  const {
    label,
    value,
    className,
    disabled,
    children,
  } = props;

  const context = useContext(selectContext);
  const [activeStatus, setActiveStatus] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    context.changeSelect && context.changeSelect(label);
  } 

  useEffect(() => {
    if (context.tagShow.includes(label)) {
      setActiveStatus(true)
    } else if (context.tagHide.includes(label)) {
      setActiveStatus(true)
    } else  {
      setActiveStatus(false)
    }

  }, [context.tagShow, context.tagHide])

  const cls = classnames('select-option', className, {
   " select-option-active": activeStatus,
    'select-option-disabled': disabled,
  })

  return (
    <div className={cls} onClick={handleClick}>
      {children}
      <CSSTransition
        in={activeStatus}
        timeout={300}
        classNames="test-animate"
      >
        <span className="test"/>
      </CSSTransition>
      
    </div>
  )
}

Option.defaultProps = {
  disabled: false,

}
export default Option;