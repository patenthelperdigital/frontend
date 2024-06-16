import "./PatentsStat.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import PatentStat from "../../components/PatentStat/PatentStat";

const PatentsStat = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<PatentStat />} />
    </Layout>
  </Layout>
);
export default PatentsStat;
