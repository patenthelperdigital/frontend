import './FiltersFileForm.scss'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message , Input, Tooltip} from 'antd';
import React, { useState } from 'react';
import excelIcon from '/excel.svg'

const FiltersFileForm = ({onUpload}) => {
  const [inputVal, setInputVal] = useState('')
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setFileList([]);
    const formData = new FormData();
    formData.append("file", file);
    const name = inputVal
      ? inputVal
      : file.name.slice(0, -5);
    setUploading(true);
    setInputVal("");
    fetch(
      `http://backend.patenthelper.digital/filters?name=${name}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.filename) {
          message.error(`Серверная ошибка! Пожалуйста, попробуйте позже`);
        }
      })
      .finally(() => {
        setFile(null);
        setFileList([]);
        setUploading(false);
        onUpload(prev => !prev);
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
    iconRender: () => <img src={excelIcon} alt="xlsx" />,
    onRemove: () => {
      setFile(null)
      setFileList([])
    },
  };
  return (
    <div className="upload-container">
      <Upload {...props}>
        <Button icon={<UploadOutlined />} className="upload-btn">
          Прикрепить файл
        </Button>
      </Upload>
      <Input
        className="upload-btn"
        placeholder="Название файла (опционально)"
        onChange={(e) => setInputVal(e.target.value)}
        value={inputVal}
      />
        <Button
          className="upload-btn"
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? "Загрузка..." : "Загрузить"}
        </Button>
    </div>
  );
}

export default FiltersFileForm;

