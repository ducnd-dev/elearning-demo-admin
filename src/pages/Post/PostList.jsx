import React from 'react'
import { ToastContainer } from 'react-toastify'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import api from '../../api/post'
import { Button, Popconfirm, Space, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

const PostList = () => {
    const [datas, setDatas] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [filter, setFilter] = React.useState({ currentPage: 1, size: 10 })
    const navigate = useNavigate()

    React.useEffect(() => {
        setLoading(true)
        api.gets(filter).then(response => {
            setDatas(response.data)
            setLoading(false)
        })
    }, [filter])

    const columns = [
        {
            title: 'ID', dataIndex: 'id', key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Title', dataIndex: 'title', key: 'title',
            render: (text, record) => <a className='font-bold' href={`/post/${record.id}`}>{text}</a>,
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Content', dataIndex: 'content', key: 'content',
            render: (text) => text.slice(0, 50) + '...',
        },
        {
            title: 'View', dataIndex: 'views', key: 'views',
            sorter: (a, b) => a.view - b.view,
        },
        {
            title: 'Share', dataIndex: 'shares', key: 'shares',
            sorter: (a, b) => a.share - b.share,
        },
        {
            title: 'Like', dataIndex: 'likes', key: 'likes',
            sorter: (a, b) => a.like - b.like,
        },
        {
            title: 'Created at', dataIndex: 'created_at', key: 'created_at',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            render: (text) => new Date(text).toLocaleString(),
        },
        {
            title: 'Action', dataIndex: 'action', key: 'action',
            render: (id, record) => (
                <Space size="middle">
                    <Link to={`/posts/${id}`} className="text-primary">
                        <EyeOutlined />
                    </Link>
                    <Link to={`/posts/${id}`} className="text-success">
                        <EditOutlined />
                    </Link>
                    <Popconfirm
                        title="Xác nhận xóa bài viết này?"
                        description={`Bạn có chắc chắn muốn xóa bài viết: ${record.title}?`}
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
            <Breadcrumb pageName="Danh sách bài viết" />
            <div className='text-end'>
                <Button className="mb-4 bg-pink-700 text-white" onClick={() => navigate('/posts/create')}>+ Thêm mới</Button>
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
    )
}

export default PostList