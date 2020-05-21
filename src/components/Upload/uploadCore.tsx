import React, { forwardRef, useRef, useImperativeHandle, ChangeEvent, useState } from 'react';
import axios from 'axios';

export interface UploadFile {
  uid: number,
  size: number,
  name: string,
  status?: 'success' | 'onload' | 'error',
  percent?: number,
  file?: File,
  response?: any,
  error?: any,
}


export interface IUploadCore {
  /**上传了的文件 */
  fileList: UploadFile[];
  /**接受上传的文件类型 */
  accept?: string[];
  /**上传请求的 http method */
  method?: 'post' | 'delete' | 'get' | 'put';
  /**是否可多选 */
  multiple?: boolean;
  /**上传的文件名 */
  filename?: string | ((file: File) => string);
  /**上传的地址 */
  action: string | ((file: File) => PromiseLike<string>);
  /**设置上传的请求头部 */
  headers?: object;
  /**上传请求时是否携带 cookie */
  withCredentials?: boolean;
  /**	
   * 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。
   * 支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，
   * resolve 时开始上传（ resolve 传入 File 或 Blob 对象则上传 resolve 传入对象） 
   */
  beforeUpload?: (file: File) => boolean | PromiseLike<File>;
  /** 上传时的回调 */
  onProgress?: (percent: number, file: File) => void;
  /** */
  onDownLoad?: (file: File) => void;
  /** 上传成功时的回调 */
  onSuccess?: (response: object, file: File) => void;
  /**上传失败时的回调 */
  onError?: (error: Error, file: File) => void;
  /**	上传文件改变时的状态 */
  onChange: (files: UploadFile[]) => void;
}

export interface IUploadRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
}

export const UpLoadCore = forwardRef<IUploadRef, IUploadCore>((props, ref) => {
  
  const {
    fileList,
    
  } = props;

  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(fileList || []);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current!.focus(),
    blur: () => inputRef.current!.blur(),
    click: () => inputRef.current!.click(),
  }))

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    uploadProcess(files);
    inputRef.current!.value = "";
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setUploadFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj};
        } else {
          return file;
        }
      })
    })
  }

  const uploadProcess = (files: FileList) => {
    const { beforeUpload } = props;
    const filesToUpload = Array.from(files);

    filesToUpload.forEach(file => {
      if (!beforeUpload) {
        setTimeout(() => uploadFile(file), 0);
      } else {
        const result = beforeUpload(file);

        if (result && result instanceof Promise) {
          result.then(modifiedFile => {
            uploadFile(modifiedFile);
          })
        } else if (result !== false) {
          setTimeout(() => uploadFile(file), 0);
        }
      }
    })
  } 

  const uploadFile = (file: File) => {
    const { 
      action,
      headers,
      withCredentials,
      onProgress,
      method,
      filename = 'file',
      onChange,
      onError,
      onSuccess
    } = props;

    const _file: UploadFile = {
      uid: Date.now(),
      size: file.size,
      name: file.name,
      status: 'onload',
      percent: 0,
      file: file,
    }

    new Promise<string>(resolve => {
      if (typeof action === 'function') {
        return resolve(action(file));
      }
      return resolve(action);
    }).then(action => {
      const axiosConfig = {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (e: any) => {
          if (e.total > 0) {
            let percent = Math.round((e.loaded * 100) / e.total) || 0;
            if (percent < 100) {

              onProgress && onProgress(percent, file);
            }
          }
        },
        withCredentials,
      }

      let axiosReq;
      if (method === 'get' || method === 'delete') {
        axiosReq = axios[method](action, axiosConfig);
      } else if (method === 'post' || method === 'put') {
        const formData = new FormData();
        if (typeof filename === 'function') {
          formData.append(filename(file), file);
        } else {
          formData.append(filename, file);
        }
        axiosReq = axios[method](action, axiosConfig);
      } else {
        console.error("method not correct");
        return;
      }

      setUploadFileList(prevList => [_file, ...prevList]);
      axiosReq.then(res => {
        updateFileList(_file, {status: 'success', response: res.data, percent: 100})
        onSuccess && onSuccess(res, file);
        onChange && onChange(uploadFileList);
      }).catch(err => {
        updateFileList(_file, {status: 'error', error: err, percent: 100})
        onError && onError(err, file);
        onChange && onChange(uploadFileList);
      })
    })
  }

  return (
    <input
      type="file"
      onChange={handleChange}
      ref={inputRef}
    />
  )
})

export default UpLoadCore;