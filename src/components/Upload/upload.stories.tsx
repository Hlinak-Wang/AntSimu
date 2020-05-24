import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from './upload';
import { IUploadFile } from './interface';
import Button from '../Button/button';
import { action } from '@storybook/addon-actions';

const defaultFileList: IUploadFile[] = [
  {uid: 122, name: '12.txt', size: 10224, status: 'success', percent: 100},
  {uid: 124, name: '13.txt', size: 10234, status: 'error', percent: 0},
  {uid: 241, name: '14.txt', size: 10244, status: 'onload', percent: 10},
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50)  {
    alert('file too big')
    return false;
  }
  return true;
}

const changFile = (file: File) => {
  const newFile = new File([file], "new.doc", {type: file.type});
  return Promise.resolve(newFile);
}

storiesOf('Upload', module)
  .add('test', () => (
    <Upload 
      dragEnable
      action="http://www.mocky.io/v2/5ec39a30300000720039c1e2"
      defaultFileList={defaultFileList}
      onProgress={ action('progress')}
      onSuccess={ action('success')}
      onError={ action('error')}
    >
      upload
    </Upload>
  ))
  .add('beforeUpload Check', () => (
    <Upload
      action="http://www.mocky.io/v2/5ec39a30300000720039c1e2"
      beforeUpload={checkFileSize}
      onProgress={ action('progress')}
      onSuccess={ action('success')}
      onError={ action('error')}
    >
      <Button>upload</Button>
    </Upload>
  ))
  .add('change file', () => (
    <Upload
      action="http://www.mocky.io/v2/5ec39a30300000720039c1e2"
      beforeUpload={changFile}
      onProgress={ action('progress')}
      onSuccess={ action('success')}
      onError={ action('error')}
      onChange={() => console.log("change")}
      //onChange={ action('change')}
    >
      <Button>upload</Button>
    </Upload>

  ))
  .add('add acceptent', () =>(
    <Upload
      action="http://www.mocky.io/v2/5ec39a30300000720039c1e2"
      onProgress={ action('progress')}
      onSuccess={ action('success')}
      onError={ action('error')}
      accept={[".png", ".jpg"]}
    >
      <Button>upload</Button>
    </Upload>
  ))