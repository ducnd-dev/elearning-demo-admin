import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/order";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space, Modal, Button } from 'antd';
import { LIMIT } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ModalInfo from "../../components/Modals/ModalInfo";
import { render } from "react-dom";

const OrderList = () => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [showModalInfo, setShowModalInfo] = useState(false);
    const [selected, setSelected] = useState({});
    const [filter, setFilter] = useState({
        search: "",
        currentPage: 1,
        size: LIMIT
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.gets();
                setDatas(res.data);
            } catch (error) {
                toast.error(error.msg);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [filter]);

    const handleDelete = async (id) => {
        try {
            await api.delete(id);
            toast.success("Xóa đơn hàng thành công!");
            setFilter({ ...filter, currentPage: 1 });
            setModalOpen(false);
        } catch (error) {
            toast.error(error.msg);
        }
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: (text) => <a onClick={() => navigate(`/users/${text}`)}>{text}</a> },
        { title: 'Mã đơn hàng', dataIndex: 'order_code', key: 'order_code',
            sorter: (a, b) => a.order_code?.localeCompare(b.order_code),
        },
        { title: 'Tên người dùng', dataIndex: 'first_name', key: 'first_name',
            sorter: (a, b) => a.first_name?.localeCompare(b.first_name),
            render: (text, record) => <a className="text-blue-500" onClick={() => navigate(`/users/${record.user_id}`)}>{`${record.user?.first_name} ${record.user?.last_name}`}</a>
        },
        { title: 'Giá', dataIndex: 'price', key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (text) => Number(text)?.toFixed(0)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
        },
        { title: 'Phương thức thanh toán', dataIndex: 'payment_method', key: 'payment_method',
            sorter: (a, b) => a.payment_method?.localeCompare(b.payment_method),
            render: (text) => text === 1 ? <p className="bg-blue-200 text-blue-600 w-28 text-center rounded-md">Chuyển khoản</p> : <p className="bg-green-200 text-green-600 w-36 text-center rounded-md">Thanh toán tiền mặt</p>,
            filters: [
                { text: 'Chuyển khoản', value: 1 },
                { text: 'Thanh toán tiền mặt', value: 2 },
            ],
            onFilter: (value, record) => record.payment_method === value,
        },
        {
            title: 'Ngày tạo', dataIndex: 'created_at', key: 'created_at',
            sorter: (a, b) => a.created_at?.localeCompare(b.created_at),
            render: (text) => new Date(text).toLocaleDateString('vi-VN')
        },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status',
            sorter: (a, b) => a.status - b.status,
            filters: [
                { text: 'Chờ xác nhận', value: 1 },
                { text: 'Đang xử lý', value: 2 },
                { text: 'Đã thanh toán', value: 3 },
                { text: 'Từ chối', value: 4 },
            ],
            onFilter: (value, record) => record.status === value,
            render: (text) => {
                if (text === 1) {
                    return <div className="bg-yellow-200 text-yellow-600 w-28 text-center rounded-md">Chờ xác nhận</div>;
                } else if (text === 2) {
                    return <div className="bg-blue-200 text-blue-600 w-28 text-center rounded-md">Đang xử lý</div>;
                } else if (text === 3) {
                    return <div className="bg-green-200 text-green-600 w-28 text-center rounded-md">Đã thanh toán</div>;
                } else {
                    return <div className="bg-red-200 text-red-600 w-28 text-center rounded-md">Từ chối</div>;
                }
            }
        },
        {
            title: 'Hành động',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <InfoCircleOutlined className="text-primary" onClick={() => {
                        setSelected({
                            'Mã đơn hàng': record.order_code,
                            'Họ': `${record.user?.first_name} ${record.user?.last_name}`,
                            'Giá': Number(record.price)?.toFixed(0)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                            'Phương thức thanh toán': record.payment_method === 1 ? 'Chuyển khoản' : 'Thanh toán tiền mặt',
                            'Trạng thái': record.status === 1 ? 'Chờ xác nhận' : record.status === 2 ? 'Đang xử lý' : record.status === 3 ? 'Đã thanh toán' : 'Từ chối',
                        });
                        setShowModalInfo(true);
                    }} />
                    <DeleteOutlined className="text-red-700" onClick={() => {
                        setSelected(record);
                        setModalOpen(true);
                    }} />
                </Space>
            ),
        },
    ];
    
    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Danh sách đơn hàng" />
            <CommonFilter filter={filter} setFilter={setFilter} sortBy={null} />
            <div className="flex justify-end">
                <Button className="mb-4 bg-pink-700 text-white" onClick={() => navigate('/users/create')}>+ Thêm mới</Button>
            </div>
            <Table
                columns={columns} dataSource={datas} rowKey='id'
                pagination={{
                    total: datas?.pagination?.total, current: filter.currentPage,
                    pageSize: filter.size, showSizeChanger: false,
                    onChange: (page) => setFilter({ ...filter, currentPage: page }),
                }} scroll={{ x: true }} loading={loading}
            />
            <Modal
                title="Xác nhận xóa đơn hàng"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <p className="pt-4 pb-12">Bạn có chắc chắn muốn xóa đơn hàng: <b>{selected?.order_code}</b>?</p>
                <div className="flex justify-end gap-4.5">
                    <button
                        className="flex justify-center rounded bg-red-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                        onClick={() => handleDelete(selected?.id)}
                    >
                        Xóa
                    </button>
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        onClick={() => setModalOpen(false)}
                    >
                        Hủy
                    </button>
                </div>
            </Modal>
            <ModalInfo openModal={showModalInfo} setOpenModal={setShowModalInfo} selectedRow={selected} title="Thông tin đơn hàng" />

        </>
    );
};

export default OrderList;