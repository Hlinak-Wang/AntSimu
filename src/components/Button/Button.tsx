import React from 'react';
import classnames from 'classnames';

export enum ButtonSize {
  small = 'sm',
  large = 'lg',
}

export enum ButtonType {
  primary = 'primary',
  default = 'default',
  link = 'link',
}

interface baseButtonProps {
  className ?: string;
  disabled ?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
  danger?:boolean
}

const Button: React.FC<baseButtonProps> = (props) => {
  const { 
    btnType,
    disabled,
    size,
    children,
    href,
    danger
  } = props;
  const classes = classnames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    [`btn-danger`]: danger,
    'disabled': (btnType === ButtonType.link) && disabled
  })
  if (btnType === ButtonType.link) {
    return (
      <a
        className={classes}
        href = {href}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled = {disabled}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  danger: false,
  btnType: ButtonType.default
}

export default Button;