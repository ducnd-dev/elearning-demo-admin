import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/experts";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space } from 'antd';
import { LIMIT, defaultURLImage } from "../../constants/api";
import { useNavigate } from "react-router-dom";

const ExpertList = () => {
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
        const res = await api.getExperts(filter);
        setDatas(res[0]);
      } catch (error) {
        toast.error(error.msg);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [filter]);

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    {
      title: 'Hành động', key: 'id', dataIndex: 'id',
      render: (text) => (
        <Space size="middle">
          <button className="inline-flex items-center justify-center bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => navigate(`/experts/${text}`)}>Xem</button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Danh sách chuyên gia" />
      <CommonFilter filter={filter} setFilter={setFilter} sortBy={sortBy} />
      <Table
        columns={columns} dataSource={datas?.items} rowKey='id'
        pagination={{
          total: datas?.total, current: filter.currentPage,
          pageSize: filter.size, showSizeChanger: false,
          onChange: (page) => setFilter({ ...filter, currentPage: page }),
        }} scroll={{ x: true }} loading={loading}
      />
    </>
  );
};

export default ExpertList;
