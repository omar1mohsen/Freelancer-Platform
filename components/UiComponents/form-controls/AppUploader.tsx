import React, { useEffect, useState,useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Spin, Upload } from 'antd';
import type { FormInstance, UploadFile, UploadProps } from 'antd';
import { useTranslations } from 'next-intl';
import { EditIcon } from '@/assets/svgs/Icons';
import AppModal from '../Modal/AppModal';
import toast from 'react-hot-toast';
import axiosInstance from '@/services/axiosGeneral';

import "@/styles/components/app-uploader.scss";

type FileType = File;

interface ImageWallProps {
  initialFileList?: any;
  onChange?: (fileList: UploadFile[]) => void;
  onRemove?: (fileList: UploadFile[]) => void;
  maxCount?: number;
  disabled?: boolean;
  hideTitle?: boolean;
  singleFile?: boolean;
  uploadText?: string;
  form: FormInstance;
  shapeType?: any;
  type_file?: 'image' | 'document' | 'media';
  name: string;
  model: string;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

  const AppUploader: React.FC<ImageWallProps> = ({
    onChange,
    maxCount = 1,
    disabled,
    uploadText,
    form,
    shapeType = "picture-card",
    type_file = 'image',
    singleFile,
    name = "image",
    model,
    initialFileList = [],
    onRemove
  }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [previewType, setPreviewType] = useState<'image' | 'video' | 'document' | ''>('');
    const [fileList, setFileList] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations();
  const memoizedInitialFileList = useMemo(() => initialFileList, [JSON.stringify(initialFileList)]);
  
    useEffect(() => {
        setFileList(memoizedInitialFileList);
    }, [memoizedInitialFileList]);
  
    const handlePreview = async (file: UploadFile) => {
      if (type_file === 'document') {
        setPreviewType('document');
        setPreviewContent(file.url || (file.preview as string));
      } else if (type_file === 'media') {
        const isVideo = file.type?.startsWith('video');
        setPreviewType(isVideo ? 'video' : 'image');
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewContent(file.url || (file.preview as string));
      } else {
        setPreviewType('image');
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewContent(file.url || (file.preview as string));
      }
      setPreviewOpen(true);
    };
  
    const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
      try{
        setLoading(true)
        for (let file of newFileList as any) {
          if (fileList.some((f: any) => f.name === file.name)) {
            continue;
          }
          let attachmentType = '';
          if (file.type.startsWith('image/')) {
            attachmentType = 'image';
          } else if (file.type.startsWith('video/')) {
            attachmentType = 'video';
          } else {
            attachmentType = 'file'; 
          }
    
          const formData = new FormData();
          formData.append("file", file.originFileObj);
          formData.append("attachment_type", attachmentType); 
          formData.append("model", model);
    
          try {
            const { data } = await axiosInstance.post('/attachments', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (data) {
              file.status = "done";
              setFileList((prevList: any) => [...prevList, file]);
              if (onChange) {
                onChange(data?.data);
              } else {
                form.setFieldValue(name, data?.data); 
                console.log("🚀 ~ handleChange ~ name:", name)
              }
            }
            console.log("🚀 ~ handleChange ~ name:", form.getFieldValue(name))
          } catch (error:any) {
            toast.error(error?.response?.data?.message)
          }
        }
      }catch(error:any){
        console.log("🚀 ~ upload error:", error)
      }finally{
        setLoading(false)
      }
    };
  
    const handleRemove = async (file: UploadFile) => {
      if (file?.uid) {
        const isLocalFile = typeof file?.uid === 'string' && (file?.uid.startsWith("rc-upload") || file?.uid.startsWith("__AUTO__"));
    
        if (isLocalFile) {
          const updatedFiles = fileList.filter((item: any) => item.uid !== file.uid);
          setFileList(updatedFiles);
          form.setFieldValue(name, updatedFiles);
    
          if (onRemove) {
            onRemove(updatedFiles);
          }
          return; 
        }
    
        setLoading(true);
        try {
          const { data } = await axiosInstance.delete(`/attachments/${file.uid}`);
          if (data) {
            const updatedFiles = fileList.filter((item: any) => item.uid !== file.uid);
            setFileList(updatedFiles);
            if (onRemove) {
              onRemove(updatedFiles);
            }
            form.setFieldValue(name, updatedFiles);
    
          }
        } catch (error) {
          console.error("Error deleting file:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const beforeUpload = (file: FileType) => {
      if (type_file === 'document') {
        // Allowed mime types for document
        // const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const allowedTypes = ['application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          toast.error(t('Messages.onlyPdfAllowed'));
          return Upload.LIST_IGNORE; 
        }
      }
      return true;
    };
    
  
    const uploadButton = (
      <button
        className='bg-transparent border-none flex flex-col items-center justify-center'
        type="button"
      >
        {fileList.length !== 0 && singleFile ? (
          <div className='absolute bottom-0 start-0'>
            <EditIcon />
          </div>
        ) : (
          <div className='flex-col justify-center items-center gap-2.5 inline-flex'>
            <span className='size-6 rounded-full border border-[#ababab]'>
              <PlusOutlined />
            </span>
            {uploadText}
          </div>
        )}
      </button>
    );
  
    return (
      <>
        <Spin spinning={loading}>
          <Upload
            beforeUpload={beforeUpload}
            customRequest={() => ""} 
            listType={shapeType}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={handleRemove}
            accept={type_file === 'media' ? 'image/*,video/*' : type_file === 'image' ? 'image/*' : '.pdf,.doc,.docx'}
            className={`${type_file === 'image' ? 'image-uploader' : type_file === "media" ? fileList.length < 1 ? "file-uploader" : "image-uploader" : 'file-uploader'}`}
            disabled={disabled}
            maxCount={maxCount}
          >
            {fileList.length >= maxCount ? null : uploadButton}
          </Upload>
        </Spin>
  
        {/* Preview Modal */}
        {previewOpen && (
          <AppModal
            isModalVisible={previewOpen}
            width={previewType === 'document' ? '80%' : 'fit-content'}
            getContainer={"html"}
            onCancel={()=>setPreviewOpen(false)}
            centered
            key={`app-Preview-modal`}
            wrapperClassName={`${previewType === 'document' ? "file-modal":""}`}
          >
            {previewType === 'video' ? (
              <video controls style={{ width: '100%' }}>
                <source src={previewContent} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : previewType === 'document' ? (
              <iframe
                src={previewContent || ''}
                style={{ width: '100%', border: 'none' }}
                className='h-[80vh]'
              />
            ) : (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewContent(''),
                }}
                src={previewContent}
              />
            )}
          </AppModal>
        )}
      </>
    );
  };
  
  export default AppUploader;
  