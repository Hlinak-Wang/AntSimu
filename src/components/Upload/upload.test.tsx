import React from 'react';
import { render, fireEvent, RenderResult, wait, queryByTestId } from '@testing-library/react';
import Upload from './upload';
import { IUploadProps } from './interface';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
/* jest.mock('rc-tween-one', () => {
  return {
    TweenOneGroup: (props: any) => <ul>{props.children}</ul>
  }
}) */

const jestAxios = axios as jest.Mocked<typeof axios>;
const testProps: IUploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onError: jest.fn(),
  onChange: jest.fn(),
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLDivElement;
const testFile = new File(["abc"], "test.png", {type: "image/png"});

describe('basic test', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>upload</Upload>);
    fileInput = wrapper.container.querySelector('input') as HTMLInputElement;
    uploadArea = wrapper.queryByText('upload') as HTMLDivElement;
  })

  it('should post single file', async () => {
    const { queryByText } = wrapper;
    jestAxios.post.mockResolvedValue({'data': "test return"})
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    act(() => {
      fireEvent.change(fileInput, { target: { files: [testFile] }});
    })
    
    expect(testProps.onChange).toBeCalled();
    expect(wrapper.getByTestId('spin')).toBeInTheDocument();
    await wait(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    })
    //expect(queryByText())
    expect(testProps.onSuccess).toBeCalledWith("test return", testFile)
    expect(testProps.onChange).toBeCalled()
  })
})