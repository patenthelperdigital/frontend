import { useState, useEffect } from 'react';
import './Patent.scss'
import {
  Col,
  Row,
  Descriptions,
  Card,
  Tag,
  Table,
  Watermark,
  Spin,
} from "antd";
import { useParams, Link } from 'react-router-dom';



// "reg_number": 70753,
// "reg_date": null,
// "appl_date": null,
// "author_raw": "",
// "owner_raw": null,
// "address": "",
// "name": "",
// "actual": false,
// "category": null,
// "subcategory": null,
// "kind": 1,
// "author_count": 0,
// "country_code": "RU",
// "region": null,
// "city": null,
// "patent_holders": []

const Patent = () => {
  const params = useParams()
  const {patent_kind, patent_reg_number} = params;
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true);
  const [processedData, setProcessedData] = useState();
 const [table, setTable] = useState();

  const fetchData = () => {
    setLoading(true);
    fetch(`http://backend.patenthelper.digital/patents/${patent_kind}/${patent_reg_number}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const res = [
          {
            key: "1",
            label: "Название",
            children: data.name,
          },
          {
            key: "2",
            label: "В базе Роспатента №",
            children: data.reg_number,
          },
          {
            key: "3",
            label: "Актуальность",
            children: (
              <Tag color={data.actual ? "green" : "red"} className="tag">
                <p>{data.actual ? "Действует" : "Просрочен"}</p>
              </Tag>
            ),
          },
          {
            key: "4",
            label: "Тип",
            children: (
              <Tag
                color={
                  +data.kind == 1
                    ? "cyan"
                    : +data.kind == 2
                    ? "geekblue"
                    : "purple"
                }
                className="tag"
              >
                <p>
                  {+data.kind == 1
                    ? "Изобретение"
                    : +data.kind == 2
                    ? "Полезная модель"
                    : "Промышленный образец"}
                </p>
              </Tag>
            ),
          },

          {
            key: "5",
            label: "Категория",
            children: data.category,
          },
          {
            key: "6",
            label: "Подкатегория",
            children: data.subcategory,
          },
          {
            key: "6",
            label: "Дата регистрации",
            children: data.reg_date,
          },
          {
            key: "7",
            label: "Дата окончания",
            children: data.appl_date,
          },
          {
            key: "8",
            label: "Код страны",
            children: data.country_code,
          },
          {
            key: "9",
            label: "Регион",
            children: data.region,
          },

          {
            key: "10",
            label: "Город",
            children: data.city,
          },
          {
            key: "11",
            label: "Адрес",
            children: data.address,
          },
        ];
       
        const patent = {
          count: data.patent_holders.length,
          table: data.patent_holders
        };
        const holders = data.patent_holders.map(item=>{
          return {
            key: item.tax_number,
            label: item.tax_number,
            children: (
              <>
                <p>{item.tax_number}</p>
                <p>{item.full_name}</p>
              </>
            ),
          };
        })
        setData(data);
        setTable(patent)
        setProcessedData(res)
        setLoading(false);
      
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
if (loading) {
       return (
         <Watermark content="Patent Helper Digital">
           <div style={{ height: "100vh", width: "100vw" }}>
             <Spin spinning fullscreen />
           </div>
         </Watermark>
       );
}

 const columns = [
   {
     title: "ИНН",
     dataIndex: "tax_number",
     key: "tax_number",
     width: "30%",
   },
   {
     title: "Наименование",
     dataIndex: "full_name",
     key: "full_name",
     width: "30%",
   },
   {
     key: "operation",
     align: "center",
     width: "40%",
     render: ({ tax_number }) => {
       return (
         <Link to={`/persons/${tax_number}`}>
           <Tag color="geekblue" key={tax_number} className="action-tag">
             <i>Просмотр</i>
           </Tag>
         </Link>
       );
     },
   },
 ];


  return (
    // <div>
    //   <Row>
    //     <Col span={12}>
    //       <Row>
    //         <Col span={12}>
    //           <List
    //             bordered
    //             dataSource={Object.entries(processedData)}
    //             renderItem={(item) => (
    //               <List.Item>
    //                 {item[0]}
    //                 {item[1]}
    //               </List.Item>
    //             )}
    //           />
    //         </Col>
    //         <Col span={12}>
    //           <Row>
    //             <Col span={24}>col-12</Col>
    //           </Row>
    //           <Row>
    //             <Col span={24}>col-12</Col>
    //           </Row>
    //         </Col>
    //       </Row>
    //     </Col>
    //     <Col span={12}>col-12</Col>
    //   </Row>
    // </div>
    <div className="patent-container">
      <Descriptions title={`${data.name}`} items={processedData} column={3} />

      <Row>
        <Col span={12}>
          <Card
            title={`Авторы`}
            bordered={false}
            style={{
              width: "100%",
            }}
          >
            <pre>{data.author_raw}</pre>
          </Card>
        </Col>
        <Col span={12}>
          <Table
            title={() => <strong>Всего патентообладателей: {table.count} </strong>}
            columns={columns}
            dataSource={table.table}
            pagination={{
              position: ["none"],
              current: 1,
              pageSize: table.count,
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Patent