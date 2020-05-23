export interface IUploadFile {
  uid: number,
  size: number,
  name: string,
  status?: 'success' | 'onload' | 'error',
  percent?: number,
  file?: File,
  response?: any,
  error?: any,
}

export interface IUploadRef {
  focus: () => void;
  blur: () => void;
  click: () => void;
  upload: (files: FileList) => void;
}

export interface IUploadCore {
  /**上传了的文件 */
  fileList?: IUploadFile[];
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
  onChange?: (files: IUploadFile[]) => void;
}

export interface IUploadProps extends IUploadCore {
  /**默认已经上传的文件列表 */
  defaultFileList?: IUploadFile[];
  /**是否支持上传文件夹 */
  directory?: boolean;  
  /**是否禁用 */
  disabled?: boolean;
  /**上传列表的内建样式 */
  listType?: 'text' | 'picture';
  /**上传所需额外参数或返回上传额外参数的方法 */
  data?: object | ((file: File) => object);
  /**
   * 是否使用拖拽
   *  @default false
   */
  dragEnable?: boolean;
  /** */
  onDownLoad?: (file: File) => void;
  /**点击移除文件时的回调，返回值为 false 时不移除。
   * 支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除。
   */
  onRemove?: (file: IUploadFile) => void;
  /**点击文件或图片时的回调 */
  onPreview?: (file: IUploadFile) => void;
}