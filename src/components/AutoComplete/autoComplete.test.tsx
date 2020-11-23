import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AutoComplete from './autoComplete'

const {shallow, mount}=Enzyme
Enzyme.configure({ adapter: new Adapter() })

type DataType = {value: string; id: number};
const a: DataType[] = [
  {value: 'apple', id: 1}, 
  {value: 'book', id: 2}, 
  {value: 'cat', id: 3}, 
  {value: 'dog', id: 4}, 
  {value: 'egg', id: 5},
];
describe(('autocomplete test'), () => {
  let event:any;
  beforeEach(() => {
    event = {
      onSelect: jest.fn(),
      onChange: jest.fn()
    }
  })
  it('should act as input as normal', () => {
    const handleFetch = (keyword: string) => {
      return a.filter(v => v.value.includes(keyword))
    }
    const wrapp = mount(<AutoComplete fetchSuggestion={handleFetch} {...event}/>)
    const input = wrapp.find('input')
    // ensure empty initial state
    expect(input.prop('value')).toEqual('')
    expect(wrapp).toMatchSnapshot()
  })
  it('should show settled fetch information', () => {
    const handleFetch = (keyword: string) => {
      return a.filter(v => v.value.includes(keyword))
    }
    const wrapp = mount(<AutoComplete fetchSuggestion={handleFetch} {...event} />)
    const input = wrapp.find('input')
    
    input.simulate('focus')
    input.simulate('change', {target: {value: "a"}})
    expect(event.onChange).toHaveBeenCalled()

    const list = wrapp.find(".suggestion-list")
    expect(list.find("li").length).toEqual(2)

    list.childAt(0).simulate('click')
    expect(event.onSelect).toHaveBeenCalledWith({value: 'apple', id: 1})
    console.log(input.debug())
  })
  it('test fetch online', async () => {
    const handleFetch = (keyword: string) => {
      // send fetch request
      return fetch(`https://api.github.com/search/users?q=${keyword}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: { login: any; }) => ({value: item.login, ...item}))
      })
    }

    const wrapp = mount(<AutoComplete fetchSuggestion={handleFetch} onSelect={event.onSelect}/> )
    const input = wrapp.find('input')
    expect(wrapp).toMatchSnapshot()
    
    input.simulate('focus')
    input.simulate('change', {target: {value: "a"}})
  })
})