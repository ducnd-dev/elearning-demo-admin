import { Button, Form, Input, Modal, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import api from '../../api/event'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const EventSetting = () => {
    const [datas, setDatas] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [filter, setFilter] = React.useState({ currentPage: 1, size: 10 })
    const [openModal, setOpenModal] = React.useState(false)
    const [form] = Form.useForm()

    React.useEffect(() => {
        setLoading(true)
        api.gets(filter).then(res => {
            setDatas(res.data)
            setLoading(false)
        })
    }, [filter])

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
        { title: 'Tên sự kiện', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title) },
        { title: 'Link', dataIndex: 'link', key: 'link', sorter: (a, b) => a.link.localeCompare(b.link), render: (text) => <a href={text} target="_blank" rel="noreferrer">{text}</a> },
        {
            title: 'Action', dataIndex: 'id', key: 'id',
            render: (id, record) => (
                <Space size="middle">
                    <Link to={`/posts/${id}`} className="text-success">
                        <EditOutlined />
                    </Link>
                    <Popconfirm
                        title="Xác nhận xóa sự kiện này?"
                        description={`Bạn có chắc chắn muốn xóa sự kiện: ${record.title}?`}
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
        <Breadcrumb pageName="Danh sách sự kiện" />
        <div className='text-end'>
            <Button className="mb-4 bg-pink-700 text-white" onClick={() => setOpenModal(true)}>+ Thêm mới</Button>
        </div>
        <Table
            columns={columns} dataSource={datas} rowKey='id'
            pagination={{
                total: datas?.total, current: filter.currentPage,
                pageSize: filter.size, showSizeChanger: false,
                onChange: (page) => setFilter({ ...filter, currentPage: page }),
            }} scroll={{ x: true }} loading={loading}
        />
        <Modal
            title="Tạo sự kiện mới"
            onOk={() => form.submit()}
            onCancel={() => setOpenModal(false)}
            open={openModal}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
                form={form}
                onFinish={(values) => {
                    api.create(values).then(() => {
                        toast.success('Thêm mới thành công');
                        setFilter({ ...filter, currentPage: 1 });
                        setOpenModal(false);
                        setFilter({ ...filter, currentPage: 1 });
                    }).catch(err => {
                        toast.error(err.msg);
                    });
                }}
            >
                <Form.Item
                    label="Tên sự kiện"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Link"
                    name="link"
                    rules={[{ required: true, message: 'Vui lòng nhập link!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>
  )
}

export default EventSetting