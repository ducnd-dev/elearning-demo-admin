import { toast, ToastContainer } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { Button, Form, Input, Modal, Popconfirm, Spin, Steps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import api from "../../api/categories";
import apiCourse from "../../api/courses";
import apiMaterial from "../../api/course_materials";
import { useNavigate, useParams } from "react-router-dom";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { defaultURLImage } from "../../constants/api";
import ModalCourseMaterial from "./ModalCourseMaterial";

const CategoriesDetail = () => {
    const [loading, setLoading] = useState(false);
    const [detail, setDetail] = useState({});
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openMoalCreate, setOpenMoalCreate] = useState(false);
    const [openModalMaterial, setOpenModalMaterial] = useState(false);
    const [openEditMaterial, setOpenEditMaterial] = useState(false);
    const [itemSelected, setItemSelected] = useState({});
    const { id } = useParams();
    const [form] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [formCouses] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await api.get(id);
            setDetail(res.data);
            form.setFieldsValue(res.data);
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Chi tiết khóa học" prePage="Danh sách khóa học" preLink="/categories" />
            <Spin tip="Đang tải..." spinning={loading}>
                <div className="xl:w-2/3 bg-white p-6">
                    <Form form={form} name="form_in_modal"
                        onFinish={
                            async (values) => {
                                try {
                                    setLoading(true);
                                    await api.update(id, values);
                                    toast.success("Cập nhật thành công!");
                                    navigate('/categories');
                                } catch (error) {
                                    toast.error(error.msg);
                                } finally {
                                    setLoading(false)
                                }
                            }
                        }
                        layout="vertical"
                    >
                        <Form.Item
                            name="name"
                            label="Tên khóa học"
                            rules={[{ required: true, message: 'Please input the title of collection!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="xl:w-2/3 bg-white p-6 mt-6">
                    <div className="font-bold text-blue-700">Danh sách các bài học</div>
                    <Steps
                        progressDot
                        direction="vertical"
                        current={1}
                        items={detail?.courses?.map((course, index) => ({
                            title: <div className="font-bold text-black2">
                                Phần {index + 1}: {course.title}
                                <Tooltip title="Chỉnh sửa tên phần">
                                    <EditOutlined className="ml-2 text-blue-500"
                                        onClick={() => {
                                            setItemSelected(course);
                                            setOpenModalUpdate(true);
                                            formUpdate.setFieldsValue({ title: course.title });
                                        }}
                                    />
                                </Tooltip>
                                <Tooltip title="Thêm mới bài học">
                                    <AppstoreAddOutlined className="ml-2 text-green-500 cursor-pointer" onClick={() => {
                                        setItemSelected(course);
                                        setOpenModalMaterial(true);
                                    }} />
                                </Tooltip>
                                <Tooltip title="Xóa phần">
                                    <Popconfirm
                                        title="Xác nhận xóa?"
                                        description={`Bạn có chắc chắn muốn xóa phần: ${course.title}?`}
                                        onConfirm={async () => {
                                            try {
                                                setLoading(true);
                                                await apiCourse.delete(course.id);
                                                toast.success("Xóa thành công");
                                                fetchData();
                                                setLoading(false);
                                            }
                                            catch (error) {
                                                toast.error(error.msg);
                                            }
                                        }}
                                        okText="Xác nhận"
                                        cancelText="Hủy"
                                    >
                                        <DeleteOutlined className="ml-2 text-red-500 cursor-pointer" />
                                    </Popconfirm>
                                </Tooltip>
                            </div>,
                            description: <div>
                                {course.course_materials?.map((material) => (
                                    <div key={material.id} className="flex my-2">
                                        <img src={material?.img ? material?.img : defaultURLImage} className="w-24 mr-2" alt="" />
                                        <div className="text-black">
                                            <div>
                                                {material.title}
                                                <Tooltip title="Chỉnh sửa video">
                                                    <EditOutlined className="ml-2 text-blue-500 cursor-pointer" onClick={
                                                        () => {
                                                            setItemSelected(material);
                                                            setOpenEditMaterial(true);
                                                        }
                                                    }/>
                                                </Tooltip>

                                                <Popconfirm
                                                    title="Xác nhận xóa?"
                                                    description={`Bạn có chắc chắn muốn xóa video: ${material.title}?`}
                                                    onConfirm={async () => {
                                                        try {
                                                            setLoading(true);
                                                            await apiMaterial.deleteMaterial(material.id);
                                                            toast.success("Xóa thành công");
                                                            fetchData();
                                                            setLoading(false);
                                                        }
                                                        catch (error) {
                                                            toast.error(error.msg);
                                                        }
                                                    }}
                                                    okText="Xác nhận"
                                                    cancelText="Hủy"
                                                >
                                                    <Tooltip title="Xóa video">
                                                        <DeleteOutlined className="ml-2 text-red-500 cursor-pointer" />
                                                    </Tooltip>
                                                </Popconfirm>
                                            </div>
                                            <div className="flex">
                                                {material?.is_free ? <div className="bg-green-700 text-white px-2 mt-1 rounded w-min">
                                                    FREE
                                                </div> :
                                                    <div className="bg-red-700 text-white px-2 mt-1 rounded w-min">
                                                        PRO
                                                    </div>
                                                }
                                                {material?.is_featured ? <div className="bg-blue-700 text-white px-2 mt-1 rounded w-min ml-1">
                                                    FEATURED
                                                </div> : ''}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        })) || []}
                    />
                    <div>
                        <Button type="primary" className="ml-6"
                            onClick={() => {
                                setOpenMoalCreate(true);
                            }}
                        >+ Thêm phần</Button>
                        <Modal title="Thêm phần" open={openMoalCreate} onCancel={() => setOpenMoalCreate(false)}
                            onOk={() => {
                                formCouses.submit();
                                setOpenMoalCreate(false);
                            }}
                            confirmLoading={loading}
                            centered
                            okText="Thêm"
                            cancelText="Hủy"
                        >
                            <div className="my-4">
                                <Form
                                    form={formCouses}
                                    name="form_in_modal"
                                    onFinish={
                                        async (values) => {
                                            try {
                                                setLoading(true);
                                                await apiCourse.create({ ...values, category_id: id });
                                                toast.success("Thêm thành công!");
                                                fetchData();
                                                setOpenMoalCreate(false);
                                            } catch (error) {
                                                toast.error(error.msg);
                                            } finally {
                                                setLoading(false)
                                            }
                                        }
                                    }
                                    layout="vertical"
                                >
                                    <Form.Item
                                        name="title"
                                        label="Tên phần"
                                        rules={[{ required: true, message: 'Please input the title of collection!' }]}
                                    >
                                        <Input.TextArea />
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                </div>
                <Modal title="Cập nhật khóa học" open={openModalUpdate} onCancel={() => setOpenModalUpdate(false)}
                    onOk={() => {
                        formUpdate.submit();
                        setOpenMoalCreate(false);
                    }}
                    confirmLoading={loading}
                    centered
                    okText="Cập nhật"
                    cancelText="Hủy"
                >
                    <div className="my-4">
                        <Form
                            form={formUpdate}
                            name="form_in_modal"
                            onFinish={
                                async (values) => {
                                    try {
                                        setLoading(true);
                                        await apiCourse.update(itemSelected.id, values);
                                        toast.success("Update successfully!");
                                        fetchData();
                                        setOpenModalUpdate(false);
                                    } catch (error) {
                                        toast.error(error.msg);
                                    } finally {
                                        setLoading(false)
                                    }
                                }
                            }
                            layout="vertical"
                        >
                            <Form.Item
                                name="title"
                                label="Tên phần"
                                rules={[{ required: true, message: 'Please input the title of collection!' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

                <ModalCourseMaterial show={openModalMaterial} handleClose={() => setOpenModalMaterial(false)} title="Thêm mới bài học" handleSubmit={async (values) => {
                    try {
                        setLoading(true);
                        await apiMaterial.create({ ...values, course_id: itemSelected.id });
                        toast.success("Thêm thành công!");
                        fetchData();
                        setOpenModalMaterial(false);
                    } catch (error) {
                        toast.error(error.msg);
                    } finally {
                        setLoading(false)
                    }
                }}/>

                <ModalCourseMaterial show={openEditMaterial} handleClose={() => setOpenEditMaterial(false)} formData={itemSelected} title="Chỉnh sửa bài học" handleSubmit={async (values) => {
                    try {
                        setLoading(true);
                        await apiMaterial.update(itemSelected.id, values);
                        toast.success("Chỉnh sửa thành công!");
                        fetchData();
                        setOpenEditMaterial(false);
                    } catch (error) {
                        toast.error(error.msg);
                    } finally {
                        setLoading(false)
                    }
                }}/>
            </Spin>
        </>
    );
}
export default CategoriesDetail;