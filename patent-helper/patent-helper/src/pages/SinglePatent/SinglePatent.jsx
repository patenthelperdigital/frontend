import "./SinglePatent.scss";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import PatentsTable from "../../components/PatentsTable/PatentsTable";

const SinglePatent = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      сингл патент
    </Layout>
    <Footer />
  </Layout>
);
export default SinglePatent;
