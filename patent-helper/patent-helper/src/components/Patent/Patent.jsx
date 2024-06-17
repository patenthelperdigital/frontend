import { useState, useEffect } from 'react';
import './Patent.scss'
import { List, Col, Row, Button, Space, Switch, Descriptions, Card, Collapse, Tag } from "antd";
import { useParams } from 'react-router-dom';



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
  const [holders, setHolders] = useState();

  const fetchData = () => {
    setLoading(true);
    fetch(`http://backend.patenthelper.digital/patents/${patent_kind}/${patent_reg_number}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
        setHolders(holders)
        setProcessedData(res)
        setLoading(false);
      
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
if (loading) {
  return (
    <>Patent</>
  );
}
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
    <div className='patent-container'>
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
          <Card title="Патентообладатели" bordered={false} style={{
              width: "100%",
            }}>
           <Collapse accordion items={holders} />
                </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Patent