import { SearchOutlined } from "@ant-design/icons";
import { Button} from "antd";

function Button({ children, icon }) {
  return <Button icon={icon}>{children}</Button>;
}

export default Button;
