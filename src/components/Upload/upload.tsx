import React, { FC, useRef, MouseEvent, useState } from 'react';
import UploadList from './uploadList';
import UpLoadCore from './uploadCore';
import { IUploadFile, IUploadProps} from './interface';
import Dragger from './dragger';

export const Upload: FC<IUploadProps> = (props) => {
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
    onChange,
    dragArea,
    ...uploadProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<IUploadFile[]>(defaultFileList || []);

  const handleChange = (files: IUploadFile[]) => {
    setFileList([...files])
    onChange && onChange(files)
  } 
  
  const handleClick = (e: MouseEvent) => {
    console.log('click')
    e.preventDefault()
    inputRef.current && inputRef.current.click();
  }

  const hanldeRemove = (file: IUploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    })
    onRemove && onRemove(file)
  }

  return (
    <div className="hlinak-upload-component">
      <div className="hlinak-upload-input" onClick={handleClick}>
        {
          dragArea
          ? <Dragger
            
            >{children}</Dragger>
          : children
        }
      </div>
      <UpLoadCore 
        fileList={fileList}
        onChange={handleChange}
        ref={inputRef}
        {...uploadProps}
      />
      <UploadList fileList={fileList} onRemove={hanldeRemove}/>
    </div>
  )
}

Upload.defaultProps = {
  method: 'post',
  multiple: false,
}

export default Upload;