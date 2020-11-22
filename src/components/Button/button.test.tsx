import React from 'react';
//import { render, fireEvent } from '@testing-library/react';
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button, { ButtonProps } from './button';

const {shallow, mount}=Enzyme
Enzyme.configure({ adapter: new Adapter() })

let event:any;
const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test button component', () => {
  beforeEach(() => {
    event = {
      onClick: jest.fn()
    }
  })
  it('should render default button', () => {
    const wrapper = shallow(<Button {...event}>default</Button>)
    expect(wrapper.children.length).toEqual(1)
    const outlayer = wrapper.find('button')
    const innerlayer = wrapper.find('a')
    expect(outlayer.hasClass(/(?=.*btn)(?=.*btn-default-style)(?=.*btn-mid-size)*./g)).toBeTruthy()
    expect(innerlayer.text()).toEqual('default')

    wrapper.simulate('click')
    expect(event.onClick).toHaveBeenCalled()
  })
  it('should render button for dash style', () => {
    const wrapper = shallow(<Button btnType="dash" className="dash-test" {...event}>dash button</Button>)
    expect(wrapper.children.length).toEqual(1)
    const outlayer = wrapper.find('button')
    expect(wrapper.find('a').text()).toEqual("dash button")
    expect(outlayer.hasClass(/(?=.*btn)(?=.*btn-dash-style)(?=.*dash-test)(?=.*btn-mid-size).*/g)).toBeTruthy()
    expect(wrapper).toMatchSnapshot();

    wrapper.simulate('click')
    expect(event.onClick).toHaveBeenCalled()
  })
  it('should render button for vacuum style', () => {
    const wrapper = shallow(<Button btnType="vacuum" className="vacuum-test another-class" {...event}>vacuum button</Button>)
    expect(wrapper.children.length).toEqual(1)
    const outlayer = wrapper.find('button')
    expect(wrapper.find('a').text()).toEqual("vacuum button")
    expect(outlayer.hasClass(/(?=.*btn)(?=.*btn-vacuum-style)(?=.*vacuum-test)(?=.*btn-mid-size)(?=.*another-class).*/g)).toBeTruthy()
    expect(wrapper).toMatchSnapshot();

    wrapper.simulate('click')
    expect(event.onClick).toHaveBeenCalled()
  })
  it('should render a link when there is a href prop', () => {
    const wrapper = mount(<Button btnType='default' href="url" {...event}>link</Button>)

    expect(wrapper.children.length).toEqual(1)
    const outlayer = wrapper.find('button')
    expect(wrapper.find('a').text()).toEqual("link")
    expect(wrapper.find('a').prop('href')).toEqual('url')
    expect(outlayer.hasClass(/(?=.*btn)(?=.*btn-default-style)(?=.*btn-mid-size).*/g)).toBeTruthy()
    expect(wrapper).toMatchSnapshot();

    wrapper.simulate('click')
    expect(event.onClick).toHaveBeenCalled()
  })
  it('should rendeer a disabled button when disabled is set to true', () => {
    const wrapper = shallow(<Button {...event} disabled>disabled</Button>)

    expect(wrapper.children.length).toEqual(1)
    const outlayer = wrapper.find('button')
    expect(outlayer.prop('disabled')).toBeTruthy()
    expect(wrapper.find('a').text()).toEqual("disabled")
    expect(outlayer.hasClass(/(?=.*btn)(?=.*btn-default-style)(?=.*btn-mid-size).*/g)).toBeTruthy()
    expect(wrapper).toMatchSnapshot();

    outlayer.simulate('click')
    expect(disableProps.onClick).not.toHaveBeenCalled()
    // const element = wrapper.getByText('disabled') as HTMLButtonElement;
    // expect(element).toBeInTheDocument();
    // expect(element.disabled).toBeTruthy();
    // fireEvent.click(element);
    // expect(disableProps.onClick).not.toHaveBeenCalled();
  })
})