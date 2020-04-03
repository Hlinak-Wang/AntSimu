import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
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
}

export type NativeButtonProps = {
    HTMLType: ButtonHTMLType;
  }
  & baseButtonProps
  & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;
 
export type NativeAnchorProps = React.AnchorHTMLAttributes<HTMLElement> & baseButtonProps;

type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { 
    type,
    disabled,
    size,
    children,
    href,
    danger,
    HTMLType,
    onClick,
    ...otherProps
  } = props;
  
  const [clickStatus, setStatus] = useState(true);

  const classes = classnames('btn', {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    [`btn-danger`]: danger,
  })

  function handleClick() {
    setStatus(!clickStatus)
  };

  if (href !== undefined && !disabled) {
    const link_classes = classnames(classes, {disabled: href !== undefined && disabled})
    return (
      <a
        className={link_classes}
        href = {href}
        {...otherProps}
      >
        {children}
      </a>
    );
  } else {
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
          {...otherProps}
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