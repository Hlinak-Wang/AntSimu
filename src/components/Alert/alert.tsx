import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

export type AlertType = 'success' | 'info' | 'error' | 'warning';

interface baseAlertProps {
  className?:string;
  style?:React.CSSProperties;
  type: AlertType;
  message: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  closeText?: React.ReactNode;
  onClose?:React.MouseEventHandler<HTMLButtonElement>;
  afterClose?:() => void;
  onClick?:React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?:React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?:React.MouseEventHandler<HTMLDivElement>;
}


const Alert: React.FC<baseAlertProps> = (props) => {
  const { 
    className,
    style,
    type, 
    message, 
    description, 
    closable, 
    closeText,
    onClose,
    afterClose,
    onClick,
    onMouseEnter,
    onMouseLeave
  } = props;
  const [showState, setStatus] = useState(true);
  const handleOnClose:React.MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    setStatus(!showState)
    if (onClose) {
      onClose(e)
    }
  }

  let classes = classnames('alert', className, {
    [`alert-${type}`]: true,
    'alert-closable': closable
  })

  if (closable) {
    return (
      <CSSTransition
        in={showState}
        timeout={300}
        classNames="pull-out-top"
        unmountOnExit
        onExited={afterClose}
      >
        <div 
          className={classes}
          style={style}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <span className="alert-message">
            {message}
          </span>
          <span className="alert-description">
            {description}
          </span>
            <button className="alert-close-button" onClick={handleOnClose}>
                {closeText}
            </button>
          }
        </div>
      </CSSTransition>
    )
  } else {
    return (
      <div 
        className={classes}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className="alert-message">
          {message}
        </span>
        <span className="alert-description">
          {description}
        </span>
      </div>
    )
  }
  
}

Alert.defaultProps = {
  closable: false,
  closeText: "X"
}
export default Alert;