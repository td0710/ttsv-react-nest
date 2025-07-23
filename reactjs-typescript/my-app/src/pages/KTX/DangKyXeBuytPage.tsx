import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Space,
  Table,
  Typography,
  Radio,
  Flex,
  Input,
  Upload,
  Popconfirm,
  type TableColumnsType,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { TuyenXeModel } from "../../models/TuyenXeModel";
import { PlusOutlined } from "@ant-design/icons";
import { useCustomNotification } from "../../components/Notification";
import { handleAxiosError } from "../../utils/errorHandler";
import type { YeuCauVeXeBuyt } from "../../models/YeuCauVeXeBuytModel";
import type { UploadChangeParam } from "antd/es/upload";
import type { RadioChangeEvent } from "antd";

const { Option } = Select;
const { Paragraph } = Typography;
export const DangKyXeBuytPage = () => {
  const [selectTuyen, setSelectTuyen] = useState("Mot tuyen");
  const [tuyenXe, setTuyenXe] = useState<TuyenXeModel[]>([]);
  const [form] = Form.useForm();
  const { contextHolder, notify } = useCustomNotification();
  const [dsYeuCau, setDsYeuCau] = useState([]);

  const handleSelectTuyen = (e: RadioChangeEvent) => {
    const value = e.target.value;
    setSelectTuyen(value === "motTuyen" ? "Mot tuyen" : "Lien tuyen");
  };
  const normFile = (e: UploadChangeParam) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  console.log("Tuyen xe", tuyenXe);
  interface FormValues {
    tuyen: string;
    selectedTuyen: string;
    sdt: string;
    anh: UploadChangeParam["fileList"];
  }

  const handleSubmit = async (values: FormValues) => {
    try {
      const img = values.anh?.[0]?.originFileObj;
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/secure/yeucauvexebuyt/create`,
        {
          loaiVe: values.tuyen,
          tuyen: values.selectedTuyen,
          sdt: values.sdt,
          file: img,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", response);
      notify(
        "success",
        "Yêu cầu thành công",
        "Yêu cầu cấp giấy xác nhận sinh viên đã được gửi"
      );
      fetchDanhSachYeuCau();
      form.resetFields();
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Gửi yêu cầu thất bại",
        "Đã xảy ra lỗi khi gửi yêu cầu."
      );
    }
  };

  useEffect(() => {
    const fetchTuyenXe = async () => {
      const url = `${import.meta.env.VITE_API_BASE_URL}/secure/tuyenxe/get-all`;
      const response = await axios.get(url, { withCredentials: true });

      const listTuyenXe = response.data.map((item: TuyenXeModel) => {
        return {
          id: item.id,
          ten: item.ten,
          maTuyen: item.maTuyen,
        };
      });
      console.log(listTuyenXe);
      setTuyenXe(listTuyenXe);
    };
    fetchTuyenXe();
  }, []);

  const fetchDanhSachYeuCau = async () => {
    try {
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauvexebuyt/get-all`;

      const response = await axios.get(url, { withCredentials: true });

      const list = response.data.map((item: YeuCauVeXeBuyt, index: number) => ({
        key: index + 1,
        id: item.id,
        tuyen: item.tuyen,
        ngayTao: item.ngayTao?.slice(0, 10),
        trangThai: item.trangThai,
        noiNhan: item.noiNhan,
        ngayNhan: item.ngayNhan,
        ghiChu: item.ghiChu,
      }));
      setDsYeuCau(list);
    } catch (error) {
      handleAxiosError(
        error,
        notify,
        "Tải thất bại",
        "Lỗi khi tải danh sách yêu cầu."
      );
    }
  };
  useEffect(() => {
    fetchDanhSachYeuCau();
  }, []);

  const handleHuyYeuCau = async (data: number) => {
    try {
      console.log(data);
      const url = `${
        import.meta.env.VITE_API_BASE_URL
      }/secure/yeucauvexebuyt/delete?id=${data}`;
      const response = await axios.delete(url, { withCredentials: true });
      notify(
        "success",
        "Hủy yêu cầu thành công",
        "Yêu cầu đăng ký đã được hủy"
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
    tuyen: string;
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
      title: "Tuyến",
      dataIndex: "tuyen",
      key: "tuyen",
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
              <Col span={24}>
                <Form.Item
                  name="tuyen"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại tuyến" },
                  ]}
                >
                  <Radio.Group
                    onChange={handleSelectTuyen}
                    defaultValue={1}
                    options={[
                      {
                        value: "motTuyen",
                        className: "option-1",
                        label: (
                          <Flex
                            gap="small"
                            justify="center"
                            align="center"
                            vertical
                          >
                            Một tuyến
                          </Flex>
                        ),
                      },
                      {
                        value: "lienTuyen",
                        className: "option-2",
                        label: (
                          <Flex
                            gap="small"
                            justify="center"
                            align="center"
                            vertical
                          >
                            Liên tuyến
                          </Flex>
                        ),
                      },
                    ]}
                    optionType="button"
                    buttonStyle="solid"
                  />
                </Form.Item>
              </Col>
              {selectTuyen === "Mot tuyen" ? (
                <Col span={24}>
                  <Form.Item
                    name="selectedTuyen"
                    rules={[{ required: true, message: "Vui lòng chọn tuyến" }]}
                  >
                    <Select
                      placeholder="Chọn tuyến"
                      style={{
                        width: "100%",
                      }}
                    >
                      {tuyenXe.map((item: TuyenXeModel) => (
                        <Option key={item.id} value={item.ten}>
                          <div
                            style={{
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.ten} [{item.maTuyen}]
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              ) : (
                <div></div>
              )}
              <Col span={24}>
                <Form.Item
                  name="sdt"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input placeholder="Số điện thoại"></Input>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  name="anh"
                  rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
                >
                  <Upload listType="picture-card" beforeUpload={() => false}>
                    <button
                      style={{
                        color: "inherit",
                        cursor: "inherit",
                        border: 0,
                        background: "none",
                      }}
                      type="button"
                    >
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Ảnh</div>
                    </button>
                  </Upload>
                </Form.Item>
              </Col>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Row>
          </Card>
        </Form>
        <Alert
          type="info"
          showIcon
          message="Quy định về việc trả kết quả giấy tờ"
          description={
            <>
              <Paragraph>
                <strong>• Ngày hẹn trả kết quả:</strong>
                <br />
                Kết quả sẽ được trả sau tối thiểu{" "}
                <strong>12 giờ làm việc</strong>; vào{" "}
                <strong>chiều Thứ 2</strong>, <strong>sáng Thứ 4</strong> và{" "}
                <strong>sáng Thứ 6</strong> hàng tuần.
              </Paragraph>

              <Paragraph>
                <strong>• Địa điểm nhận:</strong> Tầng 1, nhà T1.
              </Paragraph>

              <Paragraph>
                <strong>• Khi đến nhận kết quả:</strong> Sinh viên cần nộp{" "}
                <strong>02 ảnh thẻ 3x4</strong> (đã rửa).
              </Paragraph>

              <Paragraph>
                <strong>• Thời gian lưu kết quả:</strong> Kết quả sẽ được lưu
                giữ tại phòng trong vòng <strong>02 tuần</strong> kể từ ngày hẹn
                trả kết quả. Sau thời gian này, nếu sinh viên chưa đến nhận, vui
                lòng <strong>đăng ký lại</strong> để được cấp lại giấy.
              </Paragraph>
            </>
          }
        />

        <Card title="Danh sách yêu cầu vé xe buýt" hoverable>
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
