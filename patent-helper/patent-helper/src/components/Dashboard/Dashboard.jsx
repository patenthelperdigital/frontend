import { Card, Col, Row, Descriptions, Spin, Watermark, message } from "antd";
import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Dashboard.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  const [patentData, setPatentData] = useState();
  const [holderData, setHolderData] = useState();
  const [patentLoading, setPatentLoading] = useState(true);
  const [holderLoading, setHolderLoading] = useState(true);

  const fetchData = () => {
    fetch("http://backend.patenthelper.digital/patents/stats")
      .then((res) => res.json())
      .then((data) => {
        setPatentLoading(false);
        setPatentData(data);
      })
      .catch((err) => {
        message.error(`Произошла ошибка, попробуйте позже`);
        setPatentLoading(false);
      });
    fetch("http://backend.patenthelper.digital/persons/stats")
      .then((res) => res.json())
      .then((data) => {
        setHolderLoading(false);
        setHolderData(data);
      })
      .catch((err) => {
        message.error(`Произошла ошибка, попробуйте позже`);
        setHolderLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (patentLoading || holderLoading) {
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
          patentData.total_patents - patentData.total_ru_patents,
          patentData.total_ru_patents,
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
          patentData.total_with_holders,
          patentData.total_patents - patentData.total_with_holders,
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
          patentData.by_author_count["1"],
          patentData.by_author_count["2–5"],
          patentData.by_author_count["5+"],
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
  const pieKindData = {
    labels: ["Юридические лица", "Физические лица"],
    datasets: [
      {
        label: "Количество патентообладателей",
        data: [holderData.by_kind["1"], holderData.by_kind["2"]],
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
          holderData.by_category["ВУЗ"],
          holderData.by_category["Высокотехнологичные ИТ компании"],
          holderData.by_category["Колледжи"],
          holderData.by_category["Научные организации"],
          holderData.by_category["Прочие организации"],
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
      },
    ],
  };
  const pieTypesData = {
    labels: ["На изобретения", "На полезную модель", "На промышленный образец"],
    datasets: [
      {
        label: "Количество патентов",
        data: [
          patentData.by_patent_kind["1"],
          patentData.by_patent_kind["2"],
          patentData.by_patent_kind["3"],
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

  const firstPatentCardData = [
    {
      key: "1",
      label: "Общее количество патентов",
      children: patentData.total_patents,
    },
    {
      key: "2",
      label: "Привязанных правообладателей",
      children: (
        <span>
          {`${patentData.total_with_holders} `}
          <strong>[{patentData.with_holders_percent}%]</strong>
        </span>
      ),
    },
    {
      key: "3",
      label: "Общее количество патентов [RU]",
      children: patentData.total_ru_patents,
    },

    {
      key: "4",
      label: "Привязанных правообладателей [RU]",
      children: (
        <span>
          {`${patentData.total_ru_with_holders} `}
          <strong>[{patentData.ru_with_holders_percent}%]</strong>
        </span>
      ),
    },
  ];
  const secondPatentCardData = [
    {
      key: "1",
      label: "Патенты с одним автором",
      children: patentData.by_author_count["1"],
    },
    {
      key: "2",
      label: "Патенты авторства от 2 до 5 человек ",
      children: patentData.by_author_count["2–5"],
    },
    {
      key: "3",
      label: "Патенты авторства более 3 человек ",
      children: patentData.by_author_count["5+"],
    },
    {
      key: "4",
      label: "На изобретения",
      children: patentData.by_patent_kind["1"],
    },

    {
      key: "5",
      label: "На полезную модель",
      children: patentData.by_patent_kind["2"],
    },
    {
      key: "6",
      label: "На промышленный образец",
      children: patentData.by_patent_kind["3"],
    },
  ];

  const firstHolderCardData = [
    {
      key: "1",
      label: "Общее количество патентообладателей",
      children: holderData.total_persons,
    },
    {
      key: "2",
      label: "Количество юридических лиц",
      children: holderData.by_kind["1"],
    },
    {
      key: "3",
      label: "Количество физических лиц",
      children: holderData.by_kind["2"],
    },
  ];
  const secondHolderCardData = [
    {
      key: "1",
      label: "ВУЗы",
      children: holderData.by_category["ВУЗ"],
    },
    {
      key: "2",
      label: "Высокотехнологичные ИТ компании",
      children: holderData.by_category["Высокотехнологичные ИТ компании"],
    },
    {
      key: "3",
      label: "Колледжи",
      children: holderData.by_category["Колледжи"],
    },
    {
      key: "4",
      label: "Научные организации",
      children: holderData.by_category["Научные организации"],
    },
    {
      key: "5",
      label: "Прочие организации",
      children: holderData.by_category["Прочие организации"],
    },
  ];
  return (
    <>
      <div className="stat" style={{ width: "100%" }}>
        <h1 style={{textAlign: 'center'}}>Статистика по всей базе</h1>
        <Descriptions
          className="first-desc"
          title="Количество патентов"
          items={firstPatentCardData}
          column={2}
        />
        <Descriptions
          className="second-desc"
          title="Сводная статистика по патентам"
          items={secondPatentCardData}
          column={3}
        />
        <Row className="graphic">
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
        <Descriptions
          className="first-holders-desc"
          title="Количество патентообладателей"
          items={firstHolderCardData}
          column={3}
        />
        <Descriptions
          className="second-holders-desc"
          title="Категории патентообладателей"
          items={secondHolderCardData}
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

export default Dashboard;
