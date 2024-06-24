import { Card, Col, Row, Spin, Watermark, message, Statistic } from "antd";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import "./PatentStat.scss";

ChartJS.register(ArcElement, Tooltip, Legend);
const PatentStat = () => {
  const [filterId] = useContext(FilterContext);

  const [filterName, setFilterName] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    const url = filterId
      ? `http://backend.patenthelper.digital/patents/stats?filter_id=${filterId}`
      : "http://backend.patenthelper.digital/patents/stats";
    fetch(`http://backend.patenthelper.digital/filters`, {
       method: "GET",
     })
       .then((res) => res.json())
       .then((data) => {
        const filterName = data.find((filter) => filter.id == filterId);
        if (filterName) setFilterName(filterName.name);
       });
    fetch(url)
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
    legend: true,
    datasets: [
      {
        label: "Количество патентов",
        data: [
          data.total_with_holders,
          data.total_patents - data.total_with_holders,
        ],
        active: true,
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
  return (
    <>
      <div className="stat">
        {filterId && (
          <>
            <h1 style={{ textAlign: "center", lineHeight: "100%" }}>
              Статистика по отфильтрованной ранее базе
            </h1>
            <h2 style={{ textAlign: "center", lineHeight: "200%" }}>
              [Файл фильтрации - {filterName}]
            </h2>
          </>
        )}
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
                      value={data.total_patents}
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
                      value={`${data.total_with_holders} [${data.with_holders_percent} %]`}
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
                        data.total_patents - data.total_with_holders
                      } [${100 - data.with_holders_percent} %]`}
                      valueStyle={{
                        color: "#ff7875",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <Card bordered={false}>
                <Doughnut data={pieHoldersData} />
              </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Card>
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
                      value={data.total_ru_patents}
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
                      value={`${data.total_ru_with_holders} [${data.ru_with_holders_percent} %]`}
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
                        data.total_ru_patents - data.total_ru_with_holders
                      } [${100 - data.ru_with_holders_percent} %]`}
                      valueStyle={{
                        color: "#ffc53d",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <Card bordered={false}>
                <Pie data={pieRuData} />
              </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Card>
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
                      value={`${data.by_author_count["1"]} [${Math.floor(
                        (data.by_author_count["1"] * 100) /
                          (data.by_author_count["1"] +
                            data.by_author_count["2–5"] +
                            data.by_author_count["5+"])
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
                      value={`${data.by_author_count["2–5"]} [${Math.floor(
                        (data.by_author_count["2–5"] * 100) /
                          (data.by_author_count["1"] +
                            data.by_author_count["2–5"] +
                            data.by_author_count["5+"])
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
                      value={`${data.by_author_count["5+"]} [${Math.floor(
                        (data.by_author_count["5+"] * 100) /
                          (data.by_author_count["1"] +
                            data.by_author_count["2–5"] +
                            data.by_author_count["5+"])
                      )} %]`}
                      valueStyle={{
                        color: "#ffc53d",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <Card bordered={false}>
                <Doughnut data={pieAuthorsData} />
              </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Card>
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
                      value={`${data.by_patent_kind["1"]} [${Math.floor(
                        (data.by_patent_kind["1"] * 100) /
                          (data.by_patent_kind["1"] +
                            data.by_patent_kind["2"] +
                            data.by_patent_kind["3"])
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
                      value={`${data.by_patent_kind["2"]} [${Math.floor(
                        (data.by_patent_kind["2"] * 100) /
                          (data.by_patent_kind["1"] +
                            data.by_patent_kind["2"] +
                            data.by_patent_kind["3"])
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
                      value={`${data.by_patent_kind["3"]} [${Math.floor(
                        (data.by_patent_kind["3"] * 100) /
                          (data.by_patent_kind["1"] +
                            data.by_patent_kind["2"] +
                            data.by_patent_kind["3"])
                      )} %]`}
                      valueStyle={{
                        color: "#ffc53d",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <Card bordered={false}>
                <Pie data={pieTypesData} />
              </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default PatentStat;
