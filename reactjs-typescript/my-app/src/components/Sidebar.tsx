import React from "react";
import { Layout, Menu } from "antd";
import {
  CarOutlined,
  ContainerOutlined,
  HomeOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  collapsed: boolean;
  setLoading: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(
  ({ collapsed, setLoading }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signOut } = useAuth();

    const handleClick = (e: any) => {
      switch (e.key) {
        case "1":
          navigate("/thongtincanhan");
          break;
        case "2":
          navigate("/giayxacnhansinhvien");
          break;
        case "3":
          navigate("/dangkyvexebuyt");
          break;
        case "4":
          navigate("/thongbao");
          break;
        case "5":
          navigate("/dangkyktx");
          break;
        case "logout":
          setLoading(true);
          setTimeout(() => {
            signOut();
            setLoading(false);
          }, 300);
          break;
        default:
          break;
      }
    };

    const getSelectedKey = () => {
      if (location.pathname.startsWith("/thongtincanhan")) return "1";
      if (location.pathname.startsWith("/giayxacnhansinhvien")) return "2";
      if (location.pathname.startsWith("/dangkyvexebuyt")) return "3";
      if (location.pathname.startsWith("/thongbao")) return "4";
      if (location.pathname.startsWith("/dangkyktx")) return "5";
      return "";
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              style={{
                height: 50,
                margin: 16,
                borderRadius: 6,
                width: 80,
              }}
              src="https://qldt.utc.edu.vn/congthongtin/logo.png"
              alt="Logo"
            />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getSelectedKey()]}
            onClick={handleClick}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Thông tin cá nhân",
              },
              {
                key: "2",
                icon: <ContainerOutlined />,
                label: "Xin cấp giấy Xác nhận sinh viên",
              },
              {
                key: "3",
                icon: <CarOutlined />,
                label: "Đăng ký vé tháng xe buýt",
              },
              {
                key: "4",
                icon: <NotificationOutlined />,
                label: "Thông báo",
              },
              {
                key: "5",
                icon: <HomeOutlined />,
                label: "Đăng ký Ký túc xá",
              },
            ]}
          />
        </div>

        <div style={{ flexGrow: 1 }} />

        <Menu
          theme="dark"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[]}
          style={{ fontSize: 16 }}
          items={[
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Đăng xuất",
            },
          ]}
        />
      </div>
    );
  }
);

export default Sidebar;
