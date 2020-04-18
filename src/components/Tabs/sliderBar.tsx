import React, { useState, useEffect } from 'react';

interface ISliderBar {
  activeRef: React.MutableRefObject<HTMLDivElement | null>;
  direction: 'horizontal' | 'vertical'
} 

const SliderBar: React.FC<ISliderBar> = ({ activeRef, direction }) => {

  const [sliderCSS, setSliderCSS] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (activeRef.current) {
      if (direction === 'horizontal') {
        setSliderCSS({
          width: `${activeRef.current.clientWidth}px`,
          transform: `translate3d(${activeRef.current.offsetLeft}px,0,0)`,
        })
      } else if (direction === 'vertical') {
        setSliderCSS({
          height: `${activeRef.current.clientHeight}px`,
          transform: `translate3d(0,${activeRef.current.offsetTop}px,0)`,
        })
      }
    }
  }, [activeRef.current])

  return (
    <div className="tabs-slider" style={sliderCSS} />
  );
};

export default SliderBar;