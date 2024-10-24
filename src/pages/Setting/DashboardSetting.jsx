import React from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { ToastContainer } from 'react-toastify'
import { EditOutlined } from '@ant-design/icons'
import { useAuth } from '../../hooks/useAuth'
import { Tabs } from 'antd'
const PAGES = [
    { title: 'Trang chủ', key: 'home', href: "https://builderjs.cuongdesign.net/design.php?id=ColleagueCourses&type=default&token=", src: 'https://builderjs.cuongdesign.net/templates/default/ColleagueCourses' },
    { title: 'Nâng cấp', key: 'upgrade', href: "https://builderjs.cuongdesign.net/design.php?id=ColleagueCourses-upgrade&type=default&token=", src: 'https://builderjs.cuongdesign.net/templates/default/ColleagueCourses-upgrade' },

]
const tabItem = (item, token) => (<div>
    <div className='text-lg text-black font-semibold bg-white mb-3 shadow-1 flex justify-between items-center p-3'>
        Preview
        <div className='text-end'>
            <a className="mb-4 px-3 py-2 rounded-md bg-pink-700 text-white" href={`${item.href}${token}`} target="_blank" rel="noreferrer">
                <EditOutlined className="mr-2" />
                Truy cập trang builder
            </a>
        </div>
    </div>
    <iframe id='iframe-home' src={item.src} style={{ width: '100%', height: '75vh', border: 'none', overflow: 'hidden' }}></iframe>
</div>)
const DashboardSetting = () => {
    const { token } = useAuth();
    return (
        <div>
            <ToastContainer />
            <Breadcrumb pageName="Cài đặt trang" />
            <Tabs defaultActiveKey='home'
                items={PAGES.map((item, index) => ({ label: item.title, key: item.key, children: tabItem(item, token), key: index + 1 }))}
            />
        </div>
    )
}

export default DashboardSetting
