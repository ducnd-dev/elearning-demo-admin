import { Button, Form, Image, Input, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import api from "../../api/setting";
import apiUpload from "../../api/upload";
import { getImageUrl } from "../../common";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const ListSeting = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [logoHeader, setLogoHeader] = useState();
    const [logoFooter, setLogoFooter] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const detail = await api.get(1);
                setData(detail.data);
                setLogoHeader(detail.data.logo_header);
                setLogoFooter(detail.data.logo_footer);
                form.setFieldsValue(detail.data);
            } catch (error) {
                toast.error(error.msg);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await api.update(1, values);
            toast.success('Cập nhật thành công');
        } catch (error) {
            setLoading(false);
            toast.error(error.msg);
        }
        setLoading(false);
    }

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
        <div>
            <ToastContainer />
            <Breadcrumb pageName="Danh sách cài đặt" />
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
                                <Form.Item label="Tên ngân hàng" name='bank_name'>
                                    <Input placeholder='Nhập tên ngân hàng' />
                                </Form.Item>
                                <Form.Item label="Số tài khoản ngân hàng" name='bank_account'>
                                    <Input placeholder='Nhập số tài khoản ngân hàng' />
                                </Form.Item>
                                <Form.Item label="Chủ tài khoản" name='bank_account_name'>
                                    <Input placeholder='Nhập chủ tài khoản' />
                                </Form.Item>
                                <Form.Item label="Email" name='email'>
                                    <Input placeholder='Nhập email' />
                                </Form.Item>
                                <Form.Item label="Số điện thoại" name='phone'>
                                    <Input placeholder='Nhập số điện thoại' />
                                </Form.Item>
                                <Form.Item label="Link group facebook" name='link_group_facebook'>
                                    <Input placeholder='Nhập link group facebook' />
                                </Form.Item>
                                <Form.Item label="Link facebook" name='link_facebook'>
                                    <Input placeholder='Nhập link facebook' />
                                </Form.Item>
                                <Form.Item label="Link fanpage" name='link_fanpage'>
                                    <Input placeholder='Nhập link fanpage' />
                                </Form.Item>
                                <Form.Item label="Link youtube" name='link_youtube'>
                                    <Input placeholder='Nhập link youtube' />
                                </Form.Item>
                                <Form.Item label="Giá khóa học" name='price'>
                                    <Input placeholder='Nhập giá khóa học' />
                                </Form.Item>
                                <Form.Item label="Giá giảm" name='sale_price'>
                                    <Input placeholder='Nhập giá khóa học' />
                                </Form.Item>
                            </div>
                            <Form.Item label="Địa chỉ" name='address'>
                                <Input placeholder='Nhập địa chỉ' />
                            </Form.Item>
                            <Form.Item label="Logo header" name='logo_header'>
                                <div className='flex'>
                                    <Upload
                                        showUploadList={false}
                                        action={async (file) => {
                                            const res = await handleUpload(file);
                                            form.setFieldsValue({ logo_header: res });
                                            setLogoHeader(res);
                                        }}
                                        accept='image/*'
                                    >
                                        <Button className='w-40 h-40 border-dashed rounded-xl'>
                                            <div className='text-center'>+ Click để tải lên <br /> logo header</div>
                                        </Button>
                                    </Upload>
                                    <div className='ml-8 h-40'>
                                        {logoHeader && <Image src={getImageUrl(logoHeader)} alt="img" height={100} />}
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item label="Logo footer" name='logo_footer'>
                                <div className='flex'>
                                    <Upload
                                        showUploadList={false}
                                        action={async (file) => {
                                            const res = await handleUpload(file);
                                            form.setFieldsValue({ logo_footer: res });
                                            setLogoFooter(res);
                                        }}
                                        accept='image/*'
                                    >
                                        <Button className='w-40 h-40 border-dashed rounded-xl'>
                                            <div className='text-center'>+ Click để tải lên <br /> logo footer</div>
                                        </Button>
                                    </Upload>
                                    <div className='ml-8 h-40'>
                                        {logoFooter && <Image src={getImageUrl(logoFooter)} alt="img" height={100} />}
                                    </div>
                                </div>
                            </Form.Item>
                            <Form.Item className='flex justify-center'>
                                <button className="inline-flex items-center justify-center bg-primary py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" type="submit">Cập nhật</button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
        </div>
    );
}
export default ListSeting;