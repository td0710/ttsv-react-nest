import {
  Alert,
  Card,
  Col,
  Row,
  Space,
  Table,
  Select,
  Form,
  Button,
  Popconfirm,
  type TableColumnsType,
} from "antd";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { GiayXacNhanModel } from "../models/GiayXacNhanModel";
import { YeuCauGiayXacNhanModel } from "../models/YeuCauGiayXacNhanModel";
import axios from "axios";
import { useCustomNotification } from "../components/Notification";
import { handleAxiosError } from "../utils/errorHandler";
const { Paragraph } = Typography;
const { Option } = Select;
interface GiayXacNhanFormData {
  giayXacNhan: string;
}
export const GiayXacNhanSinhVienPage = () => {
  const [giayXacNhan, setGiayXacNhan] = useState<GiayXacNhanModel[]>([]);
  const [form] = Form.useForm();
  const [dsYeuCau, setDsYeuCau] = useState([]);
  const selectedGiay = Form.useWatch("giayXacNhan", form);
  const { contextHolder, notify } = useCustomNotification();

  useEffect(() => {
    const fetchLoaiGiayXacNhan = async () => {
      try {
        const url = `${
          import.meta.env.VITE_API_BASE_URL
        }/giayxacnhan/get-giay-xac-nhan`;
        console.log(url);
        const response = await axios.get(url, { withCredentials: true });
        const listGiayXacNhan = response.data.map((item: GiayXacNhanModel) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        console.log(response);
        setGiayXacNhan(listGiayXacNhan);
      } catch (error) {
        handleAxiosError(
          error,
          notify,
          "Lấy loại giấy thất bại",
          "Đã xảy ra lỗi khi lấy loại giấy xác nhận."
        );
      }
    };
    fetchLoaiGiayXacNhan();
  }, []);
  console.log(123);
  const fetchDanhSachYeuCau = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/yeucaugiayxacnhan/get-yeu-cau-by-id`;
      const response = await axios.get(url, { withCredentials: true });
      const list = response.data.map(
        (item: YeuCauGiayXacNhanModel, index: number) => ({
          key: index + 1,
          id: item.id,
          loai: item.loaiGiay,
          ngayTao: item.ngayTao?.slice(0, 10),
          trangThai: item.trangThai,
          noiNhan: item.noiNhan,
          ngayNhan: item.ngayNhan,
          ghiChu: item.ghiChu,
        })
      );
      setDsYeuCau(list);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lấy danh sách yêu cầu thất bại",
        "Đã xảy ra lỗi khi lấy danh sách yêu cầu."
      );
    }
  };
  useEffect(() => {
    fetchDanhSachYeuCau();
  }, []);
  const handleSubmit = async (values: GiayXacNhanFormData) => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucaugiayxacnhan/create`;
      const response = await axios.post(
        url,
        {
          user_id: 1,
          loaiGiay: values.giayXacNhan,
        },
        { withCredentials: true }
      );
      console.log(response);

      notify(
        "success",
        "Yêu cầu thành công",
        "Yêu cầu cấp giấy xác nhận sinh viên đã được gửi"
      );
      form.resetFields();
      fetchDanhSachYeuCau();
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Gửi yêu cầu thất bại",
        "Đã xảy ra lỗi khi gửi yêu cầu."
      );
    }
  };
  const handleHuyYeuCau = async (data: number) => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucaugiayxacnhan/delete?id=${data}`;
      const response = await axios.delete(url, { withCredentials: true });
      notify(
        "success",
        "Hủy yêu cầu thành công",
        "Yêu cầu cấp giấy xác nhận sinh viên đã được hủy"
      );
      console.log(response);
      form.resetFields();
      fetchDanhSachYeuCau();
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Hủy yêu cầu thất bại",
        "Đã xảy ra lỗi khi hủy yêu cầu."
      );
    }
  };
  interface DataType {
    id: number;
    key: React.Key;
    ngayTao: string;
    trangThai: string;
    noiNhan: string;
    ngayNhan: string;
    loai: string;
    ghiChu: string;
  }
  const columns: TableColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      fixed: "left",
    },

    {
      title: "Ngày tạo",
      dataIndex: "ngayTao",
      key: "ngayTao",
    },

    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
    },
    {
      title: "Nơi nhận",
      dataIndex: "noiNhan",
      key: "noiNhan",
    },
    {
      title: "Ngày nhận",
      dataIndex: "ngayNhan",
      key: "ngayNhan",
    },
    {
      title: "Loại giấy",
      dataIndex: "loai",
      key: "loai",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Xác nhận hủy"
          description="Bạn có chắc chắn muốn hủy yêu cầu này?"
          onConfirm={() => handleHuyYeuCau(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button danger>Hủy</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Form form={form} onFinish={handleSubmit} style={{ maxWidth: "100%" }}>
          <Card title="Chọn loại giấy xác nhận" bordered hoverable>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item name="giayXacNhan">
                  <Select
                    placeholder="Chọn loại giấy xác nhận"
                    style={{
                      width: "100%",
                    }}
                  >
                    {giayXacNhan.map((item: GiayXacNhanModel) => (
                      <Option key={item.id} value={item.name}>
                        <div
                          style={{
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >
                          {item.name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!selectedGiay}
                >
                  Xin cấp giấy XNSV
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
        <Alert
          type="info"
          showIcon
          message="Hướng dẫn nhận các loại giấy xác nhận"
          style={{ boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
          description={
            <>
              <Paragraph>
                <strong>
                  • Giấy xác nhận sinh viên để nhận ưu đãi giáo dục:
                </strong>
                <br />
                Trả kết quả sau tối thiểu <strong>12h làm việc</strong>; vào{" "}
                <strong>sáng Thứ 3</strong> và <strong>chiều Thứ 5</strong> hàng
                tuần. <br />
                <em>Địa điểm nhận:</em> Tầng 1 nhà T1.
              </Paragraph>

              <Paragraph>
                <strong>
                  • Giấy xác nhận sinh viên để vay vốn tại NHCSXH địa phương:
                </strong>
                <br />
                Trả kết quả sau tối thiểu <strong>12h làm việc</strong>; vào{" "}
                <strong>chiều Thứ 3</strong> và <strong>chiều Thứ 6</strong>{" "}
                hàng tuần. <br />
                <em>Địa điểm nhận:</em> Tầng 1 nhà T1.
              </Paragraph>

              <Paragraph>
                <strong>
                  • Giấy xác nhận sinh viên để giải quyết các vấn đề cá nhân
                  khác
                </strong>{" "}
                (như: miễn trừ thuế thu nhập, xin việc, du học, …):
                <br />
                Trả kết quả sau tối thiểu <strong>12h làm việc</strong>; vào{" "}
                <strong>chiều Thứ 2</strong>, <strong>sáng Thứ 4</strong> và{" "}
                <strong>sáng Thứ 6</strong> hàng tuần. <br />
                <em>Địa điểm nhận:</em> Tầng 1 nhà T1.
              </Paragraph>

              <Paragraph>
                <strong>• Giấy giới thiệu đăng ký xe máy:</strong>
                <br />
                Trả kết quả sau tối thiểu <strong>12h làm việc</strong>; vào{" "}
                <strong>chiều Thứ 2</strong>, <strong>sáng Thứ 4</strong> và{" "}
                <strong>sáng Thứ 6</strong> hàng tuần. <br />
                <em>Địa điểm nhận:</em> Tầng 1 nhà T1.
              </Paragraph>
            </>
          }
        />

        <Card
          title="Danh sách giấy xác nhận đã đăng ký"
          variant="borderless"
          hoverable
        >
          <Table
            columns={columns}
            dataSource={dsYeuCau}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </Space>
    </>
  );
};
