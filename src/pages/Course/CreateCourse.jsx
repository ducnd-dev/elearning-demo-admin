import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import api from '../../api/courses';
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
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      setLoading(true);
      // const course_materials = await Promise.all(
      //   detail.course_materials.map(async (item) => {
      //     if (item.img_file) {
      //       const formData = new FormData();
      //       formData.append('file', item.img_file);
      //       const res = await apiUpload.uploadFile(formData);
      //       return { ...item, img: res.data.path };
      //     }
      //     if (item.video_file) {
      //       const formData = new FormData();
      //       formData.append('file', item.video_file);
      //       const res = await apiUpload.uploadFile(formData);
      //       return { ...item, file_path: res.data.path };
      //     }
      //     return item;
      //   })
      // );
      // setDetail({ ...detail, course_materials: course_materials });
      await api.create({ ...detail});
      navigate('/courses');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
            handleSubmit={handleCreate}
        />
      </Spin>
    </>
  );
};
export default CreateCourse;
