import "./FiltersTable.scss";
import { Table, Tag, Button } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FiltersFileForm from "../FiltersFileForm/FiltersFileForm";

const FiltersTable = () => {
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [data, setData] = useState();

  const fetchData = () => {
    setLoading(true);
     fetch(`http://backend.patenthelper.digital/filters`, {
       method: "GET",
     })
       .then((res) => res.json())
       .then((data) => {
        setPageSize(data.length)
         setData(
           data.reverse()
         );
         setLoading(false);
       });
  };
  useEffect(() => {
    fetchData();
  }, [uploaded]);

  const deleteFilterFile = (id) => {
    const fetchData = () => {
      setLoading(true);
      fetch(`http://backend.patenthelper.digital/filters/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          setUploaded((prev) => !prev);
          setLoading(false);
        })
    };
    fetchData();
  };
  const columns = [
    {
      title: "Название файла",
      dataIndex: "name",
      width: "30%",
      ellipsis: true,
      render: (name) => {
        return <span className="file-name">{name}</span>;
      },
    },
    {
      title: "Файл",
      dataIndex: "filename",
      width: "35%",
      ellipsis: true,
      render: (name) => {
        return <span className="file-name">{name}</span>;
      },
    },
    {
      title: "Дата загрузки",
      dataIndex: "created",
      width: "10%",
      render: (date) => {
        let newForm = date.split("T");
        newForm = newForm[0] + " " + newForm[1].slice(0, -7);
        return <span className="file-date">{newForm}</span>;
      },
    },
    {
      title: "Количество ИНН",
      dataIndex: "tax_numbers_count",
      align: "center",
      width: "10%",
      render: (count) => {
        return (
          <Tag
            color="purple"
            key={Math.random().toString(36).substring(3, 9)}
            className="status-tag"
          >
            <i>{count}</i>
          </Tag>
        );
      },
    },
    {
      key: "operation",
      align: "center",
      width: "15%",
      render: ({ id }) => {
        return (
          <Button
            icon={<DeleteOutlined />}
            onClick={() => deleteFilterFile(id)}
          >
            Удалить из базы
          </Button>
        );
      },
    },
  ];

  return (
    <div className="filters-table-container">
      <Table
        scroll={{
          y: 950,
        }}
        title={() => <FiltersFileForm onUpload={setUploaded} />}
        className="patent-table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{
          position: ["none"],
          pageSize: pageSize
        }}
      />
    </div>
  );
};

export default FiltersTable;
