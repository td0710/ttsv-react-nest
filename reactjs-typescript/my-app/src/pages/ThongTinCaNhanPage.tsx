import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useCustomNotification } from "../components/Notification";
import { useAuth } from "../hooks/useAuth";
import { handleAxiosError } from "../utils/errorHandler";
import type { ThongTinCaNhanModel } from "../models/ThongTinCaNhanModel";
const { Text } = Typography;
interface TinhThanh {
  value: string;
  label: string;
}

export const ThongTinCaNhanPage = () => {
  const [form] = Form.useForm();
  const [listTinhThanh, setListTinhThanh] = useState<TinhThanh[]>([]);
  const { contextHolder, notify } = useCustomNotification();
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  useEffect(() => {
    const fetchTinhThanh = async () => {
      const url = `https://esgoo.net/api-tinhthanh/1/0.htm`;

      const response = await axios.get(url);

      const dsTinhThanh = response.data.data.map((item: TinhThanh) => ({
        value: String(item.value),
        label: item.label,
      }));
      setListTinhThanh(dsTinhThanh);
    };
    fetchTinhThanh();
  }, []);
  const fetchThongTinCaNhan = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/thongtincanhan/get-thong-tin-ca-nhan`;
      console.log(url);
      const response = await axios.get(url, { withCredentials: true });

      const formatted = {
        ...response.data,
        ngaySinh: response.data.ngaySinh ? dayjs(response.data.ngaySinh) : null,
        cccdNgayCap: response.data.cccdNgayCap
          ? dayjs(response.data.cccdNgayCap)
          : null,
      };

      form.setFieldsValue(formatted);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Đã xảy ra lỗi khi lấy dữ liệu.",
        "Lỗi khi tải dữ liệu"
      );
    }
  };
  useEffect(() => {
    fetchThongTinCaNhan();
  }, [form]);

  const UpdateThongTinCaNhan = async (data: ThongTinCaNhanModel) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/secure/thongtincanhan/update`,
        data,
        { withCredentials: true }
      );
      console.log("Cập nhật thành công:", response.data);
      notify(
        "success",
        "Cập nhật thành công",
        "Thông tin cá nhân đã được cập nhật"
      );
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi cập nhật thông tin.",
        "Cập nhật thất bại"
      );
    }
  };
  const handleSubmit = async () => {
    try {
      const data = {
        ...form.getFieldsValue(),
      };
      console.log(data);
      await UpdateThongTinCaNhan(data);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Lỗi khi gửi dữ liệu.",
        "Lỗi gửi biểu mẫu"
      );
    }
  };

  return (
    <>
      {contextHolder}

      <Form form={form} layout="vertical" style={{ maxWidth: "100%" }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Row gutter={[16, 20]}>
            <Col span={24}>
              <Card
                hoverable
                title="THÔNG TIN CƠ BẢN"
                styles={{
                  header: { backgroundColor: "#172d56" },
                  title: { color: "#fff" },
                }}
              >
                <Row gutter={[16, 20]}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="hoTen"
                      label="Họ tên"
                      rules={[
                        { required: true, message: "Bắt buộc nhập họ tên" },
                      ]}
                    >
                      <Input placeholder="Họ tên" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="maSinhVien"
                      label="Mã sinh viên"
                      rules={[
                        {
                          required: true,
                          message: "Bắt buộc nhập",
                        },
                      ]}
                    >
                      <Input placeholder="Mã sinh viên" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="khoa"
                      label="Khóa"
                      rules={[
                        {
                          required: true,
                          message: "Bắt buộc nhập",
                        },
                      ]}
                    >
                      <Input placeholder="Khóa" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      name="danToc"
                      label="Dân tộc"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Dân tộc" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="tonGiao" label="Tôn giáo">
                      <Input placeholder="Tôn giáo" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="quocTich"
                      label="Quốc tịch"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Quốc tịch" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="cccd"
                      label="Số CMND/CCCD"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Số CMND/Thẻ căn cước" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="cccdNgayCap" label="Ngày cấp">
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Ngày cấp CMND/CCCD"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="cccdNoiCap" label="Nơi cấp">
                      <Select
                        showSearch
                        placeholder="Chọn nơi cấp"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={listTinhThanh.map((item) => ({
                          value: item.value,
                          label: item.label,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="ngaySinh"
                      label="Ngày sinh"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        placeholder="Ngày sinh"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="noiSinh"
                      label="Nơi sinh"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Select
                        showSearch
                        placeholder="Chọn nơi sinh"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={listTinhThanh.map((item) => ({
                          value: item.value,
                          label: item.label,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="gioiTinh"
                      label="Giới tính"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Radio.Group>
                        <Radio value="Nam">Nam</Radio>
                        <Radio value="Nữ">Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      name="queQuan"
                      label="Quê quán"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Quê quán" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="soDienThoai"
                      label="SĐT Sinh viên"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Số điện thoại sinh viên" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Text strong>Hộ khẩu thường trú</Text>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="hoKhauThanhPho"
                      label="Tỉnh/Thành phố"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Tỉnh/Thành phố" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="hoKhauHuyen"
                      label="Quận/Huyện"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Quận/Huyện" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="hoKhauXa"
                      label="Xã/Phường"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Xã/Phường" />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="diaChiBaoTin"
                      label="Địa chỉ báo tin"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Địa chỉ báo tin" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      name="soDienThoaiGiaDinh"
                      label="SĐT Gia đình"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="SĐT Gia đình" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="lop"
                      label="Lớp"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Lớp" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="cccdNguoiGiamHo"
                      label="CMND/CCCD Người giám hộ"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="CMND/CCCD Người giám hộ" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      name="maBaoHiemYTe"
                      label="Mã số BHYT"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Mã số BHYT" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      name="maBaoHiemXaHoi"
                      label="Mã số BHXH"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Mã số BHXH" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                hoverable
                title="THÔNG TIN BỐ"
                style={{ width: "100%" }}
                styles={{
                  header: { backgroundColor: "#172d56" },
                  title: { color: "#fff" },
                }}
              >
                <Row gutter={[16, 20]}>
                  <Col span={24}>
                    <Form.Item
                      name="tenBo"
                      label="Họ tên Bố"
                      rules={[
                        {
                          required: true,
                          message: "Bắt buộc nhập",
                        },
                      ]}
                    >
                      <Input placeholder="Họ tên Bố" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="namSinhBo"
                      label="Năm sinh"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Năm sinh" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="ngheNghiepBo"
                      label="Nghề nghiệp, chức vụ"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Nghề nghiệp, chức vụ" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="noiLamViecBo"
                      label="Nơi làm việc"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Nơi làm việc" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="soDienThoaiBo"
                      label="Điện thoại"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Điện thoại" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card
                hoverable
                title="THÔNG TIN MẸ"
                style={{ width: "100%" }}
                styles={{
                  header: { backgroundColor: "#172d56" },
                  title: { color: "#fff" },
                }}
              >
                <Row gutter={[16, 20]}>
                  <Col span={24}>
                    <Form.Item
                      name="tenMe"
                      label="Họ tên Mẹ"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Họ tên Mẹ" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="namSinhMe"
                      label="Năm sinh"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Năm sinh" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="ngheNghiepMe"
                      label="Nghề nghiệp, chức vụ"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Nghề nghiệp, chức vụ" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="noiLamViecMe"
                      label="Nơi làm việc"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Nơi làm việc" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="soDienThoaiMe"
                      label="Điện thoại"
                      rules={[{ required: true, message: "Bắt buộc nhập" }]}
                    >
                      <Input placeholder="Điện thoại" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Space>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  Lưu thông tin
                </Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  );
};
