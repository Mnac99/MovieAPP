import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { login } from '../redux/authSlice';

const { Title } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        dispatch(login({ email: values.email }));
        navigate('/Home');
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
            <Form
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Please enter a valid email address' },
                    ]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Password is required' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
