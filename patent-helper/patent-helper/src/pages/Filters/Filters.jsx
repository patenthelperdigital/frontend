import './Filters.scss'
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content/Content";
import Footer from "../../components/Footer/Footer";
import FiltersTable from '../../components/FiltersTable/FiltersTable'

const Filters = () => (
  <Layout className="layout-container">
    <Header />
    <Layout className="layout-content">
      <Sidebar />
      <Content component={<FiltersTable />} />
    </Layout>
  </Layout>
);
export default Filters;
