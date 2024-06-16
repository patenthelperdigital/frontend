import "./Content.scss";
import { Layout } from "antd";

const Content = ({component}) => {
  return (
    <>
      <Layout.Content className="content-container">
        {component}
      </Layout.Content>
    </>
  );
};

export default Content;
