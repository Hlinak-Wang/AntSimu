import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, MouseEventHandler, useState } from 'react';
import classnames from 'classnames';
import omit from 'omit.js';

export type ButtonSize = 'sm' | 'lg';

export type ButtonType = 'primary' | 'default' | 'link';

export type ButtonHTMLType = 'button' | 'submit' | 'reset';

interface baseButtonProps {
  className ?: string;
  /**设置Button是否为禁用 */
  disabled ?: boolean;
  /**设置Button的尺寸 */
  size?: ButtonSize;
  /**设置Button的类型 */
  type?: ButtonType;
  children?: ReactNode;
  href?: string;
  danger?:boolean;
  HTMLType?: string;
  block?: boolean;
}

export type NativeButtonProps = {
    HTMLType: ButtonHTMLType;
    onClick?: MouseEventHandler<HTMLElement>
  }
  & baseButtonProps
  & Omit<ButtonHTMLAttributes<HTMLElement>, 'type' | 'oncLick'>;
 
export type NativeAnchorProps = {
  onClick?:MouseEventHandler<HTMLElement>
}
& baseButtonProps
& Omit<AnchorHTMLAttributes<HTMLElement>, 'onClick'>;

export type ButtonProps = Partial<NativeAnchorProps & NativeButtonProps>;

/**
 * 这是Button组件
 * ## Button header
 * ~~~js
 * import Button from xxx
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { 
    className,
    type,
    disabled,
    size,
    children,
    danger,
    block,
    ...propsLeft
  } = props;
  
  const [clickStatus, setStatus] = useState(false);

  const handleClick:React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { onClick } = props;
    setStatus(true);
    
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
      'btn-danger': danger,
      'btn-block': block,
      disabled: href !== undefined && disabled,
      'animated swing': clickStatus
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
      'btn-danger': danger,
      'btn-block': block,
      'click-animate': clickStatus
    })
    return (
      <button
        className={classes}
        disabled = {disabled}
        type={HTMLType}
        onClick = {handleClick}
        onAnimationEnd={() => setStatus(false)}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  danger: false,
  type: 'default',
  HTMLType: 'button',
}

export default Button;