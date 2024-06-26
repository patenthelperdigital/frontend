import "./SinglePatent.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import Content from "../../components/Content/Content";
import Patent from "../../components/Patent/Patent";


const SinglePatent = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<Patent />} />
    </Layout>
  </Layout>
);
export default SinglePatent;
