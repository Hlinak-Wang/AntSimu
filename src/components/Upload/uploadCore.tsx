import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import {IUploadCore, IUploadFile} from './interface';

function axiosUpload(files: FileList, props: IUploadCore, changeFileList: Dispatch<SetStateAction<IUploadFile[]>>):void {
  
  const { 
    action,
    headers,
    withCredentials,
    onProgress,
    method,
    filename = 'file',
    onError,
    onSuccess,
    beforeUpload
  } = props;

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

  const updateFileList = (updateFile: IUploadFile, updateObj: Partial<IUploadFile>) => {
    
    changeFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj};
        } else {
          return file;
        }
      })
    })
  }

  const uploadFile = (file: File) => {
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
        cancelToken: new axios.CancelToken((canceler) => {
          updateFileList(_file, {cancel: canceler})
        }),
        onUploadProgress: (e: any) => {
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

      changeFileList(prevList => [_file, ...prevList]);
      axiosReq.then(res => {
        updateFileList(_file, {status: 'success', response: res.data, percent: 100})
        onSuccess && onSuccess(res.data, file);
      }).catch(err => {
        updateFileList(_file, {status: 'error', error: err, percent: 100})
        onError && onError(err, file);
      })
    })
  }
}

export default axiosUpload;