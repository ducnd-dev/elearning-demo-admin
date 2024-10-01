import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/courses";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space, Button } from 'antd';
import { LIMIT, defaultURLImage } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";

const CourseList = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
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
    { title: 'Tên', dataIndex: 'title', key: 'title' },
    {
      title: 'Hành động', key: 'id', dataIndex: 'id',
      render: (id) => (
        <Space size="middle">
          <Link to={`/courses/${id}`} className="text-primary">
            <Button type="primary" className="bg-primary">Xem</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Danh sách khóa học" />
      <CommonFilter filter={filter} setFilter={setFilter} sortBy={sortBy} />
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

export default CourseList;
