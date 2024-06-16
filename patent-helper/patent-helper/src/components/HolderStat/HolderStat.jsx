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
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("http://backend.patenthelper.digital/patents/stats", {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setData({
          total_patents: 1137668,
          total_ru_patents: 865156,
          total_with_holders: 730299,
          total_ru_with_holders: 728998,
          with_holders_percent: 64,
          ru_with_holders_percent: 84,
          by_author_count: {
            1: 347817,
            "2–5": 644826,
            "5+": 145025,
          },
        });
        //   setLoading(false);
        //   setTableParams({
        //     ...tableParams,
        //     pagination: {
        //       ...tableParams.pagination,
        //       total: data.total,
        //     },
        //   });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <Row style={{ height: "100vh" }} justify="center">
        <Col span={24}>
          <Spin></Spin>
        </Col>
      </Row>
    );
  }
  const pieRuData = {
    labels: ["Зарубежные патенты", "Российские патенты"],
    datasets: [
      {
        label: "Количество патентов",
        data: [
          data.total_patents - data.total_ru_patents,
          data.total_ru_patents,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const pieHoldersData = {
    labels: ["С патентообладателями", "Без патентообладателей"],
    datasets: [
      {
        label: "Количество патентов",
        data: [
          data.total_with_holders,
          data.total_patents - data.total_with_holders,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const pieAuthorsData = {
    labels: ["1 автор", "от 2 до 5 авторов", "более 5 авторов"],
    datasets: [
      {
        label: "Количество патентов",
        data: [
          data.by_author_count["1"],
          data.by_author_count["2–5"],
          data.by_author_count["5+"],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const res = [
    {
      key: "1",
      label: "Общее количество патентов",
      children: data.total_patents,
    },
    {
      key: "2",
      label: "Патентообладатели указаны у",
      children: data.total_with_holders,
    },
    {
      key: "3",
      label: "Процент патентов с указанными патентообладателями",
      children: data.with_holders_percent,
    },

    {
      key: "4",
      label: "Общее количество русских патентов",
      children: data.total_ru_patents,
    },
    {
      key: "5",
      label: "Общее количество русских патентов c патентообладателями",
      children: data.total_ru_with_holders,
    },
    {
      key: "6",
      label: "Процент русских патентов с указанными патентообладателями",
      children: data.ru_with_holders_percent,
    },
    {
      key: "7",
      label: "Патенты с одним автором",
      children: data.by_author_count["1"],
    },
    {
      key: "8",
      label: "Патенты авторства от 2 до 5 человек ",
      children: data.by_author_count["2–5"],
    },
    {
      key: "9",
      label: "Патенты авторства более 3 человек ",
      children: data.by_author_count["5+"],
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
        <Row>
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
        </Row>
      </div>
    </>
  );
};

export default HolderStat;
