import React from 'react';

interface ISliderBar {
  activeRef: any;
  direction: 'horizontal' | 'vertical'
} 

const SliderBar: React.FC<ISliderBar> = ({ activeRef, direction }) => {

  const getStyle = () => {
    if (activeRef) {
      if (direction === 'horizontal') {
        return {
          width: `${activeRef.clientWidth}px`,
          transform: `translate3d(${activeRef.offsetLeft}px,0,0)`,
        }
      } else if (direction === 'vertical') {
        return {
          height: `${activeRef.clientHeight}px`,
          transform: `translate3d(0,${activeRef.offsetTop}px,0)`,
        }
      }
    }
  }

  return (
    <div className="tabs-slider" style={getStyle()} />
  );
};

export default SliderBar;