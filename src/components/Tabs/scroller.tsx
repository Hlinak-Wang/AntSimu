import React, { useCallback, useState, useRef, useEffect, useReducer } from 'react';
import { TabsItemProps } from './tabsItem';
import SliderBar from './sliderBar';
import classnames from 'classnames';

interface IScroller {
  activeIndex: number | string;
  direction: 'vertical' | 'horizontal';
  items: React.ReactNode;
  changeActive: (index: number) => void;
}

interface IAction {
  type: 'setX' | 'setY' | 'setPrevCls' | 'setNextCls' | 'setActiveNode' | 'setScrollNode';

}

interface IState {
  shiftX: number,
  shiftY: number,
  prevCls: string,
  nextCls: string,
  activeNode: HTMLDivElement | null,
  scrollNode: HTMLDivElement | null,
}

const initialSate: IState = {
  shiftX: 0,
  shiftY: 0,
  prevCls: '',
  nextCls: '',
  activeNode: null,
  scrollNode: null,
}

function reducer(state: IState, action: IAction) {
  switch (action.type ){
    case 'setX' :
      return state;
    case 'setY' :
      return state;
    case 'setPrevCls' :
      return state;
    case 'setNextCls' :
      return state;
    case 'setActiveNode' :
      return state;
    case 'setScrollNode' :
      return state;
    default:
      return state;
  }
}

const Scroller: React.FC<IScroller> = ({ activeIndex, direction, items, changeActive }) => {

  const containRef = useRef<HTMLDivElement | null>(null);
  const [shiftX, setShiftX] = useState<number>(0);
  const [shiftY, setShiftY] = useState<number>(0);
  const [prevClass, setPrevClass] = useState<string>('');
  const [nextClass, setNextClass] = useState<string>('');
  const [activeNode, setActiveNode] = useState()
  const [scrollNode, setScrollNode] = useState();
  const [state, dispatch] = useReducer(reducer, initialSate);
  
  const ActiveCall = useCallback(node => {
    if (node !== null) {
      setActiveNode(node)
    }
  }, []);

  const ScrollCall = useCallback(node => {
    if (node !== null) {
      setScrollNode(node);
      console.log(node);
      console.log(scrollNode)
      node.addEventListener('wheel', (e:WheelEvent) => handleScroll(e), { passive: false });
    }
  }, [])

  

  const renderTabs = () => {
    const Label = React.Children.map(items, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabsItemProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName === 'TabsItem') {
        const cls = classnames('label-item', { 
          active: activeIndex === index
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
    if (activeNode && scrollNode && containRef.current) {
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
    if (containRef.current && scrollNode) {
      if (shiftX || shiftY)
      setPrevClass('')
      else 
      setPrevClass('tabs-btn-diabled')

      if (shiftX - containRef.current.clientWidth <= -scrollNode.clientWidth && shiftY - containRef.current.clientHeight <= -scrollNode.clientHeight)
      setNextClass('tabs-btn-diabled')
      else 
      setNextClass('')
    }
  }, [scrollNode,shiftX, shiftY])

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

    if (!scrollNode) {
      console.error("can't get scroller DOM");
      return;
    }

    if (direction === 'horizontal') {
      if (shiftX - 2 * containRef.current.clientWidth < -scrollNode.clientWidth) {
        setShiftX(containRef.current.clientWidth - scrollNode.clientWidth);
      } else if (shiftX - containRef.current.clientWidth > -scrollNode.clientWidth) {
        setShiftX(shiftX - containRef.current.clientWidth);
      } 
    } else if (direction === 'vertical') {
      if (shiftY - 2 * containRef.current.clientHeight < -scrollNode.clientHeight) {
        setShiftY(containRef.current.clientHeight - scrollNode.clientHeight);
      } else if (shiftY - containRef.current.clientHeight > -scrollNode.clientHeight) {
        setShiftY(shiftY - containRef.current.clientHeight);
      } 
    }
  }

 /*  useEffect(() => {
    console.log("add")
    const test = document.getElementById("test");
    console.log(test)
    if (test !== null)
    test.addEventListener('wheel', e => handleScroll(e), { passive: false });
    return () => {
      console.log("rmove")
      if (test != null)
      test.removeEventListener('wheel', e => handleScroll(e));
    }
  }, [scrollNode]) */

  function handleScroll(e: WheelEvent) {
    e.preventDefault();
    console.log(e.deltaY)
    if (e.deltaY <= 0) {
      // scroll top
      prev();
    } else if (e.deltaY > 0){
      next();
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
        <div id="test" className="tabs-label" ref={ScrollCall} style={{transform: `translate3d(${shiftX}px,${shiftY}px,0px)`}}>
          {renderTabs()}
          <SliderBar activeRef={activeNode} direction="horizontal"/>
        </div>
      </div>
    </div>
  );
};

export default Scroller;