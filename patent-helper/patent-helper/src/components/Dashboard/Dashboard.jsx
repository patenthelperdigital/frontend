import {
  Card,
  Col,
  Row,
  Spin,
  Watermark,
  message,
  Statistic,
} from "antd";
import { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
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

  
  return (
    <>
      <div className="stat" style={{ width: "100%" }}>
        <h1 style={{ textAlign: "center" }}>Статистика по всей базе</h1>
        <Row>
          <Col span={12}>
            <Card
              title="Количество патентов"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="Общее"
                          value={patentData.total_patents}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="С привязанными правообладателями"
                          value={`${patentData.total_with_holders} [${patentData.with_holders_percent} %]`}
                          valueStyle={{
                            color: "#36cfc9",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Без привязки правообладателей"
                          value={`${
                            patentData.total_patents -
                            patentData.total_with_holders
                          } [${100 - patentData.with_holders_percent} %]`}
                          valueStyle={{
                            color: "#ff7875",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Doughnut data={pieHoldersData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Количество патентов РФ [RU]"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="Общее [RU]"
                          value={patentData.total_ru_patents}
                          valueStyle={{
                            color: "#a0d911",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="С привязанными правообладателями [RU]"
                          value={`${patentData.total_ru_with_holders} [${patentData.ru_with_holders_percent} %]`}
                          valueStyle={{
                            color: "#b37feb",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Без привязки правообладателей [RU]"
                          value={`${
                            patentData.total_ru_patents -
                            patentData.total_ru_with_holders
                          } [${100 - patentData.ru_with_holders_percent} %]`}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Pie data={pieRuData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card
              title="Сводная статистика по авторам патентов"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="Патенты с одним автором"
                          value={`${
                            patentData.by_author_count["1"]
                          } [${Math.floor(
                            (patentData.by_author_count["1"] * 100) /
                              (patentData.by_author_count["1"] +
                                patentData.by_author_count["2–5"] +
                                patentData.by_author_count["5+"])
                          )} %]`}
                          valueStyle={{
                            color: "#ff7875",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="Патенты авторства от 2 до 5 человек"
                          value={`${
                            patentData.by_author_count["2–5"]
                          } [${Math.floor(
                            (patentData.by_author_count["2–5"] * 100) /
                              (patentData.by_author_count["1"] +
                                patentData.by_author_count["2–5"] +
                                patentData.by_author_count["5+"])
                          )} %]`}
                          valueStyle={{
                            color: "#597ef7",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Патенты авторства более 5 человек"
                          value={`${
                            patentData.by_author_count["5+"]
                          } [${Math.floor(
                            (patentData.by_author_count["5+"] * 100) /
                              (patentData.by_author_count["1"] +
                                patentData.by_author_count["2–5"] +
                                patentData.by_author_count["5+"])
                          )} %]`}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Doughnut data={pieAuthorsData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Сводная статистика по типам патентов"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="На изобретения"
                          value={`${
                            patentData.by_patent_kind["1"]
                          } [${Math.floor(
                            (patentData.by_patent_kind["1"] * 100) /
                              (patentData.by_patent_kind["1"] +
                                patentData.by_patent_kind["2"] +
                                patentData.by_patent_kind["3"])
                          )} %]`}
                          valueStyle={{
                            color: "#36cfc9",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24} style={{ marginBottom: "1rem" }}>
                      <Card bordered={false}>
                        <Statistic
                          title="На полезную модель"
                          value={`${
                            patentData.by_patent_kind["2"]
                          } [${Math.floor(
                            (patentData.by_patent_kind["2"] * 100) /
                              (patentData.by_patent_kind["1"] +
                                patentData.by_patent_kind["2"] +
                                patentData.by_patent_kind["3"])
                          )} %]`}
                          valueStyle={{
                            color: "#b37feb",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="На промышленный образец"
                          value={`${
                            patentData.by_patent_kind["3"]
                          } [${Math.floor(
                            (patentData.by_patent_kind["3"] * 100) /
                              (patentData.by_patent_kind["1"] +
                                patentData.by_patent_kind["2"] +
                                patentData.by_patent_kind["3"])
                          )} %]`}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Pie data={pieTypesData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card
              title="Количество патентообладателей"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Всего"
                          value={holderData.total_persons}
                          valueStyle={{
                            color: "#36cfc9",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Физические лица"
                          value={`${holderData.by_kind[1]} [${Math.floor(
                            (holderData.by_kind[1] * 100) / holderData.total_persons
                          )} %]`}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Юридические лица"
                          value={`${holderData.by_kind[2]} [${Math.floor(
                            (holderData.by_kind[2] * 100) / holderData.total_persons
                          )} %]`}
                          valueStyle={{
                            color: "#9254de",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Pie data={pieKindData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="Кaтегории патентообладателей"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Row>
                <Col sm={12}>
                  <Row>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="ВУЗы"
                          value={`${holderData.by_category["ВУЗ"]} [${(
                            (holderData.by_category["ВУЗ"] * 100) /
                            holderData.total_persons
                          ).toFixed(2)} %]`}
                          valueStyle={{
                            color: "#ffc53d",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Высокотехнологичные ИТ компании"
                          value={`${
                            holderData.by_category["Высокотехнологичные ИТ компании"]
                          } [${(
                            (holderData.by_category[
                              "Высокотехнологичные ИТ компании"
                            ] *
                              100) /
                            holderData.total_persons
                          ).toFixed(2)} %]`}
                          valueStyle={{
                            color: "#36cfc9",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Колледжи"
                          value={`${holderData.by_category["Колледжи"]} [${(
                            (holderData.by_category["Колледжи"] * 100) /
                            holderData.total_persons
                          ).toFixed(2)} %]`}
                          valueStyle={{
                            color: "#b37feb",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Научные организации"
                          value={`${
                            holderData.by_category["Научные организации"]
                          } [${(
                            (holderData.by_category["Научные организации"] * 100) /
                            holderData.total_persons
                          ).toFixed(2)} %]`}
                          valueStyle={{
                            color: "#85a5ff",
                          }}
                        />
                      </Card>
                    </Col>
                    <Col span={24}>
                      <Card bordered={false}>
                        <Statistic
                          title="Прочие организации"
                          value={`${holderData.by_category["Прочие организации"]} [${(
                            (holderData.by_category["Прочие организации"] * 100) /
                            holderData.total_persons
                          ).toFixed(2)} %]`}
                          valueStyle={{
                            color: "#f759ab",
                          }}
                        />
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Card bordered={false}>
                    <Doughnut data={pieCategoryData} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
