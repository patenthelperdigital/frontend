import "./FiltersTable.scss";
import { Table, Tag, Button } from "antd";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import FiltersFileForm from "../FiltersFileForm/FiltersFileForm";

const FiltersTable = () => {
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
         setData(
           data
         );
         setLoading(false);
       });
  };
  useEffect(() => {
    fetchData();
  }, [uploaded]);

  const deleteFilterFile = (id) => {
    console.log(id)
    const fetchData = () => {
      setLoading(true);
      fetch(`http://backend.patenthelper.digital/filters/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setUploaded(prev => !prev);
          setLoading(false);
        });
    };
    fetchData();
  };
  const columns = [
    {
      title: "Название файла",
      dataIndex: "name",
      render: (name) => {
        return <span className="file-name">{name}</span>;
      },
    },
    {
      title: "Файл",
      dataIndex: "filename",
      render: (name) => {
        return <span className="file-name">{name}</span>;
      },
    },
    {
      title: "Дата загрузки",
      dataIndex: "created",
      render: (date) => {
        let newForm = date.split("T");
        newForm = newForm[0] + ' ' + newForm[1].slice(0, -8);
        return <span className="file-date">{newForm}</span>;
      },
    },
    {
      title: "Количество ИНН",
      dataIndex: "tax_numbers_count",
      align: "center",
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
          y: 590,
        }}
        title={() => <FiltersFileForm onUpload={setUploaded} />}
        className="patent-table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
        loading={loading}
        pagination={{
          position: ["none"],
        }}
      />
    </div>
  );
};

export default FiltersTable;
