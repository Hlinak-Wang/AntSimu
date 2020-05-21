import React, { FC, useState, useEffect, useRef, createContext, MouseEvent, CSSProperties, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TweenOneGroup } from 'rc-tween-one';
import { IAnimObject } from 'rc-tween-one/typings/AnimObject'
import { OptionProps } from './option';
import classnames from 'classnames';
import useClickOutSide from '../../hooks/useClickOutSide';
import Input from '../Input/input';
import Tag from '../Tag/tag';
import Icon from '../Icon/icon';

export interface SelectProps {
  defaultValue?: string[];
  allowClear?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  allowEnter?: boolean;
  mutiple?: boolean;
  dropDownStyle?: CSSProperties;
  dropDonwClass?: string;
  listHeight?: number;
  maxTagCount?: number;
  onSelect?: (value: string) => void;
  dropdownRender?: (menu: ReactNode) => ReactNode;
}

export interface ISelectContext{
  tagShow: string[];
  tagHide: string[];
  changeSelect?: (label: string) => void; 
}

export const selectContext = createContext<ISelectContext>({tagShow: [], tagHide: []});

const useTag = (defaultTag: string[] | undefined, maxTagCount?: number, mutiple: boolean = false) => {

  const [tagSelect, setSelect] = useState<string[]>(defaultTag || []);
  const [tagShow, setTagShow] = useState<string[]>([]);
  const [tagHide, setTagHide] = useState<string[]>([]);

  function setTagSelect(tag: string) {
    if (mutiple) {
      
      if (tagSelect.includes(tag)) {
        const labelIndex = tagSelect.indexOf(tag);
        if (maxTagCount) {
          if (tagSelect.length > maxTagCount) {
            console.log("over")
          }
        }
        setSelect(v => { 
          v.splice(labelIndex, 1)
          return [...v]
        });
      } else {
        setSelect(v => {
          v.unshift(tag);
          return [...v]
        });
      }
    } else {
      setSelect([tag])
    }
  }

  useEffect(() => {
    if (maxTagCount) {
      if (tagSelect.length > maxTagCount) {
        setTagShow(tagSelect.slice(0, maxTagCount))
        setTagHide(tagSelect.slice(maxTagCount))
      } else {
        setTagHide([]);
        setTagShow([...tagSelect])
      }
    } else {
      setTagShow([...tagSelect])
    }
  }, [tagSelect])

  return {tagShow, tagHide, setTagSelect};
}

export const Select: FC<SelectProps> = (props) => {

  const {
    allowEnter,
    defaultValue,
    allowClear,
    dropDonwClass,
    dropDownStyle,
    listHeight,
    maxTagCount,
    dropdownRender,
    autoFocus,
    mutiple,
    onSelect,
    children,
  } = props

  const [inputActive, setInputActive] = useState(false);
  const {tagShow, tagHide, setTagSelect} = useTag(defaultValue, maxTagCount, true);
  const [showStatus, setShowStatus] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  
  
  useClickOutSide(componentRef, () => {setInputActive(false)});

  const handleSelect = (label: string) => {
    setTagSelect(label);
    onSelect && onSelect(label);
  }

  const context: ISelectContext = {
    tagShow,
    tagHide,
    changeSelect: handleSelect
  }

  useEffect(() => {
    React.Children.forEach(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>;
      const displayName = childElement.type.displayName || childElement.type.name;
      if (displayName !== 'Option') {
        console.error('Component Select only accept component Option as children');
      }
    })
  }, [children]);

  const enterAnim: IAnimObject[] = [
    {
      opacity: 0, scale: 0,  duration: 0,
    },
    {
      width: 0,
      duration: 300,
      type: "from",
      
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
      ease: 'easeOutQuad',
    },
    {
      opacity: 1, scale: 1, duration: 250, ease: 'easeOutQuad',
    }
  ];
  
  const leaveAnim: IAnimObject[] = [
    { duration: 250, opacity: 0, scale: 0 },
    { width: 0,  paddingLeft: 0, paddingRight: 0, margin: 0,duration: 250, ease: 'easeOutQuad' },
  ];

  const renderPullOut = () => {
    const dropDownCls = classnames(dropDonwClass, "select-option-container");

    return (
      <CSSTransition
        in={inputActive}
        timeout={300}
        classNames="pull-out-top"
        unmountOnExit
        appear
      >
        <div className={dropDownCls} style={{maxHeight: listHeight}}>
          {dropdownRender? dropdownRender(children): children}
        </div>
      </CSSTransition>
    )
    
  }

  const renderTags = () => {
    return (
      <TweenOneGroup
        className="select-tag-group"
        enter={enterAnim}
        leave={leaveAnim}
        appear={false}
        exclusive
      >
        {
          tagShow.map(item => {
            return (
              <Tag 
                className="select-tag" 
                closable 
                key={item}
                onClose={() => setTagSelect(item)}
                style={{color: 'white', background: "#1990ff", border: "1px solid transparent"}}
              >
                {item}
              </Tag>
            )
          })
        }
        {
          showStatus
          ? 
            tagHide.map(tag => {
              return (
                <Tag 
                  key={tag}
                  closable 
                  onClose={() => setTagSelect(tag)}
                  className="select-tag" 
                  style={{color: 'white', background: "#1990ff", border: "1px solid transparent"}}
                >
                  {tag}
                </Tag>
              )
            })
          : null
        }
        {
          tagHide.length
          ? 
            <Tag className="select-tag" onClick={() => setShowStatus(v => !v)} key="tag-hide">
              {
                showStatus ? 'hide': `+${tagHide.length}...`
              }
              <Icon shape="arrow" status={showStatus ? 'left': 'right'} />
            </Tag>
          : null
        }
      </TweenOneGroup>
    )
  } 

  if (mutiple) {
    return (
      <div className="select" ref={componentRef}>
        <selectContext.Provider value={context}>
          <Input 
            className="select-input"
            onFocus={() => setInputActive(true)}
            inputPrefix={renderTags()}
            readOnly={!allowEnter}
            style={!allowEnter? {cursor: "pointer"} : {flex: "none"}}
            autoFocus={autoFocus}
          />
          {renderPullOut()}
        </selectContext.Provider>
      </div>
    )
  } else {
    return (
      <div className="select" ref={componentRef}>
        <selectContext.Provider value={context}>
          <Input 
            className="select-input"
            onFocus={() => setInputActive(true)}
            value={context.tagShow}
            readOnly={!allowEnter}
            style={!allowEnter? {cursor: "pointer"} : {flex: "none"}}
            autoFocus={autoFocus}
          />
          {renderPullOut()}
        </selectContext.Provider>
      </div>
    )
  }
  
}

Select.defaultProps = {
  allowEnter: false,
  allowClear: false,
  mutiple: false,
}

export default Select;