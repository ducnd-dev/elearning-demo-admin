import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../api/user';
import { Form, Input, Select, Spin } from 'antd';

const AccountDetail = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const detail = await api.get(id);
                setData(detail.data);
                form.setFieldsValue(detail.data);
            } catch (error) {
                toast.error(error.msg);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await api.update(id, values);
            toast.success('Cập nhật tài khoản thành công!');
        } catch (error) {
            toast.error(error.msg);
        }
        setLoading(false);
    }


    return (
        <>
            <ToastContainer />
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Chi tiết tài khoản" prePage="Danh sách tài khoản" preLink="/accounts"/>
                <Spin tip="Đang tải..." spinning={loading}>
                    <div className='bg-white p-8'>
                        <Form 
                            layout="vertical"
                            initialValues={data}
                            form={form}
                            onFinish={(values) => {
                                handleSubmit(values);
                            }}
                        >
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Họ" name='first_name'
                                    rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
                                >
                                    <Input placeholder='Nhập họ' />
                                </Form.Item>
                                <Form.Item label="Tên" name='last_name'
                                    rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                                >
                                    <Input placeholder='Nhập tên' />
                                </Form.Item>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Email" name='email'
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input placeholder='Nhập email' />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name='phone_number'
                                    rules={[{ pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' }]}
                                >
                                    <Input placeholder='Nhập số điện thoại' />
                                </Form.Item>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Ngày sinh" name='date_of_birth'>
                                    <Input type='date' />
                                </Form.Item>
                                <Form.Item label="Quyền" name='is_admin'>
                                    <Select>
                                        <Select.Option value={1}>Admin</Select.Option>
                                        <Select.Option value={0}>Người dùng</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Chuyên ngành" name='specialization'>
                                    <Input placeholder='Nhập chuyên ngành' />
                                </Form.Item>
                                <Form.Item label="Số năm kinh nghiệm" name='years_of_experience'
                                    rules={[{ pattern: /^[0-9]+$/, message: 'Số năm kinh nghiệm không hợp lệ!' }]}
                                >
                                    <Input placeholder='Nhập số năm kinh nghiệm' type='number' />
                                </Form.Item>
                            </div>
                            <Form.Item label="Mô tả sự nghiệp" name='career_description'>
                                <Input.TextArea placeholder='Nhập mô tả sự nghiệp' />
                            </Form.Item>
                            <Form.Item label="Địa chỉ hiện tại" name='current_address'>
                                <Input placeholder='Nhập địa chỉ hiện tại' />
                            </Form.Item>
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Chủ tài khoản" name='account_holder'>
                                    <Input placeholder='Nhập chủ tài khoản' />
                                </Form.Item>
                                <Form.Item label="Ngân hàng" name='bank'>
                                    <Input placeholder='Nhập ngân hàng' />
                                </Form.Item>
                            </div>
                            <div className='grid md:grid-cols-2 md:gap-4'>
                                <Form.Item label="Số tài khoản" name='account_number'>
                                    <Input placeholder='Nhập số tài khoản' />
                                </Form.Item>
                                <Form.Item label="Giới tính" name='gender'>
                                    <Select>
                                        <Select.Option value='Male'> Nam </Select.Option>
                                        <Select.Option value='Female'> Nữ </Select.Option>
                                        <Select.Option value='Other'> Khác </Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <Form.Item className='flex justify-center'>
                                <button className="inline-flex items-center justify-center bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" type="submit">Cập nhật</button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </div>
        </>
    );
};

export default AccountDetail;