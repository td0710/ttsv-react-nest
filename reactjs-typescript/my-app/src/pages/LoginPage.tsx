import React from "react";
import { Button, Card, Row, Col, Layout, Flex } from "antd";
import { WindowsFilled } from "@ant-design/icons";
import bgImage from "../assets/img/loginbackground.jpg";

const { Content } = Layout;

const LoginPage: React.FC = () => {
  const handleMicrosoftLogin = () => {
    // window.location.href = `https://login.microsoftonline.com/${
    //   import.meta.env.VITE_AZURE_TENANT_ID
    // }/oauth2/v2.0/authorize?client_id=${
    //   import.meta.env.VITE_AZURE_CLIENT_ID
    // }&response_type=code&redirect_uri=${
    //   import.meta.env.VITE_AZURE_REDIRECT_URI
    // }&response_mode=query&scope=openid email profile&state=abc123`;
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/auth/microsoft-auth`;
  };

  return (
    <Layout
      style={{
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Content>
        <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col xs={22} sm={16} md={10} lg={8} xl={6}>
            <Card
              bordered={false}
              style={{
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 12,
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                textAlign: "center",
              }}
            >
              <Flex vertical justify="center" align="center" gap={50}>
                <img
                  src="https://qldt.utc.edu.vn/congthongtin/logo_login.png" // ảnh minh họa
                  alt="Login Banner"
                  style={{
                    width: 300,
                    height: 100,
                    marginBottom: 24,
                    objectFit: "contain",
                  }}
                />
                <Button
                  type="default"
                  icon={<WindowsFilled />}
                  size="large"
                  onClick={handleMicrosoftLogin}
                  style={{
                    backgroundColor: "#f0f0f0",
                    borderColor: "#d9d9d9",
                    color: "#000",
                    fontWeight: 500,
                    width: 300,
                  }}
                >
                  Đăng nhập
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;
