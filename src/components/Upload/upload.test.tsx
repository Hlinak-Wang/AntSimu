import React from 'react';
import { render, fireEvent, RenderResult, wait, queryByTestId, cleanup } from '@testing-library/react';
import Upload from './upload';
import { IUploadProps } from './interface';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

//jest.mock('axios');
/* jest.mock('rc-tween-one', () => {
  return {
    TweenOneGroup: (props: any) => <ul>{props.children}</ul>
  }
}) */

//const jestAxios = axios as jest.Mocked<typeof axios>;
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLDivElement;

async function checkFileUpload(
  wrapper: RenderResult, 
  testProps: Pick<IUploadProps, "onSuccess" | "onProgress" | "onChange">, 
  fileCalled: File, 
  expectStatus: {onload: number, success?: number, error?: number}
  ) {
  expect(testProps.onChange).toBeCalled();
  await wait(() => {
    expect(wrapper.getAllByTestId('spin').length).toBe(expectStatus.onload);
  })
  
  await wait(() => {
    expect(wrapper.getAllByTestId('check-circle').length).toBe(expectStatus.success);
    expect(wrapper.queryByText(fileCalled.name)).toBeInTheDocument();
  })

  expect(testProps.onProgress).toBeCalled();
  //expect(queryByText()) 
  expect(testProps.onSuccess).toBeCalledWith({'test': "ok"}, fileCalled)
}

describe("test for action", () => {
  const testProps: Partial<IUploadProps> = {
    method: 'post',
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onChange: jest.fn(),
    onProgress: jest.fn(),
  }
  it("action is string", async () => {
    
    wrapper = render(<Upload {...testProps} action="http://www.mocky.io/v2/5ec939dc2f0000354adb719a">upload</Upload>);
    fileInput = wrapper.container.querySelector("input") as HTMLInputElement;
    expect(wrapper).toMatchSnapshot();

    expect(wrapper).toMatchSnapshot();
    const testFile = new File(Array(1), "test.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [testFile] }});
    })
    
    await checkFileUpload(wrapper, testProps, testFile, {onload: 1, success: 1});
  })
})

describe('basic test', () => {
  const testProps: IUploadProps = {
    action: "http://www.mocky.io/v2/5ec939dc2f0000354adb719a", // return { "test": "ok" }
    method: 'post',
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onChange: jest.fn(),
    onProgress: jest.fn(),
  }

  it("test post multiple file seperately and at the same time", async () => {
    wrapper = render(<Upload {...testProps} multiple>upload</Upload>);
    fileInput = wrapper.container.querySelector('input') as HTMLInputElement;

    expect(wrapper).toMatchSnapshot();
    const file1 = new File(Array(1), "file1.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [file1] }});
    })

    expect(testProps.onChange).toBeCalled();
    await checkFileUpload(wrapper, testProps, file1, {onload: 1, success: 1});

    const file2 = new File(Array(2), "file2.txt")
    act(() => {
      fireEvent.change(fileInput, { target: { files: [file2] }});
    })
    await checkFileUpload(wrapper, testProps, file2, {onload: 1, success: 2});
  })

  it('test beforeUpload which return boolean', async () => {
    const wrapper = render(
      <Upload 
        {...testProps} 
        beforeUpload={(file) => {
          if (file.size > 10) {
            return false;
          } else {
            return true
          }
        }}
      >
        upload
      </Upload>
    );
    const fileInput = wrapper.container.querySelector('input') as HTMLInputElement;
    expect(wrapper).toMatchSnapshot();
    
    const smallFile = new File(Array(1), "small.txt")
    act(() => {
      fireEvent.change(fileInput, { target: { files: [smallFile] }});
    })

    expect(testProps.onChange).toBeCalled();

    await wait(() => {
      expect(wrapper.getByTestId('spin')).toBeInTheDocument();
    })
    
    await wait(() => {
      expect(wrapper.getByTestId('check-circle')).toBeInTheDocument();
      expect(wrapper.queryByText('small.txt')).toBeInTheDocument();
    })

    const largeFile = new File(Array(10), "large.txt");
    act(() => {
      fireEvent.change(fileInput, { target: {files: [largeFile]}});
    })
    
    //expect(testProps.onChange).not.toBeCalled();
  })

  it("test beforeUpload return promise", async () => {
    const wrapper = render(
      <Upload 
        {...testProps} 
        beforeUpload={(file) => {
          const transformedFile = new File([file], "new.txt");
          return Promise.resolve(transformedFile)
        }}
      >
        upload
      </Upload>
    );
    const fileInput = wrapper.container.querySelector('input') as HTMLInputElement;
    expect(wrapper).toMatchSnapshot();

    const originFile = new File(Array(1), "origin.txt")
    act(() => {
      fireEvent.change(fileInput, { target: { files: [originFile] }});
    })

    expect(testProps.onChange).toBeCalled();

    await wait(() => {
      expect(wrapper.getByTestId('spin')).toBeInTheDocument();
    })
    
    await wait(() => {
      expect(wrapper.getByTestId('check-circle')).toBeInTheDocument();
      expect(wrapper.queryByText('new.txt')).toBeInTheDocument();
    })
  })
})

