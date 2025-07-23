import { BellOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  DatePicker,
  Flex,
  Row,
  Space,
  Typography,
  Input,
  List,
  Form,
  Button,
  Pagination,
  Spin,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ThongBaoModel } from "../models/ThongBaoModel";
import { useCustomNotification } from "../components/Notification";
import { handleAxiosError } from "../utils/errorHandler";
const { Paragraph, Title, Text } = Typography;

const dateFormat = "YYYY/MM/DD";
const PAGE_SIZE = 3;
export const ThongBaoPage = () => {
  const [thongBaoList, setThongBaoList] = useState<ThongBaoModel[]>([]);
  const [totalThongBao, setTotalThongBao] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<ThongBaoModel | null>(null);
  const [loading, setLoading] = useState(false);

  const { contextHolder, notify } = useCustomNotification();

  const [form] = Form.useForm();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchThongBao = async () => {
    try {
      setLoading(true);
      const raw = form.getFieldsValue();

      const data = {
        ...raw,
        startDate: raw.startDate
          ? dayjs(raw.startDate).startOf("day").format("YYYY-MM-DDTHH:mm:ss")
          : null,
        endDate: raw.endDate
          ? dayjs(raw.endDate).endOf("day").format("YYYY-MM-DDTHH:mm:ss")
          : null,
      };
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/secure/thongbao/search-thong-bao?page=${
          currentPage - 1
        }&size=${PAGE_SIZE}`,
        data,
        { withCredentials: true }
      );
      const thongBaoList = response.data.thongBao.map((item: ThongBaoModel) => {
        return {
          tieuDe: item.tieuDe,
          nguoiDang: item.nguoiDang,
          ngayDang: dayjs(item.ngayDang).format(dateFormat),
          noiDung: item.noiDung,
          danhSachFileDinhKem: item.danhSachFileDinhKem
            ? item.danhSachFileDinhKem
            : null,
        };
      });
      setTotalItems(response.data.totalElements);
      setThongBaoList(thongBaoList);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi tải danh sách thông báo",
        "Tải thất bại"
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };
  const fetchTotalThongBao = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/secure/thongbao/total`,
        { withCredentials: true }
      );
      console.log("Tổng số thông báo:", response.data);
      setTotalThongBao(response.data);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi tải tổng số thông báo",
        "Tải thất bại"
      );
    }
  };

  const handleSubmit = async () => {
    if (currentPage === 1) {
      fetchThongBao();
    } else {
      setCurrentPage(1);
    }
  };
  useEffect(() => {
    fetchThongBao();
    fetchTotalThongBao();
    window.scrollTo({
      top: window.innerHeight / 2,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {contextHolder}
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
      <Flex>
        <Card
          style={{
            width: 150,
            height: 90,
            border: "1px solid #d9d9d9",
            boxShadow: "none",
          }}
          hoverable
          bodyStyle={{ padding: 0, height: "100%" }}
        >
          <Row
            align="top"
            justify="space-between"
            style={{ height: "100%", padding: 8 }}
          >
            <Col>
              <Paragraph style={{ margin: 0, fontSize: 13 }}>
                Số thông báo
              </Paragraph>{" "}
              <Title level={5} style={{ margin: 0 }}>
                {totalThongBao}
              </Title>
            </Col>
            <Col>
              <BellOutlined style={{ fontSize: 50, color: "#1890ff" }} />
            </Col>
          </Row>
        </Card>
      </Flex>
      <Card
        style={{
          width: "100%",
          minHeight: 90,
          border: "1px solid #d9d9d9",
        }}
        hoverable
      >
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={[16, 16]} align="bottom">
            <Col xs={24} sm={12} md={6} lg={4}>
              <Form.Item name="startDate">
                <DatePicker
                  placeholder="Từ ngày"
                  format={dateFormat}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6} lg={4}>
              <Form.Item name="endDate">
                <DatePicker
                  placeholder="Đến ngày"
                  format={dateFormat}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={8}>
              <Form.Item name="tieuDe">
                <Input placeholder="Tìm kiếm theo tiêu đề" />
              </Form.Item>
            </Col>

            <Col
              xs={24}
              sm={12}
              md={6}
              lg={4}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  style={{ minWidth: 100 }}
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      {selectedItem ? (
        <Card
          title={selectedItem.tieuDe}
          extra={
            <a onClick={() => setSelectedItem(null)}>← Quay lại danh sách</a>
          }
          style={{ width: "100%", border: "1px solid #d9d9d9" }}
          hoverable
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Paragraph>
              <Text strong>Người gửi:</Text> {selectedItem?.nguoiDang}
            </Paragraph>
            <Paragraph>
              <Text strong>Ngày gửi:</Text> {selectedItem?.ngayDang}
            </Paragraph>
            <Paragraph>{selectedItem?.noiDung}</Paragraph>

            {selectedItem?.danhSachFileDinhKem &&
              selectedItem.danhSachFileDinhKem.map((file, index) => (
                <Paragraph key={index}>
                  📎{" "}
                  <a
                    href={file.duongDan}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.tenFile}
                  </a>
                </Paragraph>
              ))}
            {selectedItem?.nguoiDang && (
              <div style={{ textAlign: "right", marginTop: 32 }}>
                <Paragraph italic>
                  Ký tên: <Text strong>{selectedItem.nguoiDang}</Text>
                </Paragraph>
              </div>
            )}
          </Space>
        </Card>
      ) : (
        <Card
          title="Danh sách thông báo"
          style={{ width: "100%", border: "1px solid #d9d9d9" }}
          hoverable
        >
          <List
            itemLayout="vertical"
            dataSource={thongBaoList}
            renderItem={(item) => (
              <List.Item
                onClick={() => setSelectedItem(item)}
                style={{ cursor: "pointer" }}
              >
                <Title level={5} style={{ marginBottom: 4 }}>
                  {item.tieuDe}
                </Title>
                <Text type="secondary">Người gửi: {item.nguoiDang}</Text>
                <br />
                <Text type="secondary">Ngày gửi: {item.ngayDang}</Text>
              </List.Item>
            )}
          />
        </Card>
      )}
      <Pagination
        align="center"
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={totalItems}
        onChange={(page) => setCurrentPage(page)}
      ></Pagination>
    </Space>
  );
};
