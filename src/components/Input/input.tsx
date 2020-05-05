import React, { FC, InputHTMLAttributes, ReactElement, ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**设置Input的尺寸 */
  size?: 'sm' | 'mid' | 'lg';
  /**设置Input内容的前缀 */
  inputPrefix?: string | ReactElement;
  /**设置Input内容的后缀 */
  inputSuffix?: string | ReactElement;

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export interface RefInput {
  focus: () => void;
  blur: () => void;
  width: number;
  height: number;
  offsetTop: number;
  offsetLeft: number;
}
export const Input= forwardRef<RefInput, InputProps>((props,ref) => {

  const { size, inputPrefix, inputSuffix, ...restProps } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current!.focus();
    },
    blur: () => {
      inputRef.current!.blur();
    },
    width: inputRef.current!.clientWidth,
    height: inputRef.current!.clientHeight,
    offsetTop: inputRef.current!.offsetTop,
    offsetLeft: inputRef.current!.offsetLeft
  }));

  if ('value' in props) {
    delete restProps.defaultValue;
    if (typeof props.value === 'undefined' || props.value === 'null') {
      restProps.value = "";
    }
  }

  if (inputPrefix || inputSuffix) {
    const cls = classnames('input-group', {
      [`input-${size}`]: size,
    })
    return (
      <span className={cls}>
        {inputPrefix && <span className="input-prefix">{inputPrefix}</span>}
        <input className="input"/>
        {inputSuffix && <span className="input-suffix">{inputSuffix}</span>}
      </span>
    )
  } else { 
    const cls = classnames('input', {
      [`input-${size}`]: size,
    })
    return (
      <input className={cls} {...restProps} ref={inputRef}/>
    )
  }
  
})

Input.defaultProps = {
  size: 'mid',
}

export default Input;