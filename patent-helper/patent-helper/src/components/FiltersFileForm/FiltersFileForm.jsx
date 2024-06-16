import './FiltersFileForm.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message , Input} from 'antd';
import React, { useState, useRef } from 'react';
import excelIcon from '/excel.svg'



const FiltersFileForm = ({onUpload}) => {
  const input = useRef();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    setFileList([]);
    const formData = new FormData();
    formData.append("file", file);
    const name = input.current?.value ? input.current?.value : file.name.slice(0, -5);
    setUploading(true);
    fetch(
      `http://backend.patenthelper.digital/filters?name=${name}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        res.json();
      })
      .finally(() => {
        setFile(null);
        setFileList([]);
        setUploading(false);
        onUpload(prev => !prev);
        input.current.value = '';
      });
  };
  const props = {
    beforeUpload: (file) => {
      const isExcel =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExcel) {
        message.error(`Формат ${file.name} не xlsx!`);
        return Upload.LIST_IGNORE;
      } else {
        setFile(file);
        setFileList([file]);
        return false;
      }
      
    },
    maxCount: '1',
    fileList,
    listType: "picture",
    iconRender: () => <img src={excelIcon} alt="" />,
    onRemove: () => {
      setFile(null)
      setFileList([])
    },
  };
  return (
    <div className="upload-container">
      <Upload {...props}>
        <Button icon={<UploadOutlined />} className="upload-btn">
          Upload
        </Button>
      </Upload>
      <Input
        ref={input}
        className="upload-btn"
        placeholder="Название файла (опционально)"
      />
      ;
      <Button
        className="upload-btn"
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </div>
  );
}

export default FiltersFileForm;

