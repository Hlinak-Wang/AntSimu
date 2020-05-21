import React, { FC, DragEvent, useState } from 'react';
import classnames from 'classnames';

export interface DraggerProps {
  onFile: (files: FileList) => void,
}

export const Dragger:FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [ dragOver, setDragOver] = useState(false);
  
  const dragCls = classnames("hlinak-upload-dragger-container", {
    "is-dragOver": dragOver
  })

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  }
  
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    setDragOver(over)
  }

  return (
    <div 
      className={dragCls}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      <div className="hlinak-upload-dragger-content">
        Click or Drag file to this area to upload
        {children}
      </div>
    </div>
  )
}

export default Dragger;