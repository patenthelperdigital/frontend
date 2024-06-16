import { SunOutlined, MoonOutlined } from "@ant-design/icons";

function ModeIcon({ mode }) {
  return <>{mode === "dark" ? <MoonOutlined /> : <SunOutlined />}</>;
}

export default ModeIcon;
