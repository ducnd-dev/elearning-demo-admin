import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import api from "../../api/courses";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { defaultURLImage } from "../../constants/api";
import CoursesForm from "./CoursesForm";

const CourseDetail = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await api.get(id);
                setDetail(res);
            } catch (error) {
                toast.error(error.msg);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            
            setLoading(true);
            await api.update(id,{ ...detail});
            toast.success("Update expert successfully!");
            navigate('/courses');

        } catch (error) {
            toast.error(error.msg);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Chi tiết khóa học" prePage="Danh sách khóa học" preLink="/courses"/>
            <Spin tip="Đang tải..." spinning={loading}>
            <CoursesForm
                detail={detail}
                setDetail={setDetail}
                handleSubmit={handleUpdate}
            />
            </Spin>

        </>
    );
}
export default CourseDetail;
