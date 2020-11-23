import React, { FC, KeyboardEvent, useState, ReactElement, useRef, ChangeEvent } from 'react';
import Animate from '../Animate/animate';
import classnames from 'classnames';
import Input, { InputProps } from '../Input/input';
import useClickOutSide from '../../hooks/useClickOutSide';
import debounce from '../../hooks/debounce'
export type OptionType<T = {}> = T & {value: string;}
export type FetchHandle = (keyword: string) => OptionType[] | Promise<OptionType[]>

export interface IAutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: FetchHandle
  onSelect?: (item: OptionType) => void
  renderOption?: (item: OptionType) => ReactElement
}

export const useFetch = (fetchSuggestion: FetchHandle, delay: number, imm:boolean) => {
  const [isLoad, setLoading] = useState(false)
  const [fetchActive, setActive] = useState(false)
  const [suggestions, setSuggestion] = useState<OptionType[]>([])
  
  const goFetch =(value: string) => {
    // 当Input.value有值时
    if (value) {
      const results = fetchSuggestion(value);
      if (results instanceof Promise) {
        setActive(true)
        setLoading(true);
        results.then(data => {
          if (data.length !== 0) {
            setLoading(false)
            setSuggestion([...data]);
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        setLoading(false);
        setActive(true)
        setSuggestion([...results]);
      }
    }
  }

  const fetching = debounce(goFetch, delay, imm)
  return { suggestions, isLoad, fetching, fetchActive, setActive }
}

export const AutoComplete:FC<IAutoComplete> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    onChange,
    value,
    renderOption,
    ...restProps
  } = props;
  
  const [inputValue, setInputValue] = useState(value as string);
  const [hightLight, setHightLight] = useState(-1);
  const [inputActive, setInputActive] = useState(false);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { suggestions, isLoad, fetching, fetchActive, setActive } = useFetch(fetchSuggestion, 200, true)

  useClickOutSide(componentRef, () => {setActive(false)})

  const handleSelect = (item: OptionType) => {
    console.log("asdfzxc")
    setInputValue(item.value);
    onSelect && onSelect(item)
  }

  const handleHightLight = (newHightLight: number) => {
    if (newHightLight > suggestions.length - 1) {
      setHightLight(suggestions.length - 1);
    } else if (newHightLight < 0) {
      setHightLight(0);
    } else {
      setHightLight(newHightLight);
    }
  }

  const handleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:  // enter
        setInputValue(suggestions[hightLight].value);
        setHightLight(-1);
        break;
      case 38:  // up
        handleHightLight(hightLight - 1);
        break;
      case 40:  //down
        handleHightLight(hightLight + 1);
        break;
      case 27:  //esc
        setHightLight(-1);
        break;
      default:
        break;
    }
  }

  const generateDropDown = () => {
    const offsetTop = componentRef.current && componentRef.current.clientHeight + 6;
    return (
      // <Animate
      //   in={inputActive && fetchActive}
      //   timeout={300}
      //   classNames={`test-top`}
      //   unmountOnExit
      // >
        <ul className="suggestion-list" style={{top: `${offsetTop}px`}}>
          {isLoad 
          ? <li><h1>loading</h1></li>
          : suggestions.map((suggestion, index) => {
            const cls = classnames('suggestion-item', {
              'hightLighted': index === hightLight,
              'same-suggestion': suggestion.value === inputValue
            })
            return (
              <li 
                key={index} 
                className={cls} 
                onMouseEnter={() => {console.log("asdf"); setHightLight(index)}} 
                onClick={() => {handleSelect(suggestion)}}
              >
                {renderOption ? renderOption(suggestion) : suggestion.value}
              </li>
            )
          })
          }
        </ul>
      //</Animate>
    )
  }

  const handleFocus = () => {
    setInputActive(true);
  }

  const handleBlur = () => {
    setInputActive(false);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setInputValue(e.target.value)
    fetching(e.target.value)
    onChange && onChange(e)
    console.log(fetchActive)
  }

  return (
    <div className="input-autocomplete" ref={componentRef}>
      <Input 
        ref={inputRef} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue} 
        onChange={handleChange} 
        onKeyDown={handleKeyboard} 
        {...restProps} 
      />
      {inputActive && fetchActive && generateDropDown()} 
    </div>
  )
}

export default AutoComplete;