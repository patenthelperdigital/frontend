import { Card, Col, Row, Spin, Watermark, message, Statistic } from "antd";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "../../context/FilterProvider";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie, Doughnut} from "react-chartjs-2";
import "./HolderStat.scss";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const HolderStat = () => {
  const [filterId] = useContext(FilterContext);

  const [filterName, setFilterName] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    const url = filterId
      ? `http://backend.patenthelper.digital/persons/stats?filter_id=${filterId}`
      : "http://backend.patenthelper.digital/persons/stats";
    fetch(`http://backend.patenthelper.digital/filters`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const filterName = data.find((filter) => filter.id == filterId)
        if (filterName) setFilterName(filterName.name);
      })
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

  const pieKindData = {
    labels: ["Физические лица", "Юридические лица"],
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
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
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
                      value={data.total_persons}
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
                      value={`${data.by_kind[1]} [${Math.floor(
                        (data.by_kind[1] * 100) / data.total_persons
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
                      value={`${data.by_kind[2]} [${Math.floor(
                        (data.by_kind[2] * 100) / data.total_persons
                      )} %]`}
                      valueStyle={{
                        color: "#9254de",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={3}></Col>
            <Col span={6}>
              <Card bordered={false}>
                <Pie data={pieKindData} />
              </Card>
            </Col>
            <Col span={3}></Col>
          </Row>
        </Card>
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
                      value={`${data.by_category["ВУЗ"]} [${(
                        (data.by_category["ВУЗ"] * 100) /
                        data.total_persons
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
                        data.by_category["Высокотехнологичные ИТ компании"]
                      } [${(
                        (data.by_category["Высокотехнологичные ИТ компании"] *
                          100) /
                        data.total_persons
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
                      value={`${data.by_category["Колледжи"]} [${(
                        (data.by_category["Колледжи"] * 100) /
                        data.total_persons
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
                      value={`${data.by_category["Научные организации"]} [${(
                        (data.by_category["Научные организации"] * 100) /
                        data.total_persons
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
                      value={`${data.by_category["Прочие организации"]} [${(
                        (data.by_category["Прочие организации"] * 100) /
                        data.total_persons
                      ).toFixed(2)} %]`}
                      valueStyle={{
                        color: "#f759ab",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={2}></Col>
            <Col span={8}>
              <Card bordered={false}>
                <Doughnut data={pieCategoryData} />
              </Card>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default HolderStat;
