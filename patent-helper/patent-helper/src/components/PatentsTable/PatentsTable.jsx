import "./PatentsTable.scss";
import { Table, Tag, Card, Alert, Space } from "antd";
import { useState, useEffect } from "react";
import qs from "qs";
import { Link } from "react-router-dom";
const getParams = (params) => ({
  page: params.pagination?.current,
  pagesize: params.pagination?.pageSize,
});

const getKindTag = (id) => {
  const tag = { title: "", color: "" };
  switch (id) {
    case 1:
      tag.title = "Изобретение";
      tag.color = "cyan";
      break;
    case 2:
      tag.title = "Полезная модель";
      tag.color = "geekblue";
      break;
    default:
      tag.title = "Промышленный образец";
      tag.color = "purple";
      break;
  }
  return tag;
};

const columns = [
  {
    title: "Название",
    dataIndex: "name",
    width: "20%",
    render: (name) => {
      return (
        <span className="patent-name">
          {name.substring(0, 1).toUpperCase() + name.slice(1).toLowerCase()}
        </span>
      );
    },
  },
  {
    dataIndex: "kind",
    width: "10%",
    align: "center",
    render: (tag) => {
      const { title, color } = getKindTag(tag);
      return (
        <Tag
          color={color}
          key={Math.random().toString(36).substring(3, 9)}
          className="kind-tag"
        >
          <i>{title}</i>
        </Tag>
      );
    },
  },
  {
    title: "Авторы",
    width: "20%",
    dataIndex: "author_raw",
    render: (author) => <pre key={author}>{author}</pre>,
  },
  {
    title: "Патентообладатели",
    width: "20%",
    dataIndex: "patent_holders",
    hidden: true,
    render: (holders) => {
      <>
        {holders.map((holder) => {
          return (
            <Card
              size="small"
              extra={<a href="#">{"ИНН " + holder.tax_number}</a>}
            >
              <p>{holder.full_name}</p>
            </Card>
          );
        })}
      </>;
    },
  },
  {
    title: "Дата регистрации",
    align: "center",
    width: "10%",
    dataIndex: "reg_date",
  },
  {
    title: "Актуальность",
    width: "10%",
    dataIndex: "actual",
    align: "center",
    render: (actual) =>
      actual ? (
        <Tag color="green" key={actual} className="actual-tag">
          <i>Действует</i>
        </Tag>
      ) : (
        <Tag color="volcano" key={actual} className="actual-tag">
          <i>Истек</i>
        </Tag>
      ),
  },
  {
    key: "operation",
    width: "10%",
    align: 'center',
    render: ({ kind, reg_number }) => {
      return (
        <Link to={`/patent/${kind}/${reg_number}`}>
          <Tag color="geekblue" key={kind + reg_number} className="action-tag">
            <i>Просмотр</i>
          </Tag>
        </Link>
      );
    },
  },
];

const PatentsTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `http://backend.patenthelper.digital/patents?${qs.stringify(
        getParams(tableParams)
      )}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.total,
          },
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      <Table
        scroll={{
          y: 590,
        }}
        title={() => <span className="header">Патенты</span>}
        className="patent-table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.req_number}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default PatentsTable;
