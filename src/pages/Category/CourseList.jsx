import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/categories";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space, Button, Steps, Modal, Form, Input, Spin, Popconfirm } from 'antd';
import { LIMIT, defaultURLImage } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoriesList = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMoalCreate, setOpenMoalCreate] = useState(false);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState({
    search: "",
    currentPage: 1,
    size: LIMIT,
    sortBy: "_id",
    order: 1,
  });
  const navigate = useNavigate();
  const sortBy = [
    { value: "_id", label: "Sắp xếp" },
    { value: "update_time", label: "Thời gian cập nhật" },
    { value: "citations", label: "Trích dẫn" },
    { value: "h_index", label: "H_index" },
    { value: "i10_index", label: "I10_index" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.gets(filter);
        setDatas(res.data);
      } catch (error) {
        toast.error(error.msg);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
    return () => fetchData();
  }, [filter]);

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Nội dung', dataIndex: 'courses', key: 'courses',
      render: (courses) => (
        <div className="max-h-24 overflow-y-auto px-2">
          <Steps
            progressDot
            direction="vertical"
            current={
              courses?.length || 0
            }
            items={courses?.map((course) => ({
              title: course.title,
            })) || []}
          />
        </div>
      )
    },
    { title: 'Số lượng bài giảng', dataIndex: 'course_materials_count', key: 'course_materials_count',
      sorter: (a, b) => a.course_materials_count - b.course_material
    },
    { title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at', render: (created_at) => new Date(created_at).toLocaleDateString(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at)
    },
    { title: 'Ngày cập nhật', dataIndex: 'updated_at', key: 'updated_at', render: (updated_at) => new Date(updated_at).toLocaleDateString(),
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
    },
    {
      title: 'Hành động', key: 'id', dataIndex: 'id',
      render: (id, record) => (
        <Space size="middle">
          <Link to={`/categories/${id}`} className="text-success">
            <EditOutlined />
          </Link>
          <Popconfirm
            title="Xác nhận xóa khóa học này?"
            description={`Bạn có chắc chắn muốn xóa khóa học: ${record.name}?`}
            onConfirm={
              async () => {
                try {
                  setLoading(true);
                  await api.delete(id);
                  toast.success("Xóa thành công");
                  setFilter({ ...filter, currentPage: 1 });
                  setLoading(false);
                } catch (error) {
                  toast.error(error.msg);
                }
              }
            }
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <DeleteOutlined className="text-danger" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Danh sách khóa học" />
      <CommonFilter filter={filter} setFilter={setFilter} sortBy={sortBy} />
      <div className="flex justify-end">
        <Button className="mb-4 bg-pink-700 text-white" onClick={() => setOpenMoalCreate(true)}>+ Thêm mới</Button>
        <Modal
          title="Tạo mới khóa học"
          open={openMoalCreate}
          onCancel={() => setOpenMoalCreate(false)}
          onOk={() => form.submit()}
          confirmLoading={loading}
          okText="Tạo mới"
          centered
        >
          <div className="my-4">
            <Form
              name="basic"
              form={form}
              onFinish={async (values) => {
                try {
                  setLoading(true);
                  await api.create(values);
                  toast.success("Tạo mới thành công");
                  setOpenMoalCreate(false);
                  setFilter({ ...filter, currentPage: 1 });
                  form.resetFields();
                  setLoading(false);
                } catch (error) {
                  toast.error(error.msg);
                }
              }}
              layout="vertical"
            >
              <Form.Item
                label="Tên khóa học"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
              >
                <Input.TextArea placeholder="Nhập tên khóa học" />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <Table
        columns={columns} dataSource={datas} rowKey='id'
        pagination={{
          total: datas?.total, current: filter.currentPage,
          pageSize: filter.size, showSizeChanger: false,
          onChange: (page) => setFilter({ ...filter, currentPage: page }),
        }} scroll={{ x: true }} loading={loading}
      />
    </>
  );
};

export default CategoriesList;
