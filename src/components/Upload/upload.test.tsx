import React from 'react';
import { render, fireEvent, RenderResult, wait, queryByTestId, cleanup } from '@testing-library/react';
import Upload from './upload';
import { IUploadProps } from './interface';
import { act } from 'react-dom/test-utils';

/**
 * action list:
 * https://getman.cn/mock/file-upload return {"file-upload": "pass"}
 * https://getman.cn/mock/file/small return {"file-size": "small"}
 * https://getman.cn/mock/file/large return {"file-size": "large"}
 */

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLDivElement;

async function checkFileUpload(
  wrapper: RenderResult, 
  testProps: Pick<IUploadProps, "onSuccess" | "onProgress" | "onChange">, 
  fileCalled: File, 
  expectStatus: {onload: number, success?: number, error?: number},
  expectResponce: any
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
  expect(testProps.onSuccess).toBeCalledWith(expectResponce, fileCalled);
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
    
    wrapper = render(<Upload {...testProps} action="https://getman.cn/mock/file-upload">upload</Upload>);
    fileInput = wrapper.container.querySelector("input") as HTMLInputElement;
  
    expect(wrapper).toMatchSnapshot();
    const testFile = new File(Array(1), "test.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [testFile] }});
    })
    
    await checkFileUpload(wrapper, testProps, testFile, {onload: 1, success: 1}, {"file-upload": "pass"});
  })

  it("action is function", async () => {
    wrapper = render(
      <Upload 
        {...testProps} 
        action={file => {
          if (file.size < 10) {
            return Promise.resolve("https://getman.cn/mock/file/small")
          } else {
            return Promise.resolve("https://getman.cn/mock/file/large")
          }
        }}
      >
        upload
      </Upload>
    );
    fileInput = wrapper.container.querySelector("input") as HTMLInputElement;
    expect(wrapper).toMatchSnapshot();
    
    const smallFile = new File(Array(1), "small.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [smallFile]}});
    });

    await checkFileUpload(wrapper, testProps, smallFile, { onload: 1, success: 1}, {"file-size": "small"});

    const largeFile = new File(Array(2), "large.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [largeFile]}});
    })

    await checkFileUpload(wrapper, testProps, largeFile, { onload: 1, success: 2}, {"file-size": "large"})
  })
})

describe("test filename", () => {
  const testProps: IUploadProps = {
    action: "https://getman.cn/mock/file-upload", // return {"file-upload": "pass"}
    method: 'post',
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onChange: jest.fn(),
    onProgress: jest.fn(),
  }
  it("filename is a string", async () => {
    wrapper = render(
      <Upload 
        {...testProps} 
        filename="test filename"
      >
        upload
      </Upload>
    );
    fileInput = wrapper.container.querySelector('input') as HTMLInputElement;

    const file = new File(Array(1), "file1.txt");
    act(() => {
      fireEvent.change(fileInput, { target: { files: [file] }});
    })
    expect(testProps.onChange).toBeCalled();
    await checkFileUpload(wrapper, testProps, file, {onload: 1, success: 1}, {"file-upload": "pass"});
  })
})

describe('basic test', () => {
  const testProps: IUploadProps = {
    action: "https://getman.cn/mock/file-upload", // return {"file-upload": "pass"}
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
    await checkFileUpload(wrapper, testProps, file1, {onload: 1, success: 1}, {"file-upload": "pass"});

    const file2 = new File(Array(2), "file2.txt")
    act(() => {
      fireEvent.change(fileInput, { target: { files: [file2] }});
    })
    await checkFileUpload(wrapper, testProps, file2, {onload: 1, success: 2}, {"file-upload": "pass"});
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

