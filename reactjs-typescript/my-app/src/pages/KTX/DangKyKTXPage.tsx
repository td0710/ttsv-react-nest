import { AppstoreOutlined, ProfileOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import { TatCaPhongPage } from "./TatCaPhongPage";
import { TheoDoiVaPhongCuaToiPage } from "./TheoDoiVaPhongCuaToiPage";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Tất cả các phòng",
    key: "phong",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Theo dõi quá trình & phòng của tôi",
    key: "theo_doi",
    icon: <ProfileOutlined />,
  },
];

export const DangKyKTXPage = () => {
  const useTabFromQuery = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    return tab === "theo_doi" ? "theo_doi" : "phong";
  };

  const navigate = useNavigate();
  const selectedKey = useTabFromQuery();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    navigate(`?tab=${e.key}`);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "phong":
        return <TatCaPhongPage />;
      case "theo_doi":
        return <TheoDoiVaPhongCuaToiPage />;
    }
  };

  return (
    <div>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        items={items}
        style={{ marginBottom: 24 }}
      />
      {renderContent()}
    </div>
  );
};
