import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TabsItemProps } from './tabsItem';
import SliderBar from './sliderBar';
import classnames from 'classnames';

interface IScroller {
  activeIndex: number | string;
  direction: 'vertical' | 'horizontal';
  items: React.ReactNode;
  changeActive: (index: number) => void;
}

const Scroller: React.FC<IScroller> = ({ activeIndex, direction, items, changeActive }) => {

  const containRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);
  const [prevClass, setPrevClass] = useState<string>('');
  const [nextClass, setNextClass] = useState<string>('');
  const [activeNode, setActiveNode] = useState()
  
  const ActiveCall = useCallback(node => {
    if (node !== null) {
      setActiveNode(node)
    }
  }, []);

  const scrollEventCallback = useCallback((e: WheelEvent) => {
    handleScroll(e)
  }, [shiftX, shiftY]);

  function handleScroll(e: WheelEvent) {
    e.preventDefault();
    if (e.deltaY <= 0) {
      // scroll top
      prev();
    } else if (e.deltaY > 0){
      // scroll down
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

  const renderTabs = () => {
    const Label = React.Children.map(items, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const cls = classnames('label-item', { 
          active: activeIndex === index,
          disabled: childElement.props.disabled
        }) 
        
        return (
          <div 
            onClick={() => changeActive(index)} 
            ref={activeIndex === index ? ActiveCall : null} 
            className={cls}
          >
            {childElement.props.label}
          </div>
        )
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
    return Label
  }

  useEffect(() => {
    if (activeNode && scrollRef.current && containRef.current) {
      if (direction === 'horizontal') {
        if (activeNode.clientWidth + activeNode.offsetLeft + shiftX > containRef.current.clientWidth) {
          setShiftX(-activeNode.offsetLeft);
        } else if (activeNode.offsetLeft < -shiftX) {
          setShiftX(-activeNode.offsetLeft);
        }
      } else if (direction === 'vertical') {

        if (activeNode.clientHeight + activeNode.offsetTop + shiftY > containRef.current.clientHeight) {
          setShiftY(-activeNode.offsetTop);
        } else if (activeNode.offsetTop < -shiftY) {
          setShiftY(-activeNode.offsetTop);
        }
      }
    }
  }, [activeNode]);

  /**
   * 提供实时确认 prev和next 按钮的状态（是否为disabled）
   */
  useEffect(() => {
    if (containRef.current && scrollRef.current) {
      if (shiftX || shiftY) {
        setPrevClass('');
      } else {
        setPrevClass('tabs-btn-diabled');
      }
      
      if (shiftX - containRef.current.clientWidth <= -scrollRef.current.clientWidth && shiftY - containRef.current.clientHeight <= -scrollRef.current.clientHeight) {
        setNextClass('tabs-btn-diabled');
      } else {
        setNextClass('');
      }
    }
  }, [scrollRef.current,shiftX, shiftY])

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

  return (
    <div className="tabs-label-container">
      <div onClick={prev} className={classnames("prev-button", prevClass)}>
        prev
      </div>
      <div onClick={next} className={classnames("next-button", nextClass)}>
        next
      </div>
      <div className="show-container" ref={containRef}>
        <div className="tabs-label" ref={scrollRef} style={{transform: `translate3d(${shiftX}px,${shiftY}px,0px)`}}>
          {renderTabs()}
          <SliderBar activeRef={activeNode} direction="horizontal"/>
        </div>
      </div>
    </div>
  );
};

export default Scroller;