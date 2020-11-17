import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, MouseEventHandler, useState } from 'react';
import classnames from 'classnames';

export type ButtonSize = 'sm' | 'mid' | 'lg';

export type ButtonType = "default" | 'dash' | 'vacuum';

export interface baseButtonProps {
  className ?: string;
  /**设置Button是否为禁用 */
  disabled ?: boolean;
  /**设置Button的尺寸 */
  size?: ButtonSize;
  /**设置Button的类型 */
  btnType?: ButtonType;
  children?: ReactNode;
  href?: string;
  danger?:boolean;
  block?: boolean;
}

export type NativeButtonProps = {
    onClick?: MouseEventHandler<HTMLElement>
  }
  & baseButtonProps
  & Omit<ButtonHTMLAttributes<HTMLElement>, 'oncLick'>;
 
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
    btnType,
    disabled,
    size,
    children,
    href,
    danger,
    block,
    ...propsLeft
  } = props;

  const handleClick:React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    const { onClick } = props;  
    onClick &&  (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
  }

  const classes = classnames('btn', className, {
    [`btn-${btnType}-style`]: true,
    [`btn-${size}-size`]: size,
    'btn-danger': danger,
    'btn-block': block,
  })

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={handleClick}
      {...propsLeft}
    >
      <a
        href={href}
      >
        {children}
      </a>
    </button>
  )
}

Button.defaultProps = {
  disabled: false,
  danger: false,
  size: 'mid',
  btnType: 'default',
}

export default Button;