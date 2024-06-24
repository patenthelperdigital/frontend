import "./HoldersTable.scss";
import { Table, Tag, Select } from "antd";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";
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

const HoldersTable = () => {
  const [filterId, setFilterId] = useContext(FilterContext);
  const [data, setData] = useState();
   const [filterOptions, setFilterOptions] = useState();
   const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
   const [loading, setLoading] = useState(false);
   const [filteredInfo, setFilteredInfo] = useState({});
   const [filterFile, setFilterFile] = useState(filterId ? [filterId] : []);
   const [tableParams, setTableParams] = useState({
     pagination: {
       current: 1,
       pageSize: 10,
     },
   });

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
       filters: [
         {
           text: "Юридическое лицо",
           value: 1,
         },
         {
           text: "Физическое лицо",
           value: 2,
         },
       ],
       filterMultiple: false,
       filteredValue: filteredInfo.kind || null,
       render: (tag) => {
         const { title, color } = getKindTag(tag);
         return (
           <Tag
             color={color}
             key={Math.random().toString(36).substring(3, 9)}
             className="kind-tag"
           >
             {title.split(" ").map((word) => (
               <p style={{ margin: 0, padding: 0, lineHeight: "100%" }}>
                 {word}
               </p>
             ))}
           </Tag>
         );
       },
     },
     {
       title: "Категория",
       dataIndex: "category",
       align: "center",
       filters: [
         {
           text: "ВУЗы",
           value: 1,
         },
         {
           text: "Высокотехнологичные ИТ компании",
           value: 2,
         },
         {
           text: "Колледжи",
           value: 3,
         },
         {
           text: "Научные организации",
           value: 4,
         },
         {
           text: "Прочие организации",
           value: 5,
         },
       ],
       filterMultiple: false,
       filteredValue: filteredInfo.category || null,
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
       filteredValue: filteredInfo.active || null,
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
             <Tag
               color="geekblue"
               key={"p" + tax_number}
               className="action-tag"
             >
               <i>Просмотр</i>
             </Tag>
           </Link>
         );
       },
     },
   ];

  // const fetchData = () => {
  //   setLoading(true);
  //   let filterString = "";
  //   if (tableParams.filters?.actual) {
  //     filterString += `&actual=${tableParams.filters.actual}`;
  //   }
  //   if (tableParams.filters?.kind) {
  //     filterString += `&kind=${tableParams.filters.kind[0]}`;
  //   }
  //   fetch(
  //     `http://backend.patenthelper.digital/persons?${qs.stringify(
  //       getParams(tableParams)
  //     )}${filterString}`,
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
  const handleTableChange = (pagination, filters) => {
    setFilteredInfo(filters);
    setTableParams({
      pagination,
      filters,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const selectFilterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSelectFilterChange = (value) => {
     if (value.length === 0) setFilterId();
     setFilterFile(value);
  };

    const fetchFilteredData = () => {
      setLoading(true);
      let filterString = "";

      if (filterFile && filterFile.length !== 0) {
        filterString += `&filter_id=${filterFile[0]}`;
        setFilterId(filterFile[0]);
      }

      if (filteredInfo && filteredInfo.kind) {
        filterString += `&kind=${filteredInfo.kind[0]}`;
      }

      if (filteredInfo && filteredInfo.category) {
        filterString += `&category=${filteredInfo.category[0]}`;
      }

      if (filteredInfo && filteredInfo.active) {
        filterString += `&active=${filteredInfo.active[0]}`;
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
      fetchFilteredData();
    }, [
      filteredInfo,
      filterFile,
      tableParams.pagination?.current,
      tableParams.pagination?.pageSize,
    ]);

  const fetchFilterOptions = () => {
    fetch(`http://backend.patenthelper.digital/filters`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFilterOptions(
          data.reverse().map((fil) => {
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

  return (
    <div className="table-container">
      <Table
        scroll={{
          y: 950,
        }}
        title={() => (
          <div className="form-container">
            <div>
              <Select
                showSearch
                placeholder="Выберите фильтр"
                optionFilterProp="children"
                onChange={onSelectFilterChange}
                value={filterFile}
                filterOption={selectFilterOption}
                options={filterOptions}
                loading={filterOptionsLoading}
                mode="tags"
                maxCount={1}
                style={{
                  width: "300px",
                }}
              />
            
            </div>
            
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

export default HoldersTable;
