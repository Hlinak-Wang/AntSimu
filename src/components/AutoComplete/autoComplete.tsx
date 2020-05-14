import React, { FC, KeyboardEvent, useState, ReactElement, useEffect, useRef } from 'react';
import Animate from '../Animate/animate';
import classnames from 'classnames';
import useDebounce from '../../hooks/useDebounce';
import Input, { InputProps } from '../Input/input';
import useClickOutSide from '../../hooks/useClickOutSide';

export type OptionType<T = {}> = T & {value: string;}

export interface IAutoComplete extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (keyword: string) => OptionType[] | Promise<OptionType[]>;
  onSelect?: (item: OptionType) => void;
  renderOption?: (item: OptionType) => ReactElement;
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
  const [suggestions, setSuggestion] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hightLight, setHightLight] = useState(-1);
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [inputActive, setInputActive] = useState(false);
  const debounceValue = useDebounce(inputValue, 200);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutSide(componentRef, () => {setSuggestionOpen(false)})

  useEffect(() => {
    // 当Input.value有值时
    if (debounceValue) {
      console.log("refresh")
      const results = fetchSuggestion(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        setSuggestionOpen(true);
        results.then(data => {
          
          if (data.length === 0) {
            setSuggestionOpen(false);
            console.log("hello zero")
          } else {
            setLoading(false)
            setSuggestion(data);
          }

        }).catch(err => {
          console.log(err)
        })
      } else {
        if (results.length === 0) {
          setSuggestionOpen(false)
          console.log(suggestions)
        } else {
          setSuggestion(results);
          setSuggestionOpen(true);
        }
      }
    } 
    // 当Input.value没值时
    else { 
      setSuggestionOpen(false);
    }
  }, [debounceValue, inputActive]);

  const handleSelect = (item: OptionType) => {
    setInputValue(item.value);
    onSelect && onSelect(item)
  }

  const renderTemplate = (item: OptionType) => {
    return renderOption ? renderOption(item) : item.value
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
      <Animate
        in={inputActive && suggestionOpen}
        timeout={300}
        classNames={`test-top`}
        unmountOnExit
      >
        <ul className="suggestion-list" style={{top: `${offsetTop}px`}}>
          {loading 
          ? <li><h1>loading</h1></li>
          : suggestions.map((suggestion, index) => {
            const cls = classnames('suggestion-item', {
              'hightLighted': index === hightLight,
              'same-suggestion': suggestion.value === inputValue
            })
            return (
              <li key={index} className={cls} onMouseEnter={() => setHightLight(index)} onClick={() => handleSelect(suggestion)}>
                {renderTemplate(suggestion)}
              </li>
            )
          })
          }
        </ul>
      </Animate>
    )
  }

  const handleFocus = () => {
    console.log("onfocus", inputActive, suggestionOpen)
    setInputActive(true);
    console.log("set true")
  }

  const handleBlur = () => {

    console.log("onblur", inputActive, suggestionOpen)
    setInputActive(false);
    console.log("set false")
  }
  return (
    <div className="input-autocomplete" ref={componentRef}>
      <Input 
        ref={inputRef} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue} onChange={e => {setInputValue(e.target.value)}} 
        onKeyDown={handleKeyboard} 
        {...restProps} 
      />
      
      {generateDropDown()} 
    </div>
  )
}

export default AutoComplete;