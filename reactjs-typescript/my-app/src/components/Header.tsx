import React from "react";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

interface HeaderBarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  background: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  collapsed,
  toggleCollapsed,
  background,
}) => {
  return (
    <div>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </div>
  );
};

export default HeaderBar;
