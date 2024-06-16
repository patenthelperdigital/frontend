import { useState, useEffect } from "react";
import "./Holder.scss";
import {

  Descriptions,

} from "antd";
import { useParams } from "react-router-dom";

import { Table, Tag, Col, Row } from "antd";

import { Link } from "react-router-dom";
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

// "kind": 1,
// "tax_number": "6320004654",
// "full_name": "ОТКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО \"АВТОВАЗАГРЕГАТ\"",
// "short_name": "ОАО \"АВТОВАЗАГРЕГАТ\"",
// "legal_address": "Самарская обл., г. Тольятти, шоссе Поволжское, д. 3",
// "fact_address": "Самарская обл., г. Тольятти, шоссе Поволжское, д. 3",
// "reg_date": "1993-05-25",
// "active": false,
// "category": "Прочие организации",
// "patents": [],
// "patent_count": 1473

const Patent = () => {
  const params = useParams();
  const { person_tax_number } = params;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [processedData, setProcessedData] = useState();
  const [table, setTable] = useState();


  const fetchData = () => {
    setLoading(true);
    fetch(
      `http://backend.patenthelper.digital/persons/${person_tax_number}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const res = [
          {
            key: "1",
            label: "ИНН",
            children: data.tax_number,
          },
          {
            key: "2",
            label: "Полное наименование",
            children: data.full_name,
          },
          {
            key: "3",
            label: "Тип",
            children: data.kind,
          },
          {
            key: "4",
            label: "Категория",
            children: data.category,
          },

          {
            key: "5",
            label: "Дата регистрации",
            children: data.reg_date,
          },
          {
            key: "6",
            label: "Активность",
            children: data.active,
          },
          {
            key: "7",
            label: "Адрес регистрации",
            children: data.tax_number,
          },
          {
            key: "8",
            label: "Фактический адрес",
            children: data.full_name,
          },
        ];
                const patent = {
                  count: data.patent_count,
                  table: data.patents,
                }

        setData(data);
        setTable(patent);
        setProcessedData(res);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return <>False</>;
  }
  const columns = [
    {
      title: "Тип",
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
      title: "Номер",
      dataIndex: "req_number",
      key: "req_number",
    },
    {
      key: "operation",
      align: "center",
      render: ({ kind, reg_number }) => {
        return (
          <Link to={`/patent/${kind}/${reg_number}`}>
            <Tag
              color="geekblue"
              key={kind + reg_number}
              className="action-tag"
            >
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
    <Row>
      <Col span={12}>
        <Descriptions
          title={`${data.short_name}`}
          items={processedData}
          column={2}
        />
      </Col>
      <Col span={12}>
        <Table
          title={() => <strong>Общее количество патентов {table.count}</strong>}
          columns={columns}
          dataSource={table.table}
          pagination={{
            position: ["none"],
          }}
        />
      </Col>
    </Row>
  );
};

export default Patent;
