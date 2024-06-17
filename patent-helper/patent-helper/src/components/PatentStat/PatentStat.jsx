import { Card, Col, Row, Descriptions, Spin, Watermark, message } from "antd";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./PatentStat.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
const PatentStat = () => {
  const [filterId] = useContext(FilterContext);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch("http://backend.patenthelper.digital/patents/stats")
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
  const pieTypesData = {
    labels: ["На изобретения", "На полезную модель", "На промышленный образец"],
    datasets: [
      {
        label: "Количество патентов",
        data: [
          data.by_patent_kind["1"],
          data.by_patent_kind["2"],
          data.by_patent_kind["3"],
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const firstCardData = [
    {
      key: "1",
      label: "Общее количество патентов",
      children: data.total_patents,
    },
    {
      key: "2",
      label: "Привязанных правообладателей",
      children: (
        <span>
          {`${data.total_with_holders} `}
          <strong>[{data.with_holders_percent}%]</strong>
        </span>
      ),
    },
    {
      key: "3",
      label: "Общее количество патентов [RU]",
      children: data.total_ru_patents,
    },

    {
      key: "4",
      label: "Привязанных правообладателей [RU]",
      children: (
        <span>
          {`${data.total_ru_with_holders} `}
            <strong>[{data.ru_with_holders_percent}%]</strong>
        </span>
      ),
    },
  ];
  const secondCardData = [
    {
      key: "1",
      label: "Патенты с одним автором",
      children: data.by_author_count["1"],
    },
    {
      key: "2",
      label: "Патенты авторства от 2 до 5 человек ",
      children: data.by_author_count["2–5"],
    },
    {
      key: "3",
      label: "Патенты авторства более 3 человек ",
      children: data.by_author_count["5+"],
    },
    {
      key: "4",
      label: "На изобретения",
      children: data.by_patent_kind["1"],
    },

    {
      key: "5",
      label: "На полезную модель",
      children: data.by_patent_kind["2"],
    },
    {
      key: "6",
      label: "На промышленный образец",
      children: data.by_patent_kind["3"],
    },
  ];
  return (
    <>
      <div className="stat">
        <Descriptions
          className="first-desc"
          title="Количество патентов"
          items={firstCardData}
          column={2}
        />
        <Descriptions
          className="second-desc"
          title="Сводная статистика по патентам"
          items={secondCardData}
          column={3}
        />
        <Row>
          <Col span={6}>
            <Card bordered={false}>
              <Pie data={pieRuData} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Pie data={pieHoldersData} />
            </Card>
          </Col>
        
  
          <Col span={6}>
            <Card bordered={false}>
              <Pie data={pieAuthorsData} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Pie data={pieTypesData} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PatentStat;
