import { useEffect, useState } from 'react';
import { Drawer, Form, Button, Input, Upload, Checkbox, Image, Spin, Progress } from "antd";
// import apiUpload from '../../api/upload';
import { getImageUrl } from '../../common';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { baseURL } from '../../constants/api';

const initialValues = {
    title: '',
    file_path: '', // link file video
    is_free: 0,
    is_important: 0,
    is_featured: 0,
    description: '',
    time: '',
    img: '', // link image
};

const ModalCourseMaterial = ({ show, handleClose, handleSubmit, formData = initialValues, title }) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState(formData.img);
    const [video, setVideo] = useState(formData.file_path);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState();
    const { token } = useAuth();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(formData);
        setImage(formData.img);
        setVideo(formData.file_path);
    }, [formData]);

    const handleUpload = async (file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            // const res = await apiUpload.uploadFile(formData);
            const res = await axios.post(`${baseURL}/api/v1/admin/upload`, formData, {
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
        <Drawer
            title={title}
            open={show}
            onClose={handleClose}
            width={600}
        >
            <Form
                initialValues={formData}
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    handleSubmit(values)
                    form.resetFields();
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder='Nhập tiêu đề' />
                </Form.Item>
                <Form.Item
                    label="Miêu tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập miêu tả!' }]}
                >
                    <Input.TextArea placeholder='Nhập miêu tả' />
                </Form.Item>

                <Form.Item
                    label="Thời lượng"
                    name="time"
                    rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}
                >
                    <Input placeholder='Nhập thời lượng' />
                </Form.Item>

                <Form.Item label="Hình ảnh" name='img'>
                    <div className='flex'>
                        <Upload
                            showUploadList={false}
                            action={async (file) => {
                                const res = await handleUpload(file);
                                form.setFieldsValue({ img: res });
                                setImage(res);
                            }}
                            accept='image/*'
                        >
                            <Button className='w-40 h-40 border-dashed rounded-xl'>
                                <div className='text-center'>+ Click để tải lên <br /> hình ảnh</div>
                            </Button>
                        </Upload>
                        <div className='ml-4 h-40'>
                            {image && <Image src={getImageUrl(image)} alt="img" height={160} />}
                        </div>
                    </div>
                </Form.Item>
                
                <Form.Item label="Video" name='file_path'>
                    <div className='flex'>
                        <Upload
                            showUploadList={false}
                            beforeUpload={async (file) => {
                                const res = await handleUpload(file);
                                form.setFieldsValue({ file_path: res });
                                setVideo(res);
                            }}
                            accept='video/*'
                        >
                            <Button className='w-40 h-40 boder border-dashed rounded-xl'>
                                <div className='text-center'>+ Click để tải lên <br /> video</div>
                            </Button>
                        </Upload>
                        <div className='ml-4 h-40'>
                            {video && <video src={getImageUrl(video)} controls className="aspect-video h-40"/>}
                        </div>
                    </div>
                </Form.Item>
                {progress && loading && <Progress percent={progress} />}

                <div className='grid md:grid-cols-3 gap-4'>
                    <Form.Item name="is_free">
                        <Checkbox
                            defaultChecked={ formData.is_free === 1 }
                            onChange={(e) => form.setFieldsValue({ is_free: e.target.checked ? 1 : 0 })}
                        >
                            Miễn phí
                        </Checkbox>
                    </Form.Item>

                    <Form.Item name="is_important">
                        <Checkbox
                            defaultChecked={formData.is_important === 1}
                            onChange={(e) => form.setFieldsValue({ is_important: e.target.checked ? 1 : 0 })}
                        >
                            Quan trọng
                        </Checkbox>
                    </Form.Item>

                    <Form.Item name="is_featured">
                        <Checkbox
                            defaultChecked={formData.is_featured === 1}
                            onChange={(e) => form.setFieldsValue({ is_featured: e.target.checked ? 1 : 0 })}
                        >
                            Nổi bật
                        </Checkbox>
                    </Form.Item>
                </div>

                <Form.Item className="mt-8 flex justify-center">
                    <Button type="primary" htmlType="submit" className="w-48">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
}

export default ModalCourseMaterial;