
import './Header.scss'
import { Layout, Col, Row, Button, Space, Switch, Tooltip } from "antd";
import { UploadOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";

function Header() {
  return (
    <Layout.Header className="header-container">
      <Row>
        <Col span={4}>
          <Row className="logo" justify="center">
            <div className="logo-title">PHD</div>
          </Row>
        </Col>
        <Col span={13} className="upload-btn">
          <Tooltip title="Возможность расширения будет реализована на следующем этапе разработки">
            <Button icon={<UploadOutlined />} disabled>Расширить базу патентов</Button>
          </Tooltip>
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

