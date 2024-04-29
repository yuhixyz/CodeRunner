import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import CodeCard from './components/CodeCard';
import NotFound from './components/NotFound';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Header, Content, Footer } = Layout;

const initialMenuItems = [
    {
        key: 'home',
        label: (<Link to='/' >首页</Link>),
        icon: <HomeOutlined />
    },

    {
        key: 'login',
        label: '登录',
        icon: <LoginOutlined />
    }
];

const App = () => {
    const [currentKey, setCurrentKey] = useState('home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuItems, setMenuItems] = useState(initialMenuItems);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('userToken');
        if (username && token) {
            let newMenuItems = [
                {
                    key: 'home',
                    label: (<Link to='/' >首页</Link>),
                    icon: <HomeOutlined />
                },
                {
                    key: 'user',
                    label: username,
                    icon: <UserOutlined />,
                    children: [
                        {
                            key: 'logout',
                            label: '登出',
                            icon: <LogoutOutlined />,
                        }
                    ]
                }
            ];
            setMenuItems(newMenuItems);
        }
    }, []);

    const handleMenuClick = (e) => {
        setCurrentKey(e.key);
        if (e.key === 'login') {
            setIsModalOpen(true);
        } else if (e.key === 'logout') {
            localStorage.removeItem('username');
            localStorage.removeItem('userToken');
            setMenuItems(initialMenuItems);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Layout>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        onClick={handleMenuClick}
                        selectedKeys={[currentKey]}
                        items={menuItems}
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    >
                    </Menu>
                </Header>
                <Content style={{ padding: '20px 20px 0 20px', }}>
                    <LoginForm
                        menuItems={menuItems}
                        setMenuItems={setMenuItems}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        handleClose={handleClose}
                    />
                    <Routes>
                        <Route path='/' Component={CodeCard} />
                        <Route path='*' Component={NotFound} />
                    </Routes>
                    <LoginForm />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <a href='https://github.com/yuhixyz/CodeRunner'>Code Runner</a> ©{new Date().getFullYear()} Created by <a href='https://github.com/yuhixyz'>yuhixyz</a>
                </Footer>
            </Layout>
        </>
    );
};

export default App;