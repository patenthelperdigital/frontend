import "./FiltersTable.scss";
import { Table, Tag, Card, Alert, Space, Button } from "antd";
import { useState, useEffect } from "react";
import qs, { stringify } from "qs";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import FiltersFileForm from "../FiltersFileForm/FiltersFileForm";
const getParams = (params) => ({
  page: params.pagination?.current,
  pagesize: params.pagination?.pageSize,
});

const getStatusTag = (status) => {
  const tag = { title: "", color: "" };
  switch (status) {
    case "success":
      tag.title = "Загружен";
      tag.color = "lime";
      break;
    case "error":
      tag.title = "Сбой загрузки";
      tag.color = "magenta";
      break;
    default:
      tag.title = "Идет загрузка";
      tag.color = "geekblue";
      break;
  }
  return tag;
};

const dataSource = [
  {
    file_id: "1",
    file_name: "Lorem_ipsum_dolor.xlsx",
    load_date: "10.06.2024 15:30:12",
    status: "success",
  },
  {
    file_id: "2",
    file_name: "sit_amet_consectetur.xlsx",
    load_date: "11.06.2024 10:30:11",
    status: "success",
  },
  {
    file_id: "3",
    file_name: "Lorem_ipsum_dolor.xlsx",
    load_date: "10.06.2024 15:30:12",
    status: "error",
  },
  {
    file_id: "4",
    file_name: "sit_amet_consectetur.xlsx",
    load_date: "11.06.2024 10:30:11",
    status: "loading",
  },
];

const FiltersTable = () => {
  if (!localStorage.getItem("table"))
    localStorage.setItem("table", JSON.stringify([]));
  const [data, setData] = useState(JSON.parse(localStorage.getItem("table")));
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({});

  const deleteFilterFile = (id) => {
    console.log(id)
    const table = JSON.parse(localStorage.getItem("table"));
    console.log(table)
    console.log(
      table.splice(
        table.findIndex((row) => row.file_id === id),
        1
      )
    );
    localStorage.setItem(
      "table",
      JSON.stringify(table.splice(
          table.findIndex((row) => row.file_id === id),
          1
        ),
      )
    );
    setData(JSON.parse(localStorage.getItem("table")));
  };
  const columns = [
    {
      title: "Файл",
      dataIndex: "file_name",
      render: (name) => {
        return <span className="file-name">{name}</span>;
      },
    },
    {
      title: "Дата загрузки",
      dataIndex: "load_date",
      render: (date) => {
        return <span className="file-date">{date}</span>;
      },
    },
    {
      title: "Статус загрузки",
      dataIndex: "status",
      render: (status) => {
        const { title, color } = getStatusTag(status);
        return (
          <Tag
            color={color}
            key={Math.random().toString(36).substring(3, 9)}
            className="status-tag"
          >
            <i>{title}</i>
          </Tag>
        );
      },
    },
    {
      key: "operation",
      align: "center",
      render: ({ file_id }) => {
        return (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteFilterFile(file_id)}
          >
            Удалить из базы
          </Button>
        );
      },
    },
  ];
  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(
  //     `http://backend.patenthelper.digital/patents?${qs.stringify(
  //       getParams(tableParams)
  //     )}`,
  //     {
  //       method: "GET",
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.items);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: data.total,
  //         },
  //       });
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange = (filters, sorter) => {
    setTableParams({
      filters,
      ...sorter,
    });
  };
  return (
    <>
      <Table
        scroll={{
          y: 590,
        }}
        title={() => <FiltersFileForm onUpload={setData} />}
        className="patent-table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.file_id}
        loading={loading}
        onChange={handleTableChange}
        pagination={{
          position: ["none"],
        }}
      />
    </>
  );
};

export default FiltersTable;
