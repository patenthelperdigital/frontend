import "./Sidebar.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, List } from "antd";
import {
  LayoutTwoTone,
  FilterTwoTone,
  BulbTwoTone,
  ProjectTwoTone,
  IdcardTwoTone,
  FileUnknownTwoTone,
} from "@ant-design/icons";

const mainBlock = [
  {
    icon: <FilterTwoTone twoToneColor="#531dab" />,
    title: "Фильтры",
    link: "/filters",
    item: "filters",
  },
];

const patentsBlock = [
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

const holdersBlock = [
  {
    icon: <IdcardTwoTone twoToneColor="#531dab" />,
    title: "Патентообладатели",
    link: "/persons",
    item: "persons",
  },
  {
    icon: <ProjectTwoTone twoToneColor="#531dab" />,
    title: "Статистика",
    link: "/persons/stat",
    item: "personsStat",
  },
];

const documentationBlock = [
  {
    icon: <FileUnknownTwoTone twoToneColor="#531dab" />,
    title: "Документация",
    link: "https://disk.yandex.ru/i/YEnn3CrrqVMByg",
    item: "data",
  },
];

const Sidebar = () => {
  const [active, setActive] = useState();

  function handleClick(item) {
    setActive(item);
  }

  return (
    <>
      <Layout.Sider width="18%" className="sidebar-container">
        <List
          className="sider-block"
          header={"Главная"}
          dataSource={mainBlock}
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
          dataSource={patentsBlock}
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
          header={"Патентообладатели"}
          dataSource={holdersBlock}
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
          header={"Документация"}
          dataSource={documentationBlock}
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
      </Layout.Sider>
    </>
  );
};

export default Sidebar;
