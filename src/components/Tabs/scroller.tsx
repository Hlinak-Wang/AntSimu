import React, { useCallback, useState, useRef, useEffect, useContext } from 'react';
import { TabsContext, TabsItemProps } from './tabs';
import SliderBar from './sliderBar';
import classnames from 'classnames';

interface IScroller {
  direction: 'vertical' | 'horizontal';
  items: React.ReactNode;
}

function getDefaultActiveKey(children: React.ReactNode) {
  let defaultActiveKey: string | undefined = undefined;

  React.Children.forEach(children, child => {
    const childElement = child as React.FunctionComponentElement<TabsItemProps>;
    if (child && !childElement.props.disabled && defaultActiveKey === undefined) {
      defaultActiveKey = childElement.key as string;
    }
  });

  return defaultActiveKey;
}

const Scroller: React.FC<IScroller> = ({ direction, items }) => {

  const containRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);
  const [activeNode, setActiveNode] = useState();
  const context = useContext(TabsContext);

  useEffect(() => {
    if (context.activeKey === undefined) {
      const defaultActiveKey = getDefaultActiveKey(items);
      if (defaultActiveKey !== undefined) {
        context.tabClickRes && context.tabClickRes(defaultActiveKey);
      }
    }
  }, [])

  const ActiveCall = useCallback(node => {
    if (node !== null) {
      setActiveNode(node)
    }
  }, []);

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

  const renderTabs = () => {
    const Label = React.Children.map(items, child => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName !== 'TabsItem') {
        console.error("Tabs has a child which is not TabsItem component");
        return childElement;
      }

      const cls = classnames('label-item', { 
        active: context.activeKey === childElement.key,
        disabled: childElement.props.disabled
      }) 

      return (
        <div 
          onClick={() => context.tabClickRes && context.tabClickRes(childElement.key as string)} 
          ref={context.activeKey === childElement.key ? ActiveCall : null} 
          className={cls}
        >
          {childElement.props.label}
        </div>
      )
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
          {renderTabs()}
          <SliderBar activeRef={activeNode} direction={direction}/>
        </div>
      </div>
    </div>
  );
};

export default Scroller;