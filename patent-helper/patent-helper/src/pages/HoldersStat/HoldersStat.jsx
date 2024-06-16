import "./HoldersStat.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import HolderStat from "../../components/HolderStat/HolderStat";

const HoldersStat = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<HolderStat />} />
    </Layout>
  </Layout>
);
export default HoldersStat;
