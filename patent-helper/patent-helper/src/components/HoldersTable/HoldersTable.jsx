import "./HoldersTable.scss";
import { Table, Tag, Card, Alert, Space, Select, Row, Col } from "antd";
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
      tag.title = "Юридическое лицо";
      tag.color = "cyan";
      break;
    default:
      tag.title = "Физическое лицо";
      tag.color = "geekblue";
      break;
  }
  return tag;
};

const columns = [
  {
    title: "ИНН",
    dataIndex: "tax_number",
  },
  {
    title: "Название",
    dataIndex: "short_name",
    render: (name) => {
      return <span className="patent-name">{name}</span>;
    },
  },
  {
    dataIndex: "kind",
    width: "10%",
    align: "center",
    // filters: [
    //   {
    //     text: "Изобретение",
    //     value: 1,
    //   },
    //   {
    //     text: "Полезная модель",
    //     value: 2,
    //   },
    //   {
    //     text: "Промышленный образец",
    //     value: 3,
    //   },
    // ],
    // filterMultiple: false,
    render: (tag) => {
      const { title, color } = getKindTag(tag);
      return (
        <Tag
          color={color}
          key={Math.random().toString(36).substring(3, 9)}
          className="kind-tag"
        >
          {title.split(" ").map((word) => (
            <p style={{ margin: 0, padding: 0, lineHeight: "100%" }}>{word}</p>
          ))}
        </Tag>
      );
    },
  },
  {
    title: "Категория",
    dataIndex: "category",
    render: (cat) => {
      return <span className="patent-name">{cat}</span>;
    },
  },
  {
    title: "Дата регистрации",
    dataIndex: "reg_date",
    align: "center",
  },
  {
    title: "Количество патентов",
    align: "center",
    dataIndex: "patent_count",
  },

  {
    title: "Активна",
    dataIndex: "active",
    align: "center",
    // filters: [
    //   {
    //     text: "Истек",
    //     value: false,
    //   },
    //   {
    //     text: "Действует",
    //     value: true,
    //   },
    // ],
    // filterMultiple: false,
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
    align: "center",
    render: ({ tax_number }) => {
      return (
        <Link to={`/persons/${tax_number}`}>
          <Tag color="geekblue" key={'p' + tax_number} className="action-tag">
            <i>Просмотр</i>
          </Tag>
        </Link>
      );
    },
  },
];

const HoldersTable = () => {
  const [data, setData] = useState();
  const [filterOptions, setFilterOptions] = useState();
const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    let filterString = "";
    if (tableParams.filters?.actual) {
      filterString += `&actual=${tableParams.filters.actual}`;
    }
    if (tableParams.filters?.kind) {
      filterString += `&kind=${tableParams.filters.kind[0]}`;
    }
    fetch(
      `http://backend.patenthelper.digital/persons?${qs.stringify(
        getParams(tableParams)
      )}${filterString}`,
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
    console.log(filters);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const selectFilterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSelectFilterChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSelectFilterSearch = (value) => {
    console.log("search:", value);
  };
  const fetchFilterOptions = () => {
     fetch(`http://backend.patenthelper.digital/filters`, {
       method: "GET",
     })
       .then((res) => res.json())
       .then((data) => {
        setFilterOptions(data.map((fil) => {
          return {
            value: fil.id,
            label: fil.name
          }
        }))
        setFilterOptionsLoading(false)
       });
  }
  useEffect(() => {
    fetchFilterOptions();
  }, []);
  return (
    <>
      <Row>
        <Col sm={6}>
          <Select
            showSearch
            placeholder="Выберите фильтр"
            optionFilterProp="children"
            onChange={onSelectFilterChange}
            onSearch={onSelectFilterSearch}
            filterOption={selectFilterOption}
            options={filterOptions}
            loading={filterOptionsLoading}
          />
        </Col>
      </Row>
      <Table
        scroll={{
          y: 640,
        }}
        title={() => <span className="header">Патентообладатели</span>}
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

export default HoldersTable;
