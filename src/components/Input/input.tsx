import React, { InputHTMLAttributes, ChangeEvent, forwardRef, useImperativeHandle, ReactNode, useState, FocusEvent, createRef } from 'react';
import classnames from 'classnames';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**设置Input的尺寸 */
  size?: 'sm' | 'mid' | 'lg';
  /**设置Input内的前置标签 */
  addBefore?: string | ReactNode;
  /**设置Input内的后置标签 */
  addAfter?: string | ReactNode;
  /**设置Input外的前置标签 */
  inputPrefix?: ReactNode;
  /**设置Input外的后置标签 */
  inputSuffix?: ReactNode;
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

  const { 
    size, 
    addBefore, 
    addAfter, 
    inputPrefix, 
    inputSuffix, 
    onFocus, 
    onBlur, 
    className, 
    style, 
    ...restProps 
  } = props;

  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = createRef<HTMLInputElement>();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current!.focus(),
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

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(event);
    setInputFocus(true);
  }

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(event);
    setInputFocus(false);
  }

  const inputClass = classnames("wrapped-input", {
    [`input-${size}`]: true
  })

  if ('addBefore' in props || 'addAfter' in props) {

    const addonWrapper = classnames("input-addon-wrapper", className);
    const inputContainer = classnames('input-inner-wrapper', {
      'inner-wrapper-focus': inputFocus,
      'with-add-before': addBefore,
      'with-add-after': addAfter
    })

    return (
      <span className={addonWrapper}>
        {addBefore && <span className="input-addBefore">{addBefore}</span>}
        <span className={inputContainer}>
          {inputPrefix}
          <input className={inputClass} ref={inputRef} onFocus={handleOnFocus} onBlur={handleOnBlur} {...restProps} />
          {inputSuffix}
        </span>
        {addAfter && <span className="input-addAfter">{addAfter}</span>}
      </span>
    )
  } else { 
    const inputContainer = classnames('input-inner-wrapper', className, {
      'inner-wrapper-focus': inputFocus,
      'with-add-before': addBefore,
      'with-add-after': addAfter
    })

    return (
      <span className={inputContainer} style={style}>
        {inputPrefix}
        <input className={inputClass} ref={inputRef} onFocus={handleOnFocus} onBlur={handleOnBlur} style={style} {...restProps} />
        {inputSuffix}
      </span>
    )
  }
})

Input.defaultProps = {
  size: 'mid',
}

export default Input;