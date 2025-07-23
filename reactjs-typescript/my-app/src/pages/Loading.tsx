import { Flex, Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Loading = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const authenticateGoogle = async () => {
      try {
        console.log(import.meta.env.VITE_API_BASE_URL);
        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);

        if (isMatch) {
          const authCode = decodeURIComponent(`${isMatch[1]}`);

          const url = `${
            import.meta.env.VITE_API_BASE_URL
          }/microsoft/callback?id=${authCode}`;

          const response = await axios.post(
            url,
            {},
            {
              withCredentials: true,
            }
          );
          console.log(response.status);
          console.log("navigating to /thongtincanhan");

          setIsAuthenticated(true);
          navigate("/thongtincanhan");
        }
      } catch (error) {
        console.error("Login error:", error);

        let errorMessage = "Login failed. Please try again!";
        if (error instanceof Error) {
          errorMessage = error.message;
          console.error("Error message:", errorMessage);
        }
      }
    };

    authenticateGoogle();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.05)", // nền mờ mờ
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <Flex vertical align="center" justify="center">
        <Spin size="large" tip="Đang tải..." />
      </Flex>
    </div>
  );
};
