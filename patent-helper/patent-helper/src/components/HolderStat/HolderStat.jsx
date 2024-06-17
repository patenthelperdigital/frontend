import { Card, Col, Row, Descriptions, Spin, Watermark, message } from "antd";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./HolderStat.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const HolderStat = () => {
  const [filterId] = useContext(FilterContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("http://backend.patenthelper.digital/persons/stats")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        message.error(`Произошла ошибка, попробуйте позже`);
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

  const pieKindData = {
    labels: ["Юридические лица", "Физические лица"],
    datasets: [
      {
        label: "Количество патентообладателей",
        data: [data.by_kind["1"], data.by_kind["2"]],
        backgroundColor: [
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const pieCategoryData = {
    labels: [
      "ВУЗ",
      "Высокотехнологичные ИТ компании",
      "Колледжи",
      "Научные организации",
      "Прочие организации",
    ],
        datasets: [
      {
        label: "Количество патентообладателей",
    data: [
      data.by_category["ВУЗ"],
      data.by_category["Высокотехнологичные ИТ компании"],
      data.by_category["Колледжи"],
      data.by_category["Научные организации"],
      data.by_category["Прочие организации"],
    ],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
    borderColor: [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
    borderWidth: 1,
  }]
  };
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
  const firstCardData = [
    {
      key: "1",
      label: "Общее количество патентообладателей",
      children: data.total_persons,
    },
    {
      key: "2",
      label: "Количество юридических лиц",
      children: data.by_kind["1"],
    },
    {
      key: "3",
      label: "Количество физических лиц",
      children: data.by_kind["2"],
    },
  ];
  const secondCardData = [
    {
      key: "1",
      label: "ВУЗы",
      children: data.by_category["ВУЗ"],
    },
    {
      key: "2",
      label: "Высокотехнологичные ИТ компании",
      children: data.by_category["Высокотехнологичные ИТ компании"],
    },
    {
      key: "3",
      label: "Колледжи",
      children: data.by_category["Колледжи"],
    },
    {
      key: "4",
      label: "Научные организации",
      children: data.by_category["Научные организации"],
    },
    {
      key: "5",
      label: "Прочие организации",
      children: data.by_category["Прочие организации"],
    },
  ];

  return (
    <>
      <div className="stat">
        <h1 style={{ textAlign: "center" }}>Статистика по отфильтрованной ранее базе</h1>
        <Descriptions
          className="first-holders-desc"
          title="Количество патентообладателей"
          items={firstCardData}
          column={3}
        />
        <Descriptions
          className="second-holders-desc"
          title="Категории патентообладателей"
          items={secondCardData}
          column={3}
        />
        <Row>
          <Col span={12}>
            <Card bordered={false}>
              <Pie data={pieKindData} />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Pie data={pieCategoryData} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HolderStat;
