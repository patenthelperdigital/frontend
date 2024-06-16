
import './Header.scss'
import { Layout, Col, Row, Button, Space, Switch } from "antd";
import { UploadOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";

function Header() {
  return (
    <Layout.Header className="header-container">
      <Row>
        <Col span={6}>
          <Row className="logo" justify="center">
            <div className="logo-title">PHD</div>
          </Row>
        </Col>
        <Col span={11} className="upload-btn">
            <Button icon={<UploadOutlined />}>Расширить базу патентов</Button>
        </Col>
        <Col span={6} className="mode-toggler">
          <Space direction="vertical">
            <Switch
              checkedChildren={<SunOutlined />}
              unCheckedChildren={<MoonOutlined />}
              defaultChecked
            />
          </Space>
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default Header;

