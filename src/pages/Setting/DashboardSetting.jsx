import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { ToastContainer } from 'react-toastify'
import { EditOutlined } from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'

const DashboardSetting = () => {
    const { token } = useAuth();
  return (
    <div>
        <ToastContainer />
        <Breadcrumb pageName="Cài đặt trang chủ" />
        <div>
            <div className='text-lg text-black font-semibold bg-white mb-3 shadow-1 flex justify-between items-center p-3'>
                Preview
                <div className='text-end'>
                    <a className="mb-4 px-3 py-2 rounded-md bg-pink-700 text-white" href={`https://builderjs.cuongdesign.net/design.php?id=ColleagueCourses&type=default&token=${token}`} target="_blank" rel="noreferrer">
                        <EditOutlined className="mr-2" />
                        Truy cập trang builder
                    </a>
                </div>
            </div>
            <iframe id='iframe-home' src="https://builderjs.cuongdesign.net/templates/default/ColleagueCourses" style={{ width: '100%', height: '75vh', border: 'none', overflow: 'hidden' }}></iframe>
        </div>
    </div>
  )
}

export default DashboardSetting