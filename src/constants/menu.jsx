import { FormOutlined, HomeOutlined, SettingOutlined, UnorderedListOutlined, UserOutlined, LineChartOutlined, SoundOutlined } from '@ant-design/icons';

export const menu = [
    {
        id: 4,
        name: 'Tùy chỉnh trang',
        icon: <HomeOutlined />,
        link: '/builder',
    },
    {
        id: 1,
        name: 'Khóa học',
        icon: <UnorderedListOutlined />,
        link: '/categories',
    },
    {
        id: 5,
        name: 'Bài viết',
        icon: <FormOutlined />,
        link: '/posts',
    },
    {
        id: 2,
        name: 'Người dùng',
        icon: <UserOutlined />,
        link: '/users',
    },
    {
        id: 6,
        name: 'Đơn hàng',
        icon: <LineChartOutlined />,
        link: '/orders',
    },
    {
        id: 7,
        name: 'Sự kiện Header',
        icon: <SoundOutlined />,
        link: '/events',
    },
    {
        id: 3,
        name: 'Cài đặt',
        icon: <SettingOutlined />,
        link: '/settings',
    }
]
