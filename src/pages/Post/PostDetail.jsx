import { Button, Form, Input, Progress, Spin, Upload } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import api from '../../api/post'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
// import ReactRichEditor from 'react-rich-text-editor'

const PostDetail = () => {
    const { id } = useParams();
    const [form] = Form.useForm()
    const [loading, setLoading] = React.useState(false)
    const [image, setImage] = React.useState('')
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await api.get(id)
                form.setFieldsValue(res.data)
            } catch (error) {
                toast.error(error.msg)
            } finally {
                setLoading(false)
            }
        }

        if (id && id !== 'create') {
            fetchData()
        }

    }, [id])

    const onFinish = async (values) => {
        try {
            if (id === 'create') {
                await api.create(values)
            } else {
                await api.update(id, values)
            }
            toast.success('Thành công')
            navigate('/post')
        } catch (error) {
            toast.error(error.msg)
        }
    }

    const handleUpload = async (file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await axios.post(`${baseURL}/v1/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token?.replace(/['"]+/g, '')}`
                },
                onUploadProgress: (progressEvent) => {
                    setProgress(Math.round(progressEvent.loaded * 100 / progressEvent.total) - 1);
                }
            });
            return res.data.path;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setProgress(0);
        }
    }

    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Chi tiết bài viết" prePage="Danh sách bài viết" preLink="/posts" />
            <Spin spinning={loading}>
                <div className="xl:w-2/3 bg-white p-6">
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            label='Title'
                            name='title'
                            rules={[{ required: true, message: 'Please input title!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Hình ảnh" name='image'>
                            <div className='flex'>
                                <Upload
                                    showUploadList={false}
                                    action={async (file) => {
                                        const res = await handleUpload(file);
                                        form.setFieldsValue({ image: res });
                                        setImage(res);
                                    }}
                                    accept='image/*'
                                >
                                    <Button className='w-40 h-40 border-dashed rounded-xl'>
                                        <div className='text-center'>+ Click để tải lên <br /> hình ảnh</div>
                                    </Button>
                                </Upload>
                                <div className='ml-4 h-40'>
                                    {image && <Image src={getImageUrl(image)} alt="image" height={160} />}
                                </div>
                            </div>
                            {progress > 0 && loading && <Progress percent={progress} />}
                        </Form.Item>

                        <Form.Item
                            label='Content'
                            name='content'
                            rules={[{ required: true, message: 'Please input content!' }]}
                        >
                            {/* <ReactRichEditor height={400}
                                showAll={true}
                                onCodeChange={(value) => form.setFieldsValue({ content: value })}
                            /> */}
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </>
    )
}

export default PostDetail