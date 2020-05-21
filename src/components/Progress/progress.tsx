import React, { FC } from 'react';
import classnames from 'classnames';

interface ProgressProps {
  type?: 'line' | 'customize';
  path?: string;
  percent: number;
  strokeHeight?: number;
  strokeColor?: string;
  strokeLinecap?: 'round' | 'square';
  showInfo?: boolean;
  status?: 'onProgress' | 'progressFinish' | 'progressFail';
  format?: (percent: number) => string;
}

export const Progress: FC<ProgressProps> = (props) => {

  const {
    type,
    percent,
    strokeHeight,
    strokeColor,
    strokeLinecap,
    showInfo,
    status,
    format,
  } = props;

  const wrapperCls = classnames("hlinak-progress-wrapper", {
    [`hlinak-progress-${type}`]: 1,
  })

  const outerCls = classnames("hlinak-progress-outer-bar");
  const innerCls = classnames("hlinak-progress-inner-bar", {
    [`hlinak-progress-${status}`]: 1
  });

  return (
    <div className={wrapperCls}>
      <div className={outerCls} style={{height: `${strokeHeight}px`}}>
        <div className={innerCls} style={{width: `${percent}%`}} />
      </div>
      { showInfo && <span className="">{percent}%</span> }
    </div>
  )
}

Progress.defaultProps = {
  type: 'line',
  strokeLinecap: 'square',
  strokeHeight: 8,
  status: 'onProgress'
}
export default Progress;