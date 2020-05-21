import React, { FC, useRef, MouseEvent, ChangeEvent, useState } from 'react';
import UploadList from './uploadList';
import axios from 'axios';
import uploadCore, { UpLoadCore } from './uploadCore';

export interface UploadFile {
  uid: number,
  size: number,
  name: string,
  status?: 'success' | 'onload' | 'error',
  percent?: number,
  originFile?: File,
  response?: any,
  error?: any,
}

export interface UploadProps {
  /**接受上传的文件类型 */
  accept?: string[];
  /**默认已经上传的文件列表 */
  defaultFileList?: UploadFile[];
  /**上传请求的 http method */
  method?: 'post' | 'delete' | 'get' | 'put';
  /**是否可多选 */
  multiple?: boolean;
  /**是否支持上传文件夹 */
  directory?: boolean;  
  /**是否禁用 */
  disabled?: boolean;
  /**上传列表的内建样式 */
  listType?: 'text' | 'picture';
  /**上传所需额外参数或返回上传额外参数的方法 */
  data?: object | ((file: File) => object);
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
  onChange?: (files: File[]) => void;
  /**点击移除文件时的回调，返回值为 false 时不移除。
   * 支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
   */
  onRemove?: (file: UploadFile) => void;
  /**点击文件或图片时的回调 */
  onPreview?: (file: UploadFile) => void;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    onRemove,
    onPreview,
    onDownLoad,
    children,
    data,
    disabled,
    listType,
    directory,
    defaultFileList,
    ...uploadProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  const onChange = (e: ChangeEvent<HTMLInputElement>, file: File) => {
    props.onChange && props.onChange(file)
  }
 /*  const handleClick = (e: MouseEvent) => {
    console.log('click')
    e.preventDefault()
    inputRef.current && inputRef.current.click();
  }

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj};
        } else {
          return file;
        }
      })
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    uploadProcess(files);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const hanldeRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    })
    onRemove && onRemove(file)
  }

  const uploadProcess = (files: FileList) => {
    const fileToUpload = Array.from(files);
    
    fileToUpload.forEach(file => {
      if (!beforeUpload) {
        setTimeout(() => uploadFile(file), 0);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then(processFile => {
            uploadFile(processFile);
          })
        } else if (result !== false) {
          setTimeout(() => uploadFile(file), 0);
        }
      }
    })
  }

  const uploadFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now(),
      size: file.size,
      name: file.name,
      status: 'onload',
      percent: 0,
      originFile: file
    }
    
    new Promise<string>(resolve => {
      if (typeof action === 'function') {
        return resolve(action(file));
      }
      return resolve(action);
    }).then(action => {
      let axiosReq;
      const axiosConfig = {
        headers: {
          'Content-Type': "multipart/form-data",
          ...headers
        },
        withCredentials,
        onUploadProgress: (e: any) => {
          let percent = Math.round((e.loaded * 100) / e.total) || 0;
          if (percent < 100) {
            updateFileList(_file, {percent})
            onProgress && onProgress(percent, file);
          }
        }
      };

      if (method === 'post' || method === 'put') {
        const formData = new FormData();
        if (typeof filename === 'function') {
          formData.append(filename(file), file);
        } else {
          formData.append(filename, file);
        }
        axiosReq = axios[method](action, formData, axiosConfig)
      } else if (method === 'delete' || method === 'get') {
        axiosReq = axios[method](action, axiosConfig)
      } else {
        console.error("method not correct");
        return;
      }

      setFileList(prevList => [_file, ...prevList]);
      axiosReq.then(req => {
        updateFileList(_file, {status: 'success', response: req.data, percent: 100})
        onSuccess && onSuccess(req.data, file);
        onChange && onChange(file);
      }).catch(err => {
        updateFileList(_file, {status: 'error', error: err, percent: 100})
        onError && onError(err, file);
        onChange && onChange(file);
      })
    })
  }
 */
  return (
    <div className="hlinak-upload-component">
      <div className="hlinak-upload-input" onClick={handleClick}>
        {children}
      </div>
      <UpLoadCore 
        fileList={fileList}
        {...uploadProps}
      />
      {/* <input 
          type="file" 
          multiple={multiple} 
          accept={accept && accept.toString()}
          style={{display: "none"}} 
          ref={inputRef} 
          onChange={handleChange} 
        /> */}
      <UploadList fileList={fileList} onRemove={hanldeRemove}/>
    </div>
  )
}

Upload.defaultProps = {
  method: 'post',
  multiple: false,
}

export default Upload;