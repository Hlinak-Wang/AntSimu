import React from 'react';
import classnames from 'classnames';

export interface IconProps {
  shape: 'arrow',
  status: 'left' | 'right' | 'not-allow',
  className?: string
}

const Icon: React.FC<IconProps> = (props) => {

  // icon primary
  const { shape, status, className} = props
  const cls = classnames(className, {
    [`icon-${shape}`]: 1,
    [`icon-${status}`]: 1
  })
  return (

    <span className={cls} />

  )
}

export default Icon;