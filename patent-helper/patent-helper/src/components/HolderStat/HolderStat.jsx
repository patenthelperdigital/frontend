import { Card, Col, Row, Statistic, Descriptions, Spin } from "antd";
import { useState, useEffect } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyTwoTone,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./HolderStat.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
const HolderStat = () => {
  const [data, setData] = useState( {total_persons: 148216,
    by_kind: {
        "1": 61640,
        "2": 86576
    },
    by_category: {
        "ВУЗ": 847,
        "Высокотехнологичные ИТ компании": 2941,
        "Колледжи": 150,
        "Научные организации": 10585,
        "Прочие организации": 133693
    }
  });
  const [loading, setLoading] = useState(true);

  // const fetchData = () => {
  //   setLoading(true);
  //   fetch("http://backend.patenthelper.digital/persons/stats", {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setLoading(false);
  //       setData({
  //         total_persons: 148216,
  //         by_kind: {
  //             "1": 61640,
  //             "2": 86576
  //         },
  //         by_category: {
  //             "ВУЗ": 847,
  //             "Высокотехнологичные ИТ компании": 2941,
  //             "Колледжи": 150,
  //             "Научные организации": 10585,
  //             "Прочие организации": 133693
  //         }
  //       });
  //       //   setLoading(false);
  //       //   setTableParams({
  //       //     ...tableParams,
  //       //     pagination: {
  //       //       ...tableParams.pagination,
  //       //       total: data.total,
  //       //     },
  //       //   });
  //     });
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  if (loading) {
    return (
      <Row style={{ height: "100vh" }} justify="center">
        <Col span={24}>
          <Spin></Spin>
        </Col>
      </Row>
    );
  }
  // const pieRuData = {
  //   labels: ["Зарубежные патенты", "Российские патенты"],
  //   datasets: [
  //     {
  //       label: "Количество патентов",
  //       data: [
  //         data.total_patents - data.total_ru_patents,
  //         data.total_ru_patents,
  //       ],
  //       backgroundColor: [
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //       ],
  //       borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // const pieHoldersData = {
  //   labels: ["С патентообладателями", "Без патентообладателей"],
  //   datasets: [
  //     {
  //       label: "Количество патентов",
  //       data: [
  //         data.total_with_holders,
  //         data.total_patents - data.total_with_holders,
  //       ],
  //       backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
  //       borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  // const pieAuthorsData = {
  //   labels: ["1 автор", "от 2 до 5 авторов", "более 5 авторов"],
  //   datasets: [
  //     {
  //       label: "Количество патентов",
  //       data: [
  //         data.by_author_count["1"],
  //         data.by_author_count["2–5"],
  //         data.by_author_count["5+"],
  //       ],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const res = [
    {
      key: "1",
      label: "Общее количество патентообладателей",
      children: data.total_persons,
    },
    {
      key: "2",
      label: "Количество юридических лиц",
      children: data.by_kind['1'],
    },
    {
      key: "3",
      label: "Количество физических лиц",
      children: data.by_kind['2'],
    },

    {
      key: "4",
      label: "ВУЗ",
      children: data.by_category["ВУЗ"]
        
    },
    {
      key: "5",
      label: "Высокотехнологичные ИТ компании",
      children: data.by_category["Высокотехнологичные ИТ компании"],
    },
    {
      key: "6",
      label: "Колледжи",
      children: data.by_category["Колледжи"],
    },
    {
      key: "7",
      label: "Научные организации",
      children: data.by_category["Научные организации"],
    },
    {
      key: "8",
      label: "Прочие организации",
      children: data.by_category["Прочие организации"],
    },

  ];
  return (
    <>
      <div className="stat">
        <Descriptions
          title="Сводная статистика по патентам"
          items={res}
          column={3}
        />
        {/* <Row>
          <Col span={8}>
            <Card bordered={false}>
              <Pie data={pieRuData} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Pie data={pieHoldersData} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Pie data={pieAuthorsData} />
            </Card>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default HolderStat;
