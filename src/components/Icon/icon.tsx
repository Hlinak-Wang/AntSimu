import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {

  // icon primary
  const { className, theme, ...resetProps } = props
  const cls = classnames(className, {
    [`icon-${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={cls} {...resetProps}/>
  )
}

export default Icon;