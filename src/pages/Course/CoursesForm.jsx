import { Button, Form, Input, Switch, Upload, Card  } from 'antd';
import React from 'react';
import deleteIcon from '../../images/icon/delete.png';
import apiUpload from '../../api/upload';
import { mediaURL } from '../../constants/api';

const courseMeaterial = {
    title: '',
    description: '',
    is_free: false,
    is_important: false,
    is_featured: false,
    img: '',
    time: '',
    file_path: '',
};

const CoursesForm = ({ detail, setDetail, handleSubmit }) => {
  const [file, setFile] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);
  const handleAddCoureMaterial = () => {
    const course_materials = [...detail.course_materials];
    course_materials.unshift(detail.id ? { ...courseMeaterial, course_id: detail.id } : courseMeaterial);
    setDetail({ ...detail, course_materials });
  };
  const handleDeleteCourseMaterial = (index) => {
    const course_materials = [...detail.course_materials];
    course_materials.splice(index, 1);
    setDetail({ ...detail, course_materials });
  };

  const handleSetValueByKey = (index, key, value) => {
    const course_materials = [...detail.course_materials];
    course_materials[index][key] = value;
    setDetail({ ...detail, course_materials });
  }

  return (
    <Form layout="vertical" initialValues={detail}>
      <Form.Item label="Tên khóa học">
        <Input
          value={detail.title}
          onChange={(e) => setDetail({ ...detail, title: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Bài">
        <Button
          type="primary"
          className="bg-primary mr-2"
          onClick={() => handleAddCoureMaterial()}
        >
          Thêm bài
        </Button>
        <Button
          type="primary"
          className="bg-primary"
          onClick={() => handleSubmit()}
        >
          Lưu
        </Button>
        {detail?.course_materials?.map((item, index) => (
          <Card  key={index} className="flex items-start gap-2 mt-2">
            <div className='grid grid-cols-3 gap-4 w-full'>
                <Form.Item label="Tên bài">
                    <Input
                        value={item.title}
                        onChange={(e) => handleSetValueByKey(index, 'title', e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Thời gian">
                    <Input
                        value={item.time}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].time = e.target.value;
                        setDetail({ ...detail, course_materials });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input.TextArea
                        value={item.description}
                        onChange={(e) => handleSetValueByKey(index, 'description', e.target.value)}
                    />
                </Form.Item>
              
                <Form.Item label="Miễn phí">
                    <Switch 
                        checked={item.is_free}
                        onChange={(e) => handleSetValueByKey(index, 'is_free', e)}
                    />
                </Form.Item>
                <Form.Item label="Quan trọng">
                    <Switch 
                        checked={item.is_important}
                        onChange={(e) => handleSetValueByKey(index, 'is_important', e)}
                    />
                </Form.Item>
                <Form.Item label="Nổi bật">
                    <Switch 
                        checked={item.is_featured}
                        onChange={(e) => handleSetValueByKey(index, 'is_featured', e)}
                    />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <Upload
                        showUploadList={false}
                        beforeUpload={async (file) => {
                          const formData = new FormData();
                          formData.append('file', file);
                          const res = await apiUpload.uploadFile(formData);
                          handleSetValueByKey(index, 'img', res.path);
                        }}

                    >
                        <img src={`${mediaURL}${item.img}`} alt="img" className="size-20 aspect-square" />
                    </Upload>
                </Form.Item>
                <Form.Item label="Video">
                   <Upload
                        showUploadList={false}
                        beforeUpload={async (file) => {
                          const formData = new FormData();
                          formData.append('file', file);
                          const res = await apiUpload.uploadFile(formData);
                          handleSetValueByKey(index, 'file_path', res.path);
                          return false;
                        }}
                    >
                        <Button >Click to Upload</Button>
                        <video src={`${mediaURL}${item.file_path}`} alt="video" className="size-50 aspect-video" />
                    </Upload>
                </Form.Item>
            </div>
            <img
              src={deleteIcon}
              alt="delete"
              className="size-5"
              onClick={() => handleDeleteCourseMaterial()}
            />
          </Card>
        ))}

      </Form.Item>
    </Form>
  );
};

export default CoursesForm;
