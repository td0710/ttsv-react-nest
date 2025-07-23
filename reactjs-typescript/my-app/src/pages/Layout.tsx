import React, { type ReactNode, useEffect, useState } from "react";
import { Drawer, Grid, Layout, Spin, theme } from "antd";
import Sidebar from "../components/Sidebar";
import HeaderBar from "../components/Header";
import { useLocation } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Sider, Header, Content } = Layout;

interface LayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleCollapsed = () => {
    if (isMobile) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" tip="Đang tải..." />
        </div>
      )}

      <Layout style={{ minHeight: "100vh" }}>
        {isMobile ? (
          <Drawer
            closable={false}
            placement="left"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={240}
            styles={{
              body: {
                padding: 0,
                backgroundColor: "#001529",
                color: "#fff",
              },
            }}
          >
            <Sidebar collapsed={false} setLoading={setLoading} />
          </Drawer>
        ) : (
          <Sider
            width={275}
            collapsedWidth={80}
            collapsible
            collapsed={collapsed}
            trigger={null}
            style={{
              height: "100vh",
              position: "sticky",
              top: 0,
            }}
          >
            <Sidebar collapsed={collapsed} setLoading={setLoading} />
          </Sider>
        )}

        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <HeaderBar
              collapsed={collapsed}
              toggleCollapsed={toggleCollapsed}
              background={colorBgContainer}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
