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
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Pagination,
  Slider,
  Switch,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { PhongModel } from "../../models/PhongModel";
import axios from "axios";
import { TienIchModel } from "../../models/TienIchModel";
import { useCustomNotification } from "../../components/Notification";
import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../utils/errorHandler";
const { Option } = Select;
const { Paragraph, Title, Text } = Typography;

const PAGE_SIZE = 6;

export const TatCaPhongPage = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();

  const [phongCuaToi, setPhongCuaToi] = useState<PhongModel>();

  const [phongList, setPhongList] = useState<PhongModel[]>([]);

  const [yeuCauHienTai, setYeuCauHienTai] = useState(true);

  const [loading, setLoading] = useState(false);

  const { contextHolder, notify } = useCustomNotification();

  const navigate = useNavigate();
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
        "Lỗi khi lấy phòng của tôi.",
        "Lỗi lấy phòng"
      );
    }
  };
  const fetchPhongList = async () => {
    try {
      setLoading(true);
      const gia = form.getFieldValue("gia");
      const data = {
        ten: form.getFieldValue("ten"),
        loaiPhong: form.getFieldValue("loaiPhong"),
        soSv: form.getFieldValue("soSv"),
        start: gia[0],
        end: gia[1],
        trong: form.getFieldValue("trong"),
      };
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/phong/search-phong?page=${currentPage - 1}&size=${PAGE_SIZE}`;
      const response = await axios.post(url, data, {
        withCredentials: true,
      });
      console.log("Response Data:", response.data);
      const phongList = response.data.phong.map((item: PhongModel) => {
        return new PhongModel(
          item.id,
          item.tenPhong,
          item.loaiPhong,
          item.soSv,
          item.gia,
          item.soLuongDaDangKy,
          item.tienIchList.map(
            (tienIch: TienIchModel) =>
              new TienIchModel(tienIch.id, tienIch.tenTienIch)
          )
        );
      });
      setPhongList(phongList);
      setTotalItems(response.data.totalElements);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi lấy danh sách phòng.",
        "Lỗi lấy danh sách"
      );
      setPhongList([]);
      setTotalItems(0);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
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
        "Lỗi khi lấy yêu cầu hiện tại.",
        "Lỗi lấy yêu cầu"
      );
    }
  };

  const handleDangKyPhong = async (phongId: number) => {
    try {
      setLoading(true);
      console.log("Đăng ký phòng với ID:", phongId);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/dang-ky-phong?phongId=${phongId}`;
      const response = await axios.post(url, {}, { withCredentials: true });
      console.log("Đăng ký phòng thành công:", response.data);
      const notify = {
        type: "success",
        message: "Yêu cầu đăng ký thành công",
        description:
          "Bạn đã gửi yêu cầu đăng ký phòng thành công. Vui lòng theo dõi quá trình duyệt yêu cầu.",
      };
      navigate("/dangkyktx?tab=theo_doi", { state: { notify } });
      localStorage.setItem("notification", JSON.stringify(notify));
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi gửi yêu cầu đăng ký phòng.",
        "Lỗi đăng ký"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDoiPhong = async (
    phongHienTaiId: number,
    phongMongMuonId: number
  ) => {
    try {
      setLoading(true);
      console.log(
        "Chuyển phòng từ ID:",
        phongHienTaiId,
        "đến ID:",
        phongMongMuonId
      );
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauktx/doi-phong?phongHienTaiId=${phongHienTaiId}&phongMongMuonId=${phongMongMuonId}`;
      const response = await axios.post(url, {}, { withCredentials: true });
      console.log("Chuyển phòng thành công:", response.data);
      const notify = {
        type: "success",
        message: "Yêu cầu chuyển phòng thành công",
        description:
          "Bạn đã gửi yêu cầu chuyển phòng thành công. Vui lòng theo dõi quá trình duyệt yêu cầu.",
      };
      navigate("/dangkyktx?tab=theo_doi", { state: { notify } });
      localStorage.setItem("notification", JSON.stringify(notify));
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi gửi yêu cầu chuyển phòng.",
        "Lỗi chuyển phòng"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYeuCauHienTai();
    fetchPhongCuaToi();
    fetchPhongList();
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
  }, [currentPage]);
  const handleSubmit = async () => {
    if (currentPage === 1) {
      fetchPhongList();
    } else {
      setCurrentPage(1);
    }
  };
  console.log("Phong cua toi:", phongCuaToi);
  return (
    <>
      {contextHolder}

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
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
        <Card hoverable style={{ border: "1px solid #d9d9d9" }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              gia: [0, 2000000],
              trong: false,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item name="ten" label="Tên phòng">
                  <Input placeholder="Nhập tên phòng" allowClear />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item name="loaiPhong" label="Loại phòng">
                  <Select placeholder="Chọn loại phòng" allowClear>
                    <Option value="Cơ bản">Cơ bản</Option>
                    <Option value="Cơ bản nhỏ">Cơ bản nhỏ</Option>
                    <Option value="Thiết bị tăng cường">
                      Thiết bị tăng cường
                    </Option>
                    <Option value="Phổ thông không điều hòa">
                      Phổ thông không điều hòa
                    </Option>
                    <Option value="Phổ thông có điều hòa">
                      Phổ thông có điều hòa
                    </Option>
                    <Option value="Tiêu chuẩn">Tiêu chuẩn</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item name="soSv" label="Số sinh viên">
                  <Select placeholder="Số SV / phòng" allowClear>
                    <Option value={2}>2</Option>
                    <Option value={4}>4</Option>
                    <Option value={6}>6</Option>
                    <Option value={8}>8</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={6}>
                <Form.Item name="gia" label="Khoảng giá (VNĐ)">
                  <Slider
                    range
                    step={50000}
                    min={500000}
                    max={2000000}
                    tooltip={{
                      formatter: (value?: number) =>
                        value !== undefined
                          ? `${value.toLocaleString()} đ`
                          : "",
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  name="trong"
                  label="Chỉ còn phòng trống"
                  valuePropName="checked"
                >
                  <Switch onClick={handleSubmit} />
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={12}
                md={6}
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Row gutter={[16, 16]}>
          {phongList.map((phong: PhongModel) => (
            <Col xs={24} sm={12} md={12} lg={8} key={phong.id}>
              <Card
                hoverable
                style={{
                  width: "100%",
                  border: "1px solid #d9d9d9",
                  height: "100%",
                }}
                cover={
                  <img
                    alt={phong.tenPhong}
                    src="https://ruche.vn/storage/tin-tuc/trang-tri-phong-ngu/bedroom-ruche2.jpg"
                    style={{
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                }
                bodyStyle={{ padding: 12 }}
              >
                <Row gutter={[8, 16]} justify={"space-between"} align="top">
                  <Col span={24}>
                    <Title level={5} style={{ marginTop: 8, marginBottom: 4 }}>
                      🏠 <Text strong>{phong.tenPhong}</Text>
                    </Title>
                    <Tag
                      color={
                        tagColorByLoai[
                          phong.loaiPhong as keyof typeof tagColorByLoai
                        ] || "default"
                      }
                    >
                      {phong.loaiPhong}
                    </Tag>
                  </Col>

                  <Col span={24}>
                    <Paragraph style={{ marginBottom: 4 }}>
                      <Text type="secondary">Giá:</Text>{" "}
                      <Text strong>{phong.gia.toLocaleString()} đ/tháng</Text>
                    </Paragraph>
                    <Paragraph style={{ marginBottom: 4 }}>
                      <Text type="secondary">Sức chứa:</Text>{" "}
                      <Text strong>
                        {phong.soLuongDaDangKy}/{phong.soSv} SV
                      </Text>
                    </Paragraph>
                  </Col>

                  <Col
                    span={24}
                    style={{
                      height: 48,
                    }}
                  >
                    <Space wrap size={8}>
                      {phong.tienIchList?.map((tienIch: TienIchModel) => (
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
                    <Flex>
                      {phongCuaToi === undefined ? (
                        <Button
                          color="primary"
                          size="middle"
                          block
                          variant="filled"
                          disabled={
                            phong.soLuongDaDangKy >= phong.soSv || yeuCauHienTai
                          }
                          onClick={() => handleDangKyPhong(phong.id)}
                        >
                          {phong.soLuongDaDangKy >= phong.soSv
                            ? "Đã đầy"
                            : "Đăng ký phòng"}
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          size="middle"
                          block
                          variant="filled"
                          disabled={
                            phong.soLuongDaDangKy >= phong.soSv ||
                            typeof phongCuaToi?.id !== "number" ||
                            yeuCauHienTai
                          }
                          onClick={() => {
                            if (typeof phongCuaToi?.id === "number") {
                              handleDoiPhong(phongCuaToi.id, phong.id);
                            }
                          }}
                        >
                          {phong.soLuongDaDangKy >= phong.soSv
                            ? "Đã đầy"
                            : "Chuyển phòng"}
                        </Button>
                      )}
                    </Flex>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination
          align="center"
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalItems}
          onChange={(page) => setCurrentPage(page)}
        ></Pagination>
      </Space>
    </>
  );
};
