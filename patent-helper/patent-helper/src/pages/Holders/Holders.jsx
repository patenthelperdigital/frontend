import "./Holders.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import HoldersTable from "../../components/HoldersTable/HoldersTable";

const Holders = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<HoldersTable />} />
    </Layout>
  </Layout>
);
export default Holders;
