import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

export enum AlertType {
  success= 'success',
  info= 'info',
  error= 'error',
  warning= 'warning'
}

interface baseAlertProps {
  type: AlertType;
  message: React.ReactNode | string;
  description?: React.ReactNode | string;
  closable?: boolean;
  closeText?: React.ReactNode | string;
}

const Alert: React.FC<baseAlertProps> = (props) => {
  const { type, message, description, closable, closeText } = props;
  const [showState, setStatus] = useState(true);

  let classes = classnames('alert', {
    [`alert-${type}`]: true,
    'alert-closable': closable
  })
  
  return (
    <CSSTransition
      in={showState}
      timeout={500}
      classNames="alertPop"
      unmountOnExit
    >
      <div className={classes}>
        <span className="alert-message">
          {message}
        </span>
        <span className="alert-description">
          {description}
        </span>
        {
          closable 
          ? <button className="alert-close-button" onClick={() => setStatus(!showState)}>
              {closeText}
            </button>
          : null
        }
      </div>
    </CSSTransition>
  )
}

Alert.defaultProps = {
  closable: false,
  closeText: "X"
}
export default Alert;