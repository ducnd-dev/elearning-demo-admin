import { SettingOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

export const menu = [
    {
        id: 1,
        name: 'Khóa học',
        icon: <UnorderedListOutlined />,
        link: '/categories',
    },
    {
        id: 2,
        name: 'Người dùng',
        icon: <UserOutlined />,
        link: '/users',
    },
    {
        id: 3,
        name: 'Cài đặt',
        icon: <SettingOutlined />,
        link: '/settings',
    }
]