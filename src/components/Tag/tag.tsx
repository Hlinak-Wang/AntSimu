import React, { FC, MouseEvent, HTMLAttributes, CSSProperties } from 'react';
import classnames from 'classnames';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /**设置是否可以关闭 */
  closable?: boolean;
  /**设置预设样式 */
  type?: 'success' | 'warning' | 'info' | 'error' | 'default';
  /**关闭后触发的函数  */
  onClose?:(e: MouseEvent) => void;
  /**设置是否可见 */
  visible?: boolean;
}

export const Tag: FC<TagProps> = (props) => {
  const {
    className,
    closable,
    type,
    color,
    onClose,
    visible,
    style,
    children,
    ...restProps
  } = props;

  const cls = classnames('hlinak-tag', className, {
    'hlinak-tag-closable': closable,
    'hlinak-tag-hidden': !visible,
    [`hlinak-tag-${type}`]: 1
  })

  const handleClick = (e:MouseEvent) => {
    onClose && onClose(e)
  }

  return (
    <span className={cls} style={style} {...restProps}>
      {children}
      {closable
        ? <span className="hlinak-tag-close-btn" onClick={handleClick} style={style ? {color: style.color}: {}}/>
        : null
      }
    </span>
  )
}

Tag.defaultProps = {
  closable: false,
  visible: true,
  type: 'default'
}

export default Tag;