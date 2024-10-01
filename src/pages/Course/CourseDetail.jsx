import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import deleteIcon from "../../images/icon/delete.png";
import addImg from "../../images/icon/add-link.png";
import addSkill from "../../images/icon/skill-icon.png";
import api from "../../api/courses";
import apiUpload from "../../api/upload";
import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
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
                console.log(res);
                
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
            if(!detail.name) {
                toast.error('Vui lòng nhập tên chuyên gia');
                return;
            }

            if(!detail.user_id) {
                toast.error('Vui lòng nhập user_id');
                return;
            }

            if(!detail.organisation_name) {
                toast.error('Vui lòng nhập tổ chức');
                return;
            }

            if(!detail.email) {
                toast.error('Vui lòng nhập email');
                return;
            }
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                const res = await apiUpload.uploadImage(formData);
                setDetail({ ...detail, avatar_url: res.img });
                await api.updateExpert(id, { ...detail, avatar_url: res.img });
            } else {
                await api.updateExpert(id, {...detail, img: ""});
            }
            toast.success("Update expert successfully!");
        } catch (error) {
            toast.error(error.msg);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Chi tiết chuyên gia" prePage="Danh sách chuyên gia" preLink="/experts"/>
            <Spin tip="Đang tải..." spinning={loading}>
            <CoursesForm
                detail={detail} 
                setDetail={setDetail} 
                handleCreate={handleUpdate}
            />
            </Spin>
           
        </>
    );
}
export default CourseDetail;