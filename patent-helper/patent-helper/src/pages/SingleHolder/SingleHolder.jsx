import "./SingleHolder.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import Holder from "../../components/Holder/Holder";

const SingleHolder = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<Holder />} />
    </Layout>
  </Layout>
);
export default SingleHolder;
