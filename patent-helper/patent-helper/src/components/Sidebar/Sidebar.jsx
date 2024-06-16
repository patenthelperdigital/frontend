import {
  LayoutOutlined,
  CopyOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import logo from "/logo.jpg";
import {
  LayoutTwoTone,
  FilterTwoTone,
  AppstoreTwoTone,
  BulbTwoTone,
  ProjectTwoTone,
  IdcardTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./Sidebar.scss";
import { useState } from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Divider, List, Typography } from "antd";
const data1 = [
  {
    icon: <LayoutTwoTone twoToneColor="#531dab" />,
    title: "Дашборд",
    link: "/",
    item: "dashboard",
  },
  {
    icon: <FilterTwoTone twoToneColor="#531dab" />,
    title: "Фильтры",
    link: "/filters",
    item: "filters",
  },
  {
    icon: <AppstoreTwoTone twoToneColor="#531dab" />,
    title: "Общие данные",
    link: "/data",
    item: "data",
  },
];

const data2 = [
  {
    icon: <BulbTwoTone twoToneColor="#531dab" />,
    title: "Патенты",
    link: "/patents",
    item: "patents",
  },
  {
    icon: <ProjectTwoTone twoToneColor="#531dab" />,
    title: "Статистика",
    link: "/patents/stat",
    item: "patentsStat",
  },
];

const data3 = [
  {
    icon: <IdcardTwoTone twoToneColor="#531dab" />,
    title: "Патентообладатели",
    link: "/holders",
    item: "holders",
  },
  {
    icon: <ProjectTwoTone twoToneColor="#531dab" />,
    title: "Статистика",
    link: "/holders/stat",
    item: "holdersStat",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState("");
  function handleClick(item) {
    setActive(item);
  }
  return (
    <>
      <Layout.Sider width="25%" className="sidebar-container">
        <List
          className="sider-block"
          header={"Главная"}
          dataSource={data1}
          renderItem={(item) => (
            <List.Item
              className={
                item.item === active ? "sider-item active" : "sider-item"
              }
              onClick={() => handleClick(item.item)}
            >
              <Link
                to={item.link}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <span className="li-icon">{item.icon}</span>
                <span className="li-title">{item.title}</span>
              </Link>
            </List.Item>
          )}
        />
        <List
          className="sider-block"
          header={"Патенты"}
          dataSource={data2}
          renderItem={(item) => (
            <List.Item
              className={
                item.item === active ? "sider-item active" : "sider-item"
              }
              onClick={() => handleClick(item.item)}
            >
              <Link
                to="/patents"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <span className="li-icon">{item.icon}</span>
                <span className="li-title">{item.title}</span>
              </Link>
            </List.Item>
          )}
        />
        <List
          className="sider-block"
          header={"Патентообладатели"}
          dataSource={data3}
          renderItem={(item) => (
            <List.Item
              className={
                item.item === active ? "sider-item active" : "sider-item"
              }
              onClick={() => handleClick(item.item)}
            >
              <Link
                to="/users"
                style={{
                  textDecoration: "none",
                  width: "100%",
                  height: "100%",
                }}
              >
                <span className="li-icon">{item.icon}</span>
                <span className="li-title">{item.title}</span>
              </Link>
            </List.Item>
          )}
        />
      </Layout.Sider>
    </>
  );
};

export default Sidebar;
