import React, { forwardRef,useEffect, useRef, useImperativeHandle, ChangeEvent, useState } from 'react';
import axios from 'axios';
import {IUploadCore, IUploadRef, IUploadFile} from './interface';

export const UpLoadCore = forwardRef<IUploadRef, IUploadCore>((props, ref) => {
  
  const {
    fileList,
    multiple,
    accept,
    onChange,
  } = props;

  const [uploadFileList, setUploadFileList] = useState<IUploadFile[]>(fileList || []);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange && onChange(uploadFileList);
  }, [uploadFileList])

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

  const updateFileList = (updateFile: IUploadFile, updateObj: Partial<IUploadFile>) => {
    
    setUploadFileList(prevList => {
      console.log(prevList)
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
      onError,
      onSuccess
    } = props;

    const _file: IUploadFile = {
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
          console.log("progress")
          let percent = Math.round((e.loaded * 100) / e.total) || 0;
          if (percent < 100) {
            updateFileList(_file, {percent})
            onProgress && onProgress(percent, file);
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
        axiosReq = axios[method](action, formData, axiosConfig);
      } else {
        console.error("method not correct");
        return;
      }

      setUploadFileList(prevList => [_file, ...prevList]);
      axiosReq.then(res => {
        updateFileList(_file, {status: 'success', response: res.data, percent: 100})
        onSuccess && onSuccess(res, file);
      }).catch(err => {
        updateFileList(_file, {status: 'error', error: err, percent: 100})
        onError && onError(err, file);
      })
    })
  }

  return (
    <input
      type="file"
      onChange={handleChange}
      ref={inputRef}
      style={{display: "none"}} 
      multiple={multiple} 
      accept={accept && accept.toString()}
    />
  )
})

export default UpLoadCore;