import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/user";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space, Modal, Button } from 'antd';
import { LIMIT } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined, InfoCircleOutlined, InfoOutlined } from '@ant-design/icons';
import ModalInfo from "../../components/Modals/ModalInfo";

const AccountList = () => {
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
            toast.success("Xóa tài khoản thành công!");
            setFilter({ ...filter, currentPage: 1 });
            setModalOpen(false);
        } catch (error) {
            toast.error(error.msg);
        }
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: (text) => <a onClick={() => navigate(`/users/${text}`)}>{text}</a> },
        { title: 'Họ', dataIndex: 'first_name', key: 'first_name',
            sorter: (a, b) => a.first_name?.localeCompare(b.first_name),
        },
        { title: 'Tên', dataIndex: 'last_name', key: 'last_name',
            sorter: (a, b) => a.last_name?.localeCompare(b.last_name),
        },
        { title: 'Quyền', dataIndex: 'is_admin', key: 'is_admin', sorter: (a, b) => a.is_admin.length - b.is_admin.length, sortDirections: ['descend', 'ascend'],
            render: (text) => text ? 'Admin' : 'Người dùng'
        },
        { title: 'Ngày sinh', dataIndex: 'date_of_birth', key: 'date_of_birth',
            sorter: (a, b) => a.date_of_birth?.localeCompare(b.date_of_birth),
        },
        { title: 'Email', dataIndex: 'email', key: 'email',
            sorter: (a, b) => a.email?.localeCompare(b.email),
        },
        { title: 'Số điện thoại', dataIndex: 'phone_number', key: 'phone_number',
            sorter: (a, b) => a.phone_number?.localeCompare(b.phone_number),
        },
        {
            title: 'Hành động',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <InfoCircleOutlined className="text-primary" onClick={() => {
                        setSelected({
                            'Họ': record.first_name,
                            'Tên': record.last_name,
                            'Email': record.email,
                            'Số điện thoại': record.phone_number,
                            'Ngày sinh': record.date_of_birth,
                            'Quyền': record.is_admin ? 'Admin' : 'Người dùng',
                            'Giới tính': record.gender === 'Male' ? 'Nam' : record.gender === 'Female' ? 'Nữ' : 'Khác',
                            'Chuyên ngành': record.specialization,
                            'Kinh nghiệm': record.years_of_experience,
                            'Mô tả sự nghiệp': record.career_description,
                            'Địa chỉ hiện tại': record.current_address,
                            'Chủ tài khoản': record.account_holder,
                            'Ngân hàng': record.bank,
                            'Số tài khoản': record.account_number,
                            'Là admin': record.is_admin ? 'Có' : 'Không',
                        });
                        setShowModalInfo(true);
                    }} />
                    <Link to={`/users/${text}`} className="text-success">
                        <EditOutlined />
                    </Link>
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
            <Breadcrumb pageName="Danh sách tài khoản" />
            <CommonFilter filter={filter} setFilter={setFilter} sortBy={null} />
            <div className="flex justify-end">
                <Button className="mb-4 bg-pink-700 text-white" onClick={() => navigate('/users/create')}>+ Thêm mới</Button>
            </div>
            <Table
                columns={columns} dataSource={datas?.items} rowKey='id'
                pagination={{
                    total: datas?.pagination?.total, current: filter.currentPage,
                    pageSize: filter.size, showSizeChanger: false,
                    onChange: (page) => setFilter({ ...filter, currentPage: page }),
                }} scroll={{ x: true }} loading={loading}
            />
            <Modal
                title="Xác nhận xóa tài khoản"
                centered
                open={modalOpen}
                onOk={() => setModalOpen(false)}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <p className="pt-4 pb-12">Bạn có chắc chắn muốn xóa tài khoản: <b>{selected?.email}</b>?</p>
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
            <ModalInfo openModal={showModalInfo} setOpenModal={setShowModalInfo} selectedRow={selected} title="Thông tin tài khoản" />

        </>
    );
};

export default AccountList;