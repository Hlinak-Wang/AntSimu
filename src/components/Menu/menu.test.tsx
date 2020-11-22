import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import Menu, { MenuProps, useSelect, SelectCallBack } from './menu';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MenuItem from './menuItem';
import subMenu from './subMenu'

const {shallow, mount}=Enzyme
Enzyme.configure({ adapter: new Adapter() })

let testProps: MenuProps;

const testVerProps: MenuProps = {
  defaultIndex: ['0'],
  mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem handleKey="0">
        active
      </MenuItem>
      <MenuItem disabled handleKey="1">
        disabled
      </MenuItem>
      <MenuItem handleKey="2">
        not active
      </MenuItem>
    </Menu>
  )
}

//let wrapp: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
let wrapp:Enzyme.ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>
let menuElement: Enzyme.ReactWrapper<Enzyme.HTMLAttributes, any, React.Component<{}, {}, any>>
let activeElement:Enzyme.ReactWrapper<Enzyme.HTMLAttributes, any, React.Component<{}, {}, any>>
let disabledElement:Enzyme.ReactWrapper<Enzyme.HTMLAttributes, any, React.Component<{}, {}, any>>

describe('test Menu and MenuItem', () => {

  beforeEach(() => {
    cleanup()
    testProps = {
      defaultIndex: ['0'],
      onSelect: jest.fn(),
      className: 'test'
    }
    wrapp = mount(generateMenu(testProps))
    menuElement = wrapp.find('.menu')
    activeElement = menuElement.find({handleKey: "0"})
    disabledElement = menuElement.find({handleKey: "1"})
  })
  it('should render correct Menu and MenuItem base on default props', () => {

    expect(menuElement.hasClass(/(?=.*menu)(?=.*menu-vertical).*/)).toBeTruthy()
    expect(menuElement.find('li').length).toEqual(3);
    expect(activeElement.find("li").hasClass(/(?=.*menu-item)(?=.*is-active).*/)).toBeTruthy()
    expect(disabledElement.find('li').hasClass(/(?=.*menu-item)(?=.*is-disabled).*/)).toBeTruthy()
  })
  it('click item should response to the click event', () => {
    const thirdItem = menuElement.find({handleKey: '2'})

    thirdItem.simulate('click')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    disabledElement.simulate('click')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('testing useSelect hook in menu for non-mutiple and callback', () => {
    
    const { result } = renderHook(() => useSelect([], false))

    expect(result.current.selected).toEqual([])
    expect(typeof result.current.changeSelect).toBe('function')

    act(() => {
      result.current.changeSelect("1")
    })
    expect(result.current.selected).toEqual(["1"])

    act(() => {
      result.current.changeSelect("2")
    })
    expect(result.current.selected).toEqual(["2"])
  })
  it('testing useSelect hook in menu for multiple and no-callback', () => {
    const { result } = renderHook(() => useSelect([], true))

    expect(result.current.selected).toEqual([])
    expect(typeof result.current.changeSelect).toBe('function')

    act(() => {
      result.current.changeSelect("1")
    })
    expect(result.current.selected).toEqual(["1"])

    act(() => {
      result.current.changeSelect("2")
    })
    expect(result.current.selected).toEqual(["1","2"])
  })
  it('testing useSelect hook in menu for call-back', () => {
    let count = 0;
    const callBack:SelectCallBack = (index: string) => {
      count++;
    }
    const {result} = renderHook(() => useSelect([], true, callBack))
    expect(result.current.selected).toEqual([])
    expect(typeof result.current.changeSelect).toBe('function')

    act(() => {
      result.current.changeSelect("1")
    })
    expect(result.current.selected).toEqual(["1"])
    expect(count).toEqual(1)

    act(() => {
      result.current.changeSelect("2")
    })
    expect(result.current.selected).toEqual(["1","2"])
    expect(count).toEqual(2)
  })
  it('render the correct mode', () => {
    wrapp = mount(generateMenu(testVerProps));
    expect(wrapp).toMatchSnapshot();
  })
}) 