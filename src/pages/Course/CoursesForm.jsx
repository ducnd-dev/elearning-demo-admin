import { Button, Form, Input, Switch, Upload, Card  } from 'antd';
import React from 'react';
import deleteIcon from '../../images/icon/delete.png';
const courseMeaterial = {
    title: '',
    descriptions: '',
    is_free: false,
    is_important: false,
    is_featured: false,
    img: '',
    time: '',
    video: '',
};

const CoursesForm = ({ detail, setDetail, handleSubmit }) => {
  const handleAddCoureMaterial = () => {
    const course_materials = [...detail.course_materials];
    course_materials.push(courseMeaterial);
    setDetail({ ...detail, course_materials });
  };
  const handleDeleteCourseMaterial = (index) => {
    const course_materials = [...detail.course_materials];
    course_materials.splice(index, 1);
    setDetail({ ...detail, course_materials });
  };

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
          className="bg-primary"
          onClick={() => handleAddCoureMaterial()}
          classNames="mr-2"
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
            <div className='grid grid-cols-3 gap-4'>
                <Form.Item label="Tên bài">
                    <Input
                        value={item.title}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].title = e.target.value;
                        setDetail({ ...detail, course_materials });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Mô tả">
                    <Input
                        value={item.descriptions}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].descriptions = e.target.value;
                        setDetail({ ...detail, course_materials });
                        }}
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
                <Form.Item label="Miễn phí">
                    <Switch 
                        checked={item.is_free}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].is_free = e;
                        setDetail({ ...detail, course_materials });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Quan trọng">
                    <Switch 
                        checked={item.is_important}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].is_important = e;
                        setDetail({ ...detail, course_materials });
                        }}
                    />
                </Form.Item>
                <Form.Item label="Nổi bật">
                    <Switch 
                        checked={item.is_featured}
                        onChange={(e) => {
                        const course_materials = [...detail.course_materials];
                        course_materials[index].is_featured = e;
                        setDetail({ ...detail, course_materials });
                        }}
                    />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <Upload
                        showUploadList={false}
                        beforeUpload={(file) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const course_materials = [...detail.course_materials];
                            course_materials[index].img = e.target.result;
                            setDetail({ ...detail, course_materials });
                        };
                        reader.readAsDataURL(file);
                        return false;
                        }}
                    >
                        <img src={item.img} alt="img" className="size-20" />
                    </Upload>
                </Form.Item>
                <Form.Item label="Video">
                   <Upload
                        className='border border-stroke'
                        showUploadList={false}
                        beforeUpload={(file) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const course_materials = [...detail.course_materials];
                            course_materials[index].video = e.target.result;
                            setDetail({ ...detail, course_materials });
                        };
                        reader.readAsDataURL(file);
                        return false;
                        }}
                    >
                        <Button >Click to Upload</Button>
                        <video src={item.video} alt="video" className="size-20" />
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
