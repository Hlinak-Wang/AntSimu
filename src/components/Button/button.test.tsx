import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  type: 'primary',
  size: 'lg',
  className: 'class',
}

const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test button component', () => {
  it('should render default button', () => {
    const wrapper = render(<Button {...defaultProps}>test</Button>)
    const element = wrapper.getByText('test') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render button for different props', () => {
    const wrapper = render(<Button {...testProps}>test</Button>)
    const element = wrapper.getByText('test');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg class');
  })
  it('should render a link when there is a href prop', () => {
    const wrapper = render(<Button type='link' href="https://www.baidu.com">link</Button>)
    const element = wrapper.getByText('link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  })
  it('should rendeer a disabled button when disabled is set to true', () => {
    const wrapper = render(<Button {...disableProps}>disabled</Button>)
    const element = wrapper.getByText('disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disableProps.onClick).not.toHaveBeenCalled();
  })
})