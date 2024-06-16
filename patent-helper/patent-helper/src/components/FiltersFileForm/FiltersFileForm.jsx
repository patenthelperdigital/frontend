import './FiltersFileForm.scss'

import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Space } from 'antd';
import React, { useState } from 'react';




const FiltersFileForm = ({onUpload}) => {
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([])
  const [uploading, setUploading] = useState(false);
  const handleUpload = () => {
    setFileList([]);
    const date = new Date()
    const loadDateTime = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const tableRow = {
      file_id: file.uid,
      file_name: file.name,
      load_date: loadDateTime,
      status: "loading",
    };
    const table = JSON.parse(localStorage.getItem("table"));
    table.length === 0
      ? localStorage.setItem("table", JSON.stringify([tableRow]))
      : localStorage.setItem("table", JSON.stringify([tableRow, ...table]));
    onUpload(JSON.parse(localStorage.getItem("table")));
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFile(null);
        setFileList([])
        const table = JSON.parse(localStorage.getItem("table")).map((row) => {
          if (row.file_id === file.uid) {
            row.status = "success";
          }
          return row;
        });
        localStorage.setItem("table", JSON.stringify(table));
        onUpload(JSON.parse(localStorage.getItem("table")));
      })
      .catch(() => {
        const table = JSON.parse(localStorage.getItem("table")).map((row) => {
          if (row.file_id === file.uid) {
            row.status = "error";
          }
          return row;
        });
        localStorage.setItem("table", JSON.stringify(table));
        onUpload(JSON.parse(localStorage.getItem("table")));
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    beforeUpload: (file) => {
      console.log(file.type);
      const isExcel =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (!isExcel) {
        message.error(`${file.name} is not a xlsx file`);
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
    onRemove: () => {
      setFile(null)
      setFileList([])
    },
  };
  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">   
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{
          marginTop: 16,
        }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </Space>
  )
}

export default FiltersFileForm;

