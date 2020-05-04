import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import SliderBar from './sliderBar';
import classnames from 'classnames';

interface IScroller {
  direction: 'vertical' | 'horizontal';
  activeRef: any;
  prevButton?: React.ReactNode;
  nextButton?: React.ReactNode;
}

const Scroller: React.FC<IScroller> = ({ direction, activeRef, children }) => {

  const containRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);

  const scrollEventCallback = useCallback((e: WheelEvent) => {
    handleScroll(e)
  }, [shiftX, shiftY]);

  function handleScroll(e: WheelEvent) {

    if (e.deltaY <= 0) {
      // scroll top
      if (prevAbleStatus()) {
        e.preventDefault();
      }
      prev();
    } else if (e.deltaY > 0){
      // scroll down
      if (nextAbleStatus()) {
        e.preventDefault();
      }
      next();
    }
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('wheel', scrollEventCallback, { passive: false });
    }
    
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('wheel', scrollEventCallback);
      }
    }
  }, [shiftX, shiftY])


  useEffect(() => {

    if (activeRef && scrollRef.current && containRef.current) {
      if (direction === 'horizontal') {
        if (activeRef.clientWidth + activeRef.offsetLeft + shiftX > containRef.current.clientWidth) {
          setShiftX(-activeRef.offsetLeft);
        } else if (activeRef.offsetLeft < -shiftX) {
          setShiftX(-activeRef.offsetLeft);
        }
      } else if (direction === 'vertical') {

        if (activeRef.clientHeight + activeRef.offsetTop + shiftY > containRef.current.clientHeight) {
          setShiftY(-activeRef.offsetTop);
        } else if (activeRef.offsetTop < -shiftY) {
          setShiftY(-activeRef.offsetTop); 
        }
      }
    }
  }, [activeRef]);

  function prevAbleStatus() {
    if (shiftX || shiftY) {
      return true;
    } else {
      return false;
    }
  }

  function nextAbleStatus() {
    if (containRef.current && scrollRef.current) {
      if (direction === 'horizontal') {
        // check horizontal
        if (shiftX - containRef.current.clientWidth <= -scrollRef.current.clientWidth) {
          return false;
        }
      } else {
        // check vertical
        if (shiftY - containRef.current.clientHeight <= -scrollRef.current.clientHeight) {
          console.log("ver")
          return false;
        }
      }
    } 
    return true;
  }
 
  function prev() {
    if (!containRef.current) {
      console.error("can't get container DOM");
      return;
    }

    if (direction === 'horizontal' && containRef.current) {
      if (shiftX + containRef.current.clientWidth > 0) {
        setShiftX(0);
      } else if (shiftX) {
        setShiftX(shiftX + containRef.current.clientWidth);
      }
    } else if (direction === 'vertical') {
      if (shiftY + containRef.current.clientHeight > 0) {
        setShiftY(0);
      } else if (shiftY) {
        setShiftY(shiftY + containRef.current.clientHeight);
      }
    }
  }

  function next() {
    if (!containRef.current) {
      console.error("can't get container DOM");
      return;
    }

    if (!scrollRef.current) {
      console.error("can't get scroller DOM");
      return;
    }

    if (direction === 'horizontal') {
      if (shiftX - containRef.current.clientWidth <= -scrollRef.current.clientWidth) {
        return;
      }

      if (shiftX - 2 * containRef.current.clientWidth < -scrollRef.current.clientWidth) {
        setShiftX(containRef.current.clientWidth - scrollRef.current.clientWidth);
      } else if (shiftX - containRef.current.clientWidth > -scrollRef.current.clientWidth) {
        setShiftX(shiftX - containRef.current.clientWidth);
      }
    } else if (direction === 'vertical') {
      if ( shiftY - containRef.current.clientHeight <= -scrollRef.current.clientHeight) {
        return;
      }

      if (shiftY - 2 * containRef.current.clientHeight < -scrollRef.current.clientHeight) {
        setShiftY(containRef.current.clientHeight - scrollRef.current.clientHeight);
      } else if (shiftY - containRef.current.clientHeight > -scrollRef.current.clientHeight) {
        setShiftY(shiftY - containRef.current.clientHeight);
      } 
    }
  }

  const prevCls = classnames("prev-button-container", {
    "tabs-btn-diabled": !prevAbleStatus()
  })

  const nextCls = classnames("next-button-container", {
    "tabs-btn-diabled": !nextAbleStatus()
  })

  return (
    <div className="scroll-container">
      <div onClick={prev} className={prevCls}>
        <div className="prev-button"/>
      </div>
      <div onClick={next} className={nextCls}>
        <div className="next-button"/>
      </div>
      <div className="show-container" ref={containRef}>
        <div className="tabs-label" ref={scrollRef} style={{transform: `translate3d(${shiftX}px,${shiftY}px,0px)`}}>
          {children}
          <SliderBar activeRef={activeRef} direction={direction}/>
        </div>
      </div>
    </div>
  );
};

export default Scroller;