import React, { useContext, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import { TabsContext } from './tabs';

interface TabsLabelProps {
  index?: number;
  values: ValueType[];
  style?:React.CSSProperties;
  onTabClick?: (selectIndex: number) => void;
}

export type ValueType = {
  index: number;
  label: React.ReactNode;
  disabled: boolean;
}

const TabsLabel:React.FC<TabsLabelProps> = ({ values, style, children }) => {

  const context = useContext(TabsContext);
  const liRef = useRef<HTMLLIElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const contianRef = useRef<HTMLDivElement | null>(null);
  const [sliderCSS, setCSS] = useState<React.CSSProperties>({});
  const [ulCSS, setUlCSS] = useState<React.CSSProperties>({});
  const [prevClass, setPrevClass] = useState<string>('');
  const [nextClass, setNextClass] = useState<string>('');

  function handleClick(index:number) {  
    if (context.onTabClick && typeof index == 'number') {
      context.onTabClick(index)
    }
  }

  /**
   * context 改为 context.index 的话会造成
   * 无法挂载正确的slider （待解决）
   * console context 发现两次的结果都一样
   */
  useEffect(() => {
    const { TabPosition } = context;
    if (liRef.current && ulRef.current && contianRef.current && TabPosition) {

      const ulStyle = ulRef.current.style.transform;
      if (TabPosition === 'bottom' || TabPosition === 'top') {
        let x: number = 0;
        if (ulStyle) {
          const splitArr = ulStyle.split(/[,px() ]/)
          x = parseInt(splitArr[1]);
        }

        if (liRef.current.clientWidth + liRef.current.offsetLeft + x > contianRef.current.clientWidth) {
          setUlCSS({
            transform: `translate3d(${-liRef.current.offsetLeft}px,0px,0px)`,
          })
        } else if (liRef.current.offsetLeft < -x) {
          setUlCSS({
            transform: `translate3d(${-liRef.current.offsetLeft}px,0px,0px)`,
          })
        }

        setCSS({
          width: `${liRef.current.clientWidth}px`,
          transform: `translate3d(${liRef.current.offsetLeft}px,0,0)`,
        })
      } else if (TabPosition === 'left' || TabPosition === 'right') {
        let y: number = 0;
        if (ulStyle) {
          const splitArr = ulStyle.split(/[,px() ]/)
          y = parseInt(splitArr[5]);
        }

        if (liRef.current.clientHeight + liRef.current.offsetTop + y > contianRef.current.clientHeight) {
          setUlCSS({
            transform: `translate3d(0px,${-liRef.current.offsetTop}px,0px)`,
          })
        } else if (liRef.current.offsetTop < -y) {
          setUlCSS({
            transform: `translate3d(0px,${-liRef.current.offsetTop}px,0px)`,
          })
        }

        setCSS({
          height: `${liRef.current.clientHeight}px`,
          transform: `translate3d(0,${liRef.current.offsetTop}px,0)`,
        })
      }
    }
  }, [context]);

  useEffect(() => {
    const { TabPosition } = context;
    if (contianRef.current && ulRef.current && TabPosition) {

      const ulStyle = ulRef.current.style.transform;
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

      if (x - contianRef.current.clientWidth <= -ulRef.current.clientWidth && y - contianRef.current.clientHeight <= -ulRef.current.clientHeight)
      setNextClass('tabs-btn-diabled')
      else 
      setNextClass('')
    }
  }, [ulRef.current && ulCSS])

  function prev() {
    const { TabPosition } = context;
    if (contianRef.current && ulRef.current && TabPosition) {
      const ulStyle = ulRef.current.style.transform;
      let x: number = 0;
      let y: number = 0;
      if (ulStyle) {
        const splitArr = ulStyle.split(/[,px() ]/)
        x = parseInt(splitArr[1]);
        y = parseInt(splitArr[5]);
      }
      if (TabPosition === 'bottom' || TabPosition  === 'top') {
        if (x + contianRef.current.clientWidth > 0) {
          setUlCSS({
            transform: `translate3d(0px,0px,0px)`,
          })
        } else if (x)
        setUlCSS({
          transform: `translate3d(${x + contianRef.current.clientWidth}px,0px,0px)`,
        })
      } else if (TabPosition === 'left' || TabPosition === 'right') {
        if (y + contianRef.current.clientHeight > 0) {
          setUlCSS({
            transform: `translate3d(0px,0px,0px)`,
          })
        } else if (y)
        setUlCSS({
          transform: `translate3d(0px,${y + contianRef.current.clientHeight}px,0px)`,
        })
      }
    }
  }

  function next() {
    const { TabPosition } = context;
    if (contianRef.current && ulRef.current && TabPosition) {
      const ulStyle = ulRef.current.style.transform;
      let x: number = 0;
      let y: number = 0;
      if (ulStyle) {
        const splitArr = ulStyle.split(/[,px() ]/)
        x = parseInt(splitArr[1]);
        y = parseInt(splitArr[5]);
      }
      
      if (TabPosition === 'bottom' || TabPosition  === 'top') {
        if (x - 2 * contianRef.current.clientWidth < -ulRef.current.clientWidth) {
          setUlCSS({
            transform: `translate3d(${contianRef.current.clientWidth - ulRef.current.clientWidth}px,0px,0px)`,
          })
        } else if (x - contianRef.current.clientWidth > -ulRef.current.clientWidth) {
          setUlCSS({
            transform: `translate3d(${x - contianRef.current.clientWidth}px,0px,0px)`,
          })
        } 
      } else if (TabPosition === 'left' || TabPosition === 'right') {
        if (y - 2 * contianRef.current.clientHeight < -ulRef.current.clientHeight) {
          setUlCSS({
            transform: `translate3d(0px,${contianRef.current.clientHeight - ulRef.current.clientHeight}px,0px)`,
          })
        } else if (y - contianRef.current.clientHeight > -ulRef.current.clientHeight) {
          setUlCSS({
            transform: `translate3d(0px,${y - contianRef.current.clientHeight}px,0px)`,
          })
        } 
      }
      
    }
  }

  return (
    <div className="tabs-label-container">
      {
        ulRef.current && contianRef.current 
        && (ulRef.current.clientWidth > contianRef.current.clientWidth || ulRef.current.clientHeight > contianRef.current.clientHeight)
        ? <><div onClick={() => prev()} className={classnames("prev-button", prevClass)}>
            prev
          </div>
          <div onClick={() => next()} className={classnames("next-button", nextClass)}>
            next
          </div></>
        : null
      }
      <div className="show-container" ref={contianRef}>
        <ul className="tabs-label" ref={ulRef} style={ulCSS}>
          {
            values.map(value => {
              const labelClass = classnames('label-item', {
                'disabled': value.disabled
              })

              if (value.index === context.index) {
                return (
                  <li className={labelClass + ' active'} onClick={() => handleClick(value.index)} ref={liRef}>
                    {value.label}
                  </li>
                )
              } else {
                return (
                  <li className={labelClass} onClick={() => handleClick(value.index)}>
                    {value.label}
                  </li>
                )
              }
            })
          }
          <div className="tabs-slider" style={sliderCSS}></div>
        </ul>
      </div>
      
    </div>
  )
}

TabsLabel.defaultProps = {
  index: 0
}
export default TabsLabel;