import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import deleteIcon from "../../images/icon/delete.png";
import addImg from "../../images/icon/add-link.png";
import addSkill from "../../images/icon/skill-icon.png";
import api from "../../api/experts";
import apiUpload from "../../api/upload";
import { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import { defaultURLImage } from "../../constants/api";

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
                const res = await api.getDetailExpert(id);
                if (res.data.profile_urls?.length === 0) res.data.profile_urls.push('');
                if (res.data.expertise_names?.length === 0) res.data.expertise_names.push('');
                setDetail({ ...res.data, avatar_url: res.data.avatar_url != '/images/avatar/default.jpg' ? res.data.avatar_url : '' });
            } catch (error) {
                toast.error(error.msg);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.deleteExpert(id);
            toast.success("Delete expert successfully!");
            navigate('/experts');
        } catch (error) {
            toast.error(error.msg);
        }
    }

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

    const handleUpload = async (files) => {
        setFile(files[0]);
        setDetail({ ...detail, avatar_url: URL.createObjectURL(files[0]) });
    }

    return (
        <>
            <ToastContainer />
            <Breadcrumb pageName="Chi tiết chuyên gia" prePage="Danh sách chuyên gia" preLink="/experts"/>
            <Spin tip="Đang tải..." spinning={loading}>
                
            </Spin>
           
        </>
    );
}
export default CourseDetail;