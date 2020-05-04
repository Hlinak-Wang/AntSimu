import React, { FC, KeyboardEvent, useState, ReactElement, useEffect, useRef, Ref } from 'react';
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


export const AutoComplete= (props: IAutoComplete) => {
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
  const debounceValue = useDebounce(inputValue, 500);
  const componentRef = useRef<HTMLDivElement | null>(null);
  const triggerSearch = useRef(true);
  useClickOutSide(componentRef, () => {setSuggestion([])})

  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestion(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then(data => {
          setLoading(false)
          setSuggestion(data)
        })
      } else {
        setSuggestion(results);
      }
    } else { 
      setSuggestion([])
    }
  }, [debounceValue]);

  const handleSelect = (item: OptionType) => {
    setInputValue(item.value);
    setSuggestion([]);
    triggerSearch.current = false;
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
        setSuggestion([]);
        setHightLight(-1);
        triggerSearch.current = false;
        break;
      case 38:  // up
        handleHightLight(hightLight - 1);
        break;
      case 40:  //down
        handleHightLight(hightLight + 1);
        break;
      case 27:  //esc
        setSuggestion([])
        setHightLight(-1);
        break;
      default:
        break;
    }
  }

  const generateDropDown = () => {
    const width = 100;
    return (
      <ul className="suggestion-list">
        {loading && <li>loading</li>}
        {
          suggestions.map((suggestion, index) => {
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
    )
  }
  return (
    <div className="input-autocomplete" ref={componentRef}>
      <Input value={inputValue} onChange={e => {setInputValue(e.target.value); triggerSearch.current = true;}} onKeyDown={handleKeyboard} {...restProps} />
      {suggestions.length > 0 && generateDropDown()} 
    </div>
  )
}

export default AutoComplete;