import { useEffect } from 'react';
import { Drawer, Form, Button, Input, Upload, Checkbox, Image } from "antd";
import apiUpload from '../../api/upload';
import { getImageUrl } from '../../common';

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
    console.log(formData);

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(formData);
    }, [formData]);

    const handleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await apiUpload.uploadFile(formData);
            return res.path;
        } catch (error) {
            console.log(error);
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
                    <Upload
                        showUploadList={false}
                        action={async (file) => {
                            const res = await handleUpload(file);
                            form.setFieldsValue({ img: res });
                        }}
                    >
                        <div className='flex'>
                            <Button className='w-40 h-40 border-dashed rounded-xl'>
                                <div className='text-center'>+ Click để tải lên <br /> hình ảnh</div>
                            </Button>
                            {/* <div className='ml-4 h-40'>
                                {form.getFieldValue('img') && <Image src={getImageUrl(form.getFieldValue('img'))} alt="img" height={160}/>}
                            </div> */}
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Video">
                    <Upload
                        showUploadList={false}
                        beforeUpload={async (file) => {
                            const res = await handleUpload(file);
                            form.setFieldsValue({ file_path: res });
                        }}
                    >
                        <div className='flex'>
                            <Button className='w-40 h-40 boder border-dashed rounded-xl'>
                                <div className='text-center'>+ Click để tải lên <br /> video</div>
                            </Button>
                            {/* <div className='ml-4'>
                                {form.getFieldValue('file_path') && <video src={getImageUrl(form.getFieldValue('file_path'))} controls className="aspect-video" height={160}/>}
                            </div> */}
                        </div>
                    </Upload>

                </Form.Item>

                <div className='grid md:grid-cols-3 gap-4'>
                    <Form.Item name="is_free">
                        <Checkbox
                            checked={form.getFieldValue('is_free') === 1}
                            onChange={(e) => form.setFieldsValue({ is_free: e.target.checked ? 1 : 0 })}
                        >
                            Miễn phí
                        </Checkbox>
                    </Form.Item>

                    <Form.Item name="is_important">
                        <Checkbox
                            checked={form.getFieldValue('is_important') === 1}
                            onChange={(e) => form.setFieldsValue({ is_important: e.target.checked ? 1 : 0 })}
                        >
                            Quan trọng
                        </Checkbox>
                    </Form.Item>

                    <Form.Item name="is_featured">
                        <Checkbox
                            checked={form.getFieldValue('is_featured') === 1}
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