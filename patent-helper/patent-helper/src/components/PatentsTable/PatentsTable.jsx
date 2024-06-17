import "./PatentsTable.scss";
import { Table, Tag, Card, Alert, Space, Row, Col, Select, Button } from "antd";
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
    filters: [
      {
        text: "Изобретение",
        value: 1,
      },
      {
        text: "Полезная модель",
        value: 2,
      },
      {
        text: "Промышленный образец",
        value: 3,
      },
    ],
    filterMultiple: false,
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
    title: "Авторы",
    width: "20%",
    dataIndex: "author_raw",
    render: (author) => <pre key={author}>{author}</pre>,
  },
  {
    title: "Патентообладатели",
    hidden: true,
    width: "20%",
    dataIndex: "patent_holders",
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
    filters: [
      {
        text: "Истек",
        value: false,
      },
      {
        text: "Действует",
        value: true,
      },
    ],
    filterMultiple: false,
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
    align: "center",
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
    const [filterOptions, setFilterOptions] = useState();
    const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disabledDownload, setDisabledDownload] = useState(true)
  
  const [filters, setFilters] = useState();
  const [filterFile, setFilterFile] = useState();
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
    setFilters(filters)
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
      setFilterFile(value)
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
          setFilterOptions(
            data.map((fil) => {
              return {
                value: fil.id,
                label: fil.name,
              };
            })
          );
          setFilterOptionsLoading(false);
        });
    };
    useEffect(() => {
      fetchFilterOptions();
    }, []);
    const fetchFilteredData = () => {
      let filterString = "";

      if (filterFile && filterFile.length !== 0) {
        filterString += `&filter_id=${filterFile[0]}`;
      }

      if (filters && filters.kind) {
        filterString += `&kind=${filters.kind[0]}`;
      }
      if (filters && filters.actual) {
        filterString += `&actual=${filters.actual[0]}`;
      }
      console.log(filterString);
       fetch(
         `http://backend.patenthelper.digital/patents?${qs.stringify(
           getParams(tableParams)
         )}${filterString}`,
         {
           method: "GET",
         }
       )
         .then((res) => res.json())
         .then((data) => {
          console.log(data)
          
           setData(data.items);
           setLoading(false);
           setDisabledDownload(false)
           setTableParams({
             ...tableParams,
             pagination: {
               ...tableParams.pagination,
               total: data.total,
             },
           });
         });
      console.log(filters, filterFile);
      // fetch(`http://backend.patenthelper.digital/filters`, {
      //   method: "GET",
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setFilterOptions(
      //       data.map((fil) => {
      //         return {
      //           value: fil.id,
      //           label: fil.name,
      //         };
      //       })
      //     );
      //     setFilterOptionsLoading(false);
      //   });
    };
      const fetchExport = () => {
        let filterString = "";

        if (filterFile && filterFile.length !== 0) {
          if (filterString.length === 0 ){
            filterString += `filter_id=${filterFile[0]}`;
          } else {
            filterString += `&filter_id=${filterFile[0]}`;
          }
          
        }

        if (filters && filters.kind) {
                    if (filterString.length === 0) {
                      filterString += `kind=${filters.kind[0]}`;;
                    } else {
                      filterString += `&kind=${filters.kind[0]}`;
                    }
          
        }
        if (filters && filters.actual) {
          if (filterString.length === 0) {
            filterString += `actual=${filters.actual[0]}`;
          } else {
            filterString += `&actual=${filters.actual[0]}`;
          }
          
        }
        console.log(filterString);
        console.log(`http://backend.patenthelper.digital/patents/export?${filterString}`)
        fetch(
          `http://backend.patenthelper.digital/patents/export?${filterString}`,
          {
            method: "GET",
          }
        )
          .then((res) => {
            res.blob()
      })
          
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `filtered.xlsx`);
             // 3. Append to html page
             document.body.appendChild(link);
             // 4. Force download
             link.click();
             // 5. Clean up and remove the link
             link.parentNode.removeChild(link);

            // setData(data.items);
            // setLoading(false);
            // setTableParams({
            //   ...tableParams,
            //   pagination: {
            //     ...tableParams.pagination,
            //     total: data.total,
            //   },
            // });
          });
        console.log(filters, filterFile);
        // fetch(`http://backend.patenthelper.digital/filters`, {
        //   method: "GET",
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setFilterOptions(
        //       data.map((fil) => {
        //         return {
        //           value: fil.id,
        //           label: fil.name,
        //         };
        //       })
        //     );
        //     setFilterOptionsLoading(false);
        //   });
      };

  return (
    <div className="table-container">
      <Table
        scroll={{
          y: 840,
        }}
        title={() => (
          <div className="form-container">
            <div >
              <Select
                showSearch
                placeholder="Выберите фильтр"
                optionFilterProp="children"
                onChange={onSelectFilterChange}
                onSearch={onSelectFilterSearch}
                filterOption={selectFilterOption}
                options={filterOptions}
                loading={filterOptionsLoading}
           
                mode="tags"
                maxCount={1}
                style={{
                  width: "300px",
                }}
              />
              <Button
                style={{
                  marginLeft: "1rem",
                }}
                onClick={fetchFilteredData}
              >
                Фильтровать
              </Button>
            </div>
            <Button
              style={{
                alignSelf: "right",
              }}
              onClick={fetchExport}
              disabled={disabledDownload}
            >
              Выгрузить результат
            </Button>
          </div>
        )}
        className="patent-table"
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.req_number}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default PatentsTable;
