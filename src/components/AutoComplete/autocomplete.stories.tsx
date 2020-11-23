import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AutoComplete, { OptionType } from './autoComplete';

const localAuto = () => {
  type DataType = {value: string; id: number};
  
  const a: DataType[] = [
    {value: 'apple', id: 1}, 
    {value: 'book', id: 2}, 
    {value: 'cat', id: 3}, 
    {value: 'dog', id: 4}, 
    {value: 'egg', id: 5},
  ];

  const handleFetch = (keyword: string) => {
    return a.filter(v => v.value.includes(keyword))
  } 

  return <AutoComplete fetchSuggestion={handleFetch} onSelect={action('selected')} value="a"/>

}

const netAuto = () => {
  type DataType = {value: string};

  const handleFetch = (keyword: string) => {
    // send fetch request
    return fetch(`https://api.github.com/search/users?q=${keyword}`)
    .then(res => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: { login: any; }) => ({value: item.login, ...item}))
    })
  }

  const renderOption = (item: OptionType) => {
    const options = item as OptionType<DataType>;
    return (
      <>
      <span>name: {options.value}</span>
      </>
    )
  }
  return <AutoComplete fetchSuggestion={handleFetch} onSelect={action('selected')} renderOption={renderOption}/>
  
}

storiesOf('autocomplete', module)
  .add('同步请求', localAuto)
  .add('异步请求', netAuto)