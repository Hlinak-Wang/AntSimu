import React, { FC } from 'react';
import { UploadFile} from './upload';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import { IAnimObject } from 'rc-tween-one/typings/AnimObject';
import classnames from 'classnames';
import Progress from '../Progress/progress';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = (props) => {

  const { 
    fileList,
    onRemove,
 } = props;

  const enterAnim: IAnimObject[] = [
    {
      opacity: 0, x: 30, duration: 0,
    },
    {
      height: 0,
      duration: 200,
      type: 'from',
      delay: 250,
      ease: 'easeOutQuad',
    },
    {
      opacity: 1, x: 0, duration: 250, ease: 'easeOutQuad', height: 'auto'
    },
  ]

  const exitAnim: IAnimObject[] = [
    { duration: 250, opacity: 0 },
    { height: 0, duration: 200, ease: 'easeOutQuad' },
  ]

  return (
    <TweenOneGroup
      component="ul"
      className="upload-file-group"
      enter={enterAnim}
      leave={exitAnim}
      exclusive
    >
      {
        fileList.map(file => {
          const cls = classnames('upload-file', {
            [`upload-file-${file.status}`]: 1
          })
          return (
            <li key={file.uid} className={cls}>
                <i className="fas fa-file-alt fa-sm upload-file-icon" />
                {file.name}
              <div className="upload-file-status">
                {file.status === 'onload' && <i className="fas fa-spinner fa-spin"></i>}
                {file.status === 'success' && <i className="fas fa-check-circle"></i>}
                {file.status === 'error' && <i className="fas fa-times-circle"></i>}
              </div>
              <div className="upload-file-action">
                <i className="fas fa-times" onClick={() => {onRemove && onRemove(file)}}></i>
              </div>
              <TweenOne
                animation={
                  file.status === 'onload' ? [
                  {opacity: 0, height: 0, y: -30, duration: 0},
                  {height: 0, duration: 200, type: 'from', delay: 250,  ease: 'easeOutQuad'},
                  {opacity: 1, y: 0, duration: 250, ease: 'easeOutQuad', height: 'auto'}
                  ] : [
                    {opacity: 0, duration: 200, delay: 250,  ease: 'easeOutQuad'},
                    {height: 0, duration: 200},
                  ]
                }
              >
                <Progress 
                  percent={file.percent || 0} 
                  strokeHeight={2} 
                  showInfo={false} 
                  status={
                    file.status === 'onload' 
                    ? 'onProgress' 
                    : file.status === 'success' ? 'progressFinish' : 'progressFail'
                  }
                />
              </TweenOne>
            </li>
          )
        })
      }
    </TweenOneGroup>
  )
}

export default UploadList;