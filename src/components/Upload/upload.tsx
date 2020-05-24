import React, { FC, useRef, MouseEvent, useState, ChangeEvent, DragEvent, useEffect } from 'react';
import UploadList from './uploadList';
import axiosUpload from './uploadCore';
import { IUploadFile, IUploadProps } from './interface';
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
    multiple,
    accept,
    onChange,
    dragEnable,
    ...uploadProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<IUploadFile[]>(defaultFileList || []);

  useEffect(() => {
    onChange && onChange(fileList);
  }, [fileList]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    axiosUpload(files, uploadProps, setFileList);
    inputRef.current!.value = "";
  }
  
  const handleClick = (e: MouseEvent) => {
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
      <div className="hlinak-upload-trigger" onClick={handleClick}>
        {
          dragEnable
          ? <Dragger
              onFile={(files) => {axiosUpload(files, props, setFileList)}}
            >{children}
            </Dragger>
          : children
        }
      </div>
      <input
        type="file"
        style={{display: "none"}}
        onChange={handleChange}
        ref={inputRef}
        multiple={multiple} 
        accept={accept && accept.toString()}
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