import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import omit from 'omit.js';

export enum ButtonSize {
  small = 'sm',
  large = 'lg',
}

export enum ButtonType {
  primary = 'primary',
  default = 'default',
  link = 'link',
}

export enum ButtonHTMLType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

interface baseButtonProps {
  className ?: string;
  disabled ?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  children?: React.ReactNode;
  href?: string;
  danger?:boolean;
  HTMLType?: string;
}

export type NativeButtonProps = {
    HTMLType: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>
  }
  & baseButtonProps
  & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type' | 'oncLick'>;
 
export type NativeAnchorProps = {
  onClick?:React.MouseEventHandler<HTMLElement>
}
& baseButtonProps
& Omit<React.AnchorHTMLAttributes<HTMLElement>, 'onClick'>;

export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { 
    className,
    type,
    disabled,
    size,
    children,
    danger,
    ...propsLeft
  } = props;
  
  const [clickStatus, setStatus] = useState(true);

  const handleClick:React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { onClick } = props;
    setStatus(!clickStatus);
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }

  const linkButtonProps = omit(propsLeft as NativeAnchorProps, ['HTMLType']);

  if (linkButtonProps.href !== undefined && !disabled) {
    const href = linkButtonProps.href;
    const classes = classnames('btn', className, {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
      [`btn-danger`]: danger,
      disabled: href !== undefined && disabled
    })

    return (
      <a
        className={classes}
        href = {href}
        onClick={handleClick}
        {...linkButtonProps}
      >
        {children}
      </a>
    );
  } else {
    const { HTMLType, ...buttonProps} = propsLeft;
    const classes = classnames('btn', className, {
      [`btn-${type}`]: type,
      [`btn-${size}`]: size,
      [`btn-danger`]: danger,
    })
    return (
      <CSSTransition
        in={clickStatus}
        timeout={500}
        classNames="click"
      >
        <button
          className={classes}
          disabled = {disabled}
          type={HTMLType}
          onClick = {handleClick}
          {...buttonProps}
        >
          {children}
        </button>
      </CSSTransition>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  danger: false,
  type: ButtonType.default,
  HTMLType: ButtonHTMLType.button,
}

export default Button;