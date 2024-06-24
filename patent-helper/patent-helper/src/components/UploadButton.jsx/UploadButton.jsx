import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
const props = {
  action: "//jsonplaceholder.typicode.com/posts/",
  listType: "picture",
  previewFile(file) {
    return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
      method: "POST",
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};
const UploadButton = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Расширить базу патентов</Button>
  </Upload>
);
export default  UploadButton;
