import { Modal, Button, Form, Input } from 'antd';
import login from '../services/login';
import { useState } from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setMenuItems, isModalOpen, setIsModalOpen, handleClose }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        // 表单数据通过前端校验
        // console.log('Frontend Success:', values);

        try {
            const response = await login(values);
            // console.log(response);
            // save token to localstorage
            const {username, token } = response;
            localStorage.setItem('userToken', token);
            localStorage.setItem('username', username);

            // TODO
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
            setIsModalOpen(false);
        } catch (err) {
            // console.log(err);
            setErrorMessage('invalid username or password');
        }
    };

    const onFinishFailed = (errorInfo) => {
        // 表单数据未通过前端校验
        // console.log('Frontend Failed:', errorInfo);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleClose}
            title='登录'
            footer={null}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                {errorMessage &&
                    <Form.Item
                        label="Error"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        {errorMessage}
                    </Form.Item>
                }

                <Form.Item
                    wrapperCol={{
                        offset: 11,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <span style={{ 'paddingRight': '9px' }} />
                    <Button onClick={() => setIsModalOpen(false)} >
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default LoginForm;