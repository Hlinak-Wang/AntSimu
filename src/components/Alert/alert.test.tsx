import React from 'react';
import Alert, { AlertType } from './alert';
import { render, fireEvent } from '@testing-library/react';

describe('test set for alert', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('test: render in the correct formate with out description', () => {
    let wrapp = render(<Alert message="message-success" description="description-success" type={AlertType.success}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-info" description="description-info" type={AlertType.info}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-warning" description="description-warning" type={AlertType.warning}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-error" description="description-error" type={AlertType.error}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();
  })

  it('test: render in the correct formate with description', () => {
    let wrapp = render(<Alert message="message-success" type={AlertType.success}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-info" description="description-info" type={AlertType.info}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-warning" description="description-warning" type={AlertType.warning}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();

    wrapp = render(<Alert message="message-error" description="description-error" type={AlertType.error}/>);
    expect(wrapp).toMatchSnapshot();
    wrapp.unmount();
  })

  it('test for closable', () => {
    let closeProps = {
      onClose: jest.fn(),
      afterClose: jest.fn(),
      closable: true
    };
    let wrapp = render(<Alert message="closable" type={AlertType.success} {...closeProps}/>);
    expect(wrapp).toMatchSnapshot();
    let closeButton = wrapp.getByText('X');
    fireEvent.click(closeButton);
    expect(closeProps.onClose).toHaveBeenCalled();
    jest.runAllTimers();
    expect(closeProps.afterClose).toHaveBeenCalled();
    expect(closeButton).not.toBeInTheDocument();
  })
})