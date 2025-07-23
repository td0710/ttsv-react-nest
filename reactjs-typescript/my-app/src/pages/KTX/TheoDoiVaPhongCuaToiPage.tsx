import {
  ApartmentOutlined,
  CloudOutlined,
  FireOutlined,
  InboxOutlined,
  RestOutlined,
  SkinOutlined,
  WifiOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Flex,
  Space,
  Spin,
  Alert,
  Popconfirm,
} from "antd";
import { YeuCauKTXModel } from "../../models/YeuCauKTXModel";
import { useEffect, useState } from "react";
import { TienIchModel } from "../../models/TienIchModel";
import axios from "axios";
import { PhongModel } from "../../models/PhongModel";
import { useCustomNotification } from "../../components/Notification";
import { useLocation } from "react-router-dom";
import { handleAxiosError } from "../../utils/errorHandler";
const { Title, Paragraph, Text } = Typography;
export const TheoDoiVaPhongCuaToiPage = () => {
  const [yeuCauList, setYeuCauList] = useState<YeuCauKTXModel[]>([]);
  const [phongCuaToi, setPhongCuaToi] = useState<PhongModel>();

  const [yeuCauHienTai, setYeuCauHienTai] = useState(true);

  const { contextHolder, notify } = useCustomNotification();

  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const savedNotification = localStorage.getItem("notification");

    if (savedNotification) {
      const { type, message, description } = JSON.parse(savedNotification);
      notify(type, message, description);
      localStorage.removeItem("notification");
    }
  }, [location.state]);

  const fetchYeuCauList = async () => {
    try {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/get-by-id`;

      const response = await axios.get(url, { withCredentials: true });

      console.log(response);

      const danhSachYeuCau = response.data.map((item: YeuCauKTXModel) => {
        const yeuCau = new YeuCauKTXModel(
          item.id,
          item.loaiYeuCau,
          new PhongModel(
            item.phongHienTai.id,
            item.phongHienTai.tenPhong,
            item.phongHienTai.loaiPhong,
            item.phongHienTai.soSv,
            item.phongHienTai.gia,
            item.phongHienTai.soLuongDaDangKy,
            item.phongHienTai.tienIchList
          ),
          item.trangThai,
          item.phongMongMuon
            ? new PhongModel(
                item.phongMongMuon.id,
                item.phongMongMuon.tenPhong,
                item.phongMongMuon.loaiPhong,
                item.phongMongMuon.soSv,
                item.phongMongMuon.gia,
                item.phongMongMuon.soLuongDaDangKy,
                item.phongMongMuon.tienIchList
              )
            : undefined
        );
        return yeuCau;
      });
      console.log(danhSachYeuCau);
      setYeuCauList(danhSachYeuCau);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Không thể tải danh sách yêu cầu.",
        "Lỗi tải danh sách yêu cầu"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPhongCuaToi = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/phong/phong-hien-tai`;

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log(response);

      setPhongCuaToi(response.data);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Không thể lấy thông tin phòng của bạn.",
        "Lỗi phòng của tôi"
      );
    }
  };

  const fetchYeuCauHienTai = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/yeu-cau-hien-tai`;

      const response = await axios.get(url, { withCredentials: true });

      setYeuCauHienTai(response.data);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Không thể lấy thông tin yêu cầu hiện tại",
        "Lỗi khi lấy yêu cầu hiện tại"
      );
    }
  };
  const handleTraPhong = async (phongId: number) => {
    try {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/tra-phong?phongId=${phongId}`;

      const response = await axios.post(url, {}, { withCredentials: true });

      console.log("Trả phòng thành công:", response.data);
      notify(
        "success",
        "Yêu cầu trả phòng đã được gửi thành công",
        "Vui lòng theo dõi quá trình duyệt yêu cầu."
      );
      fetchYeuCauList();
      fetchYeuCauHienTai();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Không thể gửi yêu cầu trả phòng.",
        "Lỗi trả phòng"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHuyYeuCau = async (yeuCauId: number) => {
    try {
      setLoading(true);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/huy-yeu-cau?yeuCauId=${yeuCauId}`;

      const response = await axios.delete(url, { withCredentials: true });

      console.log("Yêu cầu đã hủy:", response.data);
      notify("success", "Hủy yêu cầu thành công", "Yêu cầu đã bị hủy");
      fetchYeuCauHienTai();
      fetchYeuCauList();
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Không thể hủy yêu cầu.",
        "Lỗi hủy yêu cầu"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYeuCauHienTai();
    fetchPhongCuaToi();
    fetchYeuCauList();
  }, []);

  const tagColorByLoai = {
    "Cơ bản": "default",
    "Cơ bản nhỏ": "gray",
    "Thiết bị tăng cường": "green",
    "Phổ thông không điều hòa": "volcano",
    "Phổ thông có điều hòa": "orange",
    "Tiêu chuẩn": "blue",
  };
  const iconByTienIch = {
    "Vệ sinh khép kín": <RestOutlined />,
    "Giường tầng": <ApartmentOutlined />,
    "Bình nước nóng": <FireOutlined />,
    Internet: <WifiOutlined />,
    "Điều hòa": <CloudOutlined />,
    "Tủ quần áo": <SkinOutlined />,
    "Tủ giày": <InboxOutlined />,
  };

  const tagColorByTrangThai = {
    "Đang tiếp nhận": "processing",
    "Đã tiếp nhận": "blue",
    "Hoàn thành": "green",
    "Từ chối": "red",
  };
  return (
    <>
      {contextHolder}
      <div style={{ padding: 24 }}>
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
        {yeuCauHienTai && (
          <Alert
            message="Bạn hiện đang có một yêu cầu chưa hoàn thành"
            description="Vui lòng hủy hoặc hoàn thành yêu cầu cũ trước khi thực hiện yêu cầu mới."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Card
          title="Theo dõi các yêu cầu của bạn"
          style={{ width: "100%", border: "1px solid #d9d9d9" }}
          bodyStyle={{ padding: 16 }}
          hoverable
        >
          {yeuCauList.length > 0 ? (
            <Row gutter={[16, 16]}>
              {[...yeuCauList].reverse().map((yeuCau) => (
                <Col span={24} key={yeuCau.id}>
                  <Card type="inner" title={yeuCau.loaiYeuCau} size="default">
                    <Row gutter={[16, 16]} align="top">
                      <Col
                        xs={24}
                        md={yeuCau.loaiYeuCau === "Đổi phòng" ? 12 : 20}
                      >
                        <Row align="middle" wrap={false}>
                          <Text strong style={{ fontSize: 16 }}>
                            🏠{" "}
                            {yeuCau.loaiYeuCau === "Đổi phòng"
                              ? yeuCau.phongHienTai.tenPhong +
                                " ➡️ " +
                                yeuCau.phongMongMuon?.tenPhong
                              : yeuCau.phongHienTai.tenPhong}
                          </Text>

                          <Tag
                            color={
                              tagColorByLoai[
                                (yeuCau.loaiYeuCau == "Đổi phòng"
                                  ? yeuCau.phongMongMuon?.loaiPhong
                                  : yeuCau.phongHienTai
                                      .loaiPhong) as keyof typeof tagColorByLoai
                              ] || "default"
                            }
                            style={{ marginLeft: 8 }}
                          >
                            {yeuCau.loaiYeuCau === "Đổi phòng"
                              ? yeuCau.phongMongMuon?.loaiPhong
                              : yeuCau.phongHienTai.loaiPhong}
                          </Tag>
                        </Row>

                        <Paragraph style={{ marginTop: 8, marginBottom: 4 }}>
                          <Text type="secondary">Giá:</Text>{" "}
                          <Text strong>
                            {(yeuCau.loaiYeuCau === "Đổi phòng"
                              ? yeuCau.phongMongMuon?.gia ?? 0
                              : yeuCau.phongHienTai.gia ?? 0
                            ).toLocaleString()}{" "}
                            đ/tháng
                          </Text>{" "}
                          • <Text type="secondary">Sức chứa:</Text>{" "}
                          <Text strong>
                            {(yeuCau.loaiYeuCau === "Đổi phòng"
                              ? yeuCau.phongMongMuon?.soLuongDaDangKy
                              : yeuCau.phongHienTai.soLuongDaDangKy) +
                              "/" +
                              (yeuCau.loaiYeuCau === "Đổi phòng"
                                ? yeuCau.phongMongMuon?.soSv
                                : yeuCau.phongHienTai.soSv)}{" "}
                            SV
                          </Text>
                        </Paragraph>

                        <Space wrap size={8}>
                          {(yeuCau.loaiYeuCau === "Đổi phòng"
                            ? yeuCau.phongMongMuon?.tienIchList
                            : yeuCau.phongHienTai.tienIchList
                          )?.map((tienIch: TienIchModel) => (
                            <Tag
                              key={tienIch.id}
                              color="default"
                              icon={
                                iconByTienIch[
                                  tienIch.tenTienIch as keyof typeof iconByTienIch
                                ]
                              }
                            >
                              {tienIch.tenTienIch}
                            </Tag>
                          ))}
                        </Space>
                      </Col>

                      <Col
                        xs={24}
                        md={yeuCau.loaiYeuCau === "Đổi phòng" ? 12 : 4}
                        style={{ textAlign: "right" }}
                      >
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                          align="end"
                        >
                          <Tag
                            style={{
                              minWidth: "120px",
                              textAlign: "center",
                              marginRight: 0,
                            }}
                            color={
                              tagColorByTrangThai[
                                yeuCau.trangThai as keyof typeof tagColorByTrangThai
                              ] || "default"
                            }
                          >
                            {yeuCau.trangThai}
                          </Tag>
                          {(yeuCau.trangThai === "Đang tiếp nhận" ||
                            yeuCau.trangThai === "Đã tiếp nhận") && (
                            <Popconfirm
                              title="Xác nhận hủy"
                              description="Bạn có chắc chắn muốn hủy yêu cầu này?"
                              onConfirm={() => handleHuyYeuCau(yeuCau.id)}
                              okText="Đồng ý"
                              cancelText="Hủy"
                            >
                              <Button
                                danger
                                size="small"
                                style={{ minWidth: "120px" }}
                              >
                                Hủy yêu cầu
                              </Button>
                            </Popconfirm>
                          )}
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert
              message="Không có yêu cầu nào"
              description="Bạn chưa gửi yêu cầu nào. Vui lòng gửi yêu cầu mới nếu cần."
              type="info"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </Card>

        {phongCuaToi && (
          <>
            <Title level={3} style={{ textAlign: "left", marginBottom: 24 }}>
              Phòng của tôi
            </Title>

            <Card
              hoverable
              style={{
                width: "100%",
                border: "1px solid #d9d9d9",
                marginBottom: 24,
              }}
              cover={
                <img
                  alt={phongCuaToi?.tenPhong || "Phòng của tôi"}
                  src="https://www.houzlook.com/assets/images/upload/Rooms/Bed%20Rooms/Malson%20Modern%20Bed%20Room-20180819090641741.jpg"
                  style={{
                    height: 500,
                    objectFit: "cover",
                  }}
                />
              }
              bodyStyle={{ padding: 16 }}
            >
              <Row gutter={[8, 16]} justify="space-between" align="top">
                <Col span={24}>
                  <Title level={5} style={{ marginTop: 8, marginBottom: 4 }}>
                    🏠 <Text strong>{phongCuaToi?.tenPhong}</Text>
                  </Title>
                  <Tag
                    color={
                      tagColorByLoai[
                        phongCuaToi?.loaiPhong as keyof typeof tagColorByLoai
                      ] || "default"
                    }
                  >
                    {phongCuaToi?.loaiPhong}
                  </Tag>
                </Col>

                <Col span={24}>
                  <Paragraph style={{ marginBottom: 4 }}>
                    <Text type="secondary">Giá:</Text>{" "}
                    <Text strong>
                      {phongCuaToi?.gia.toLocaleString()} đ/tháng
                    </Text>
                  </Paragraph>
                  <Paragraph style={{ marginBottom: 4 }}>
                    <Text type="secondary">Sức chứa:</Text>{" "}
                    <Text strong>
                      {phongCuaToi?.soLuongDaDangKy}/{phongCuaToi?.soSv} SV
                    </Text>
                  </Paragraph>
                </Col>

                <Col span={24}>
                  <Space wrap size={8}>
                    {phongCuaToi?.tienIchList.map((tienIch: TienIchModel) => (
                      <Tag
                        key={tienIch.id}
                        color="default"
                        icon={
                          iconByTienIch[
                            tienIch.tenTienIch as keyof typeof iconByTienIch
                          ]
                        }
                      >
                        {tienIch.tenTienIch}
                      </Tag>
                    ))}
                  </Space>
                </Col>

                <Col span={24}>
                  <Flex justify="end">
                    <Popconfirm
                      title="Xác nhận trả phòng"
                      description="Bạn có chắc chắn muốn trả phòng?"
                      onConfirm={() => handleTraPhong(phongCuaToi.id)}
                      okText="Đồng ý"
                      cancelText="Hủy"
                    >
                      <Button danger type="primary" disabled={yeuCauHienTai}>
                        Trả phòng
                      </Button>
                    </Popconfirm>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </>
        )}
      </div>
    </>
  );
};
