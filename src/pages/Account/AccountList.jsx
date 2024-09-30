import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CommonFilter from "../../components/CommonFilter";
import api from "../../api/account";
import { toast, ToastContainer } from "react-toastify";
import { Table, Space, Modal } from 'antd';
import { LIMIT } from "../../constants/api";
import { useNavigate } from "react-router-dom";

const AccountList = () => {
    const [datas, setDatas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
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
                  const res = await api.getAccounts(filter);
                setDatas(res);
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
            await api.deleteAccount(id);
            toast.success("Xóa tài khoản thành công!");
            setFilter({ ...filter, currentPage: 1 });
            setModalOpen(false);
        } catch (error) {
            toast.error(error.msg);
        }
    }

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', render: (text) => <a onClick={() => navigate(`/accounts/${text}`)}>{text}</a> },
        { title: 'Tên', dataIndex: 'username', key: 'username' },
        { title: 'Quyền', dataIndex: 'role', key: 'role', sorter: (a, b) => a.name.length - b.name.length, sortDirections: ['descend', 'ascend'] },
        {
            title: 'Hành động',
            key: 'id',
            dataIndex: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <button className="inline-flex items-center justify-center bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={() => navigate(`/accounts/${text}`)}>Xem</button>
                    <button className="inline-flex items-center justify-center bg-red-200 py-2 px-10 text-center font-medium text-red-700 hover:bg-opacity-90 lg:px-8 xl:px-10"
                        onClick={() => {
                            setModalOpen(true);
                            setSelected(record);
                        }}>Xóa</button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Danh sách tài khoản" />
            <CommonFilter filter={filter} setFilter={setFilter} sortBy={null} />
            <Table
                columns={columns} dataSource={datas?.data} rowKey='id'
                pagination={{
                    total: datas?.total, current: filter.currentPage,
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
                <p className="pt-4 pb-12">Bạn có chắc chắn muốn xóa tài khoản: <b>{selected?.username}</b>?</p>
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
        </>
    );
};

export default AccountList;