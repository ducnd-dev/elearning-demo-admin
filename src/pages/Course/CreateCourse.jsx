import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import api from '../../api/experts';
import apiUpload from '../../api/upload';
import { useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import addImg from '../../images/icon/add-link.png';
import addSkill from '../../images/icon/skill-icon.png';
import CoursesForm from './CoursesForm';

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({
    title: '',
    course_materials: [],
  });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      setLoading(true);
      if (!detail.name) {
        toast.error('Vui lòng nhập tên chuyên gia');
        return;
      }

      if (!detail.user_id) {
        toast.error('Vui lòng nhập user_id');
        return;
      }

      if (!detail.organisation_name) {
        toast.error('Vui lòng nhập tổ chức');
        return;
      }

      if (!detail.email) {
        toast.error('Vui lòng nhập email');
        return;
      }
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await apiUpload.uploadImage(formData);
        setDetail({ ...detail, avatar_url: res.img });
        await api.createExpert({ ...detail, avatar_url: res.img });
      } else {
        await api.createExpert({ ...detail, img: '' });
      }
      navigate('/experts');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (files) => {
    setDetail({ ...detail, avatar_url: URL.createObjectURL(files[0]) });
    setFile(files[0]);
  };
    
  return (
    <>
      <ToastContainer />
      <Breadcrumb
        pageName="Tạo mới khóa học"
        prePage="Danh sách chuyên gia"
        preLink="/experts"
      />
      <Spin tip="Đang tải..." spinning={loading}>
        <CoursesForm 
            detail={detail} 
            setDetail={setDetail} 
            handleCreate={handleCreate}
        />
      </Spin>
    </>
  );
};
export default CreateCourse;
