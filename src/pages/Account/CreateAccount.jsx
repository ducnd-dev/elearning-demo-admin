import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../api/user';
import { Form, Input, Select, Spin } from 'antd';

const CreateAccount = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const res = await api.create(values);
            if (res.code === 200) navigate('/users');
            else if (!res.success) {
                Object.keys(res.msg).forEach(key => {
                    res.msg[key].forEach(msg => {
                        toast.error(msg);
                    });
                });
            }
        } catch (error) {
            toast.error('Tạo tài khoản thất bại!');
        }
        setLoading(false);
    }

    return (
        <>
            <ToastContainer />
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Tạo mới tài khoản" prePage="Danh sách tài khoản" preLink="/accounts"/>
                <Spin tip="Đang tải..." spinning={loading}>
                    <div className='bg-white p-8'>
                        <Form 
                            layout="vertical"
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
                            {/* password */}
                            <div>
                                <Form.Item label="Mật khẩu" name='password'
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập mật khẩu!' },
                                        { min: 6, message: 'Mật khẩu phải chứa ít nhất 6 ký tự!' }
                                    ]}
                                >
                                    <Input.Password placeholder='Nhập mật khẩu' />
                                </Form.Item>
                                <Form.Item label="Nhập lại mật khẩu" name='confirm_password'
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu không khớp!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='Nhập lại mật khẩu' />
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
                                <button className="inline-flex items-center justify-center bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" type="submit">Thêm mới</button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </div>
        </>
    );
};

export default CreateAccount;