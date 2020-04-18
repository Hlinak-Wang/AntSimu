import React, { useContext, useState, useRef, useEffect } from 'react';
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

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const containRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState<React.CSSProperties>({});
  const [shiftX, setShiftX] = useState<Number>(0);
  const [shiftY, setShiftY] = useState<Number>(0);
  const [prevClass, setPrevClass] = useState<string>('');
  const [nextClass, setNextClass] = useState<string>('');
  const activeRef = useRef<HTMLDivElement | null>(null);

  const renderTabs = () => {
    const Label = React.Children.map(items, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const cls = classnames('label-item', { 
          active: activeIndex === index
        })
        return React.cloneElement(<div onClick={() => changeActive(index)}>{childElement.props.label}</div>, {
          ref: activeIndex === index ? activeRef : null,  
          className: cls
        })
      } else {
        console.error("Tabs has a child which is not TabsItem component")
      }
    })
    return Label
  }

  useEffect(() => {
    if (activeRef.current && scrollRef.current && containRef.current) {

      const ulStyle = scrollRef.current.style.transform;
      let x: number = 0;
      let y: number = 0;
      if (ulStyle) {
        const splitArr = ulStyle.split(/[,px() ]/)
        x = parseInt(splitArr[1]);
        y = parseInt(splitArr[5]);
      }

      if (direction === 'horizontal') {

        if (activeRef.current.clientWidth + activeRef.current.offsetLeft + x > containRef.current.clientWidth) {
          setTransform({
            transform: `translate3d(${-activeRef.current.offsetLeft}px,0px,0px)`,
          })
        } else if (activeRef.current.offsetLeft < -x) {
          setTransform({
            transform: `translate3d(${-activeRef.current.offsetLeft}px,0px,0px)`,
          })
        }
      } else if (direction === 'vertical') {

        if (activeRef.current.clientHeight + activeRef.current.offsetTop + y > containRef.current.clientHeight) {
          setTransform({
            transform: `translate3d(0px,${-activeRef.current.offsetTop}px,0px)`,
          })
        } else if (activeRef.current.offsetTop < -y) {
          setTransform({
            transform: `translate3d(0px,${-activeRef.current.offsetTop}px,0px)`,
          })
        }
      }
    }
  }, [activeIndex]);

  /**
   * 提供实时确认 prev和next 按钮的状态（是否为disabled）
   */
  useEffect(() => {
    if (containRef.current && scrollRef.current) {

      const ulStyle = scrollRef.current.style.transform;
      let x: number = 0;
      let y: number = 0;
      if (ulStyle) {
        const splitArr = ulStyle.split(/[,px() ]/)
        x = parseInt(splitArr[1]);
        y = parseInt(splitArr[5]);
      }
      if (x || y)
      setPrevClass('')
      else 
      setPrevClass('tabs-btn-diabled')

      if (x - containRef.current.clientWidth <= -scrollRef.current.clientWidth && y - containRef.current.clientHeight <= -scrollRef.current.clientHeight)
      setNextClass('tabs-btn-diabled')
      else 
      setNextClass('')
    }
  }, [scrollRef.current && transform])
  
  function getCurrTransform() {
    let x: number = 0;
    let y: number = 0;

    if (scrollRef.current) {
      const ulStyle = scrollRef.current.style.transform;
      if (ulStyle) {
        const splitArr = ulStyle.split(/[,px() ]/)
        x = parseInt(splitArr[1]);
        y = parseInt(splitArr[5]);
      }
    }
    return {x, y}
  }

  function prev() {
    if (!containRef.current) {
      console.error("can't get container DOM");
      return;
    }

    const {x, y} = getCurrTransform();
    if (direction === 'horizontal') {
      if (x + containRef.current.clientWidth > 0) {
        setTransform({
          transform: `translate3d(0px,0px,0px)`,
        })
      } else if (x) {
        setTransform({
          transform: `translate3d(${x + containRef.current.clientWidth}px,0px,0px)`,
        })
      }
    } else if (direction === 'vertical') {
      if (y + containRef.current.clientHeight > 0) {
        setTransform({
          transform: `translate3d(0px,0px,0px)`,
        })
      } else if (y) {
        setTransform({
          transform: `translate3d(0px,${y + containRef.current.clientHeight}px,0px)`,
        })
      }
    }
  }

  function next() {
    if (!containRef.current || !scrollRef.current) {
      console.error("can't get container or scroller DOM");
      return;
    }

    const {x, y} = getCurrTransform();
    if (direction === 'horizontal') {
      if (x - 2 * containRef.current.clientWidth < -scrollRef.current.clientWidth) {
        setTransform({
          transform: `translate3d(${containRef.current.clientWidth - scrollRef.current.clientWidth}px,0px,0px)`,
        })
      } else if (x - containRef.current.clientWidth > -scrollRef.current.clientWidth) {
        setTransform({
          transform: `translate3d(${x - containRef.current.clientWidth}px,0px,0px)`,
        })
      } 
    } else if (direction === 'vertical') {
      if (y - 2 * containRef.current.clientHeight < -scrollRef.current.clientHeight) {
        setTransform({
          transform: `translate3d(0px,${containRef.current.clientHeight - scrollRef.current.clientHeight}px,0px)`,
        })
      } else if (y - containRef.current.clientHeight > -scrollRef.current.clientHeight) {
        setTransform({
          transform: `translate3d(0px,${y - containRef.current.clientHeight}px,0px)`,
        })
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
        <div className="tabs-label" ref={scrollRef} style={transform}>
          {renderTabs()}
          <SliderBar activeRef={activeRef} direction={direction} />
        </div>
      </div>
    </div>
  );
};

export default Scroller;