import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'pull-out-top' | 'pull-out-right' | 'pull-out-left' | 'pull-out-bottom';

type AnimateProps = CSSTransitionProps  & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Animate:React.FC<AnimateProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props;

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Animate.defaultProps = {
  appear: true,
  unmountOnExit: true,
  wrapper: false
}

export default Animate;