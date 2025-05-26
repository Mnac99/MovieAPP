import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { email, password } = values;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.find(u => u.email === email);
        if (userExists) {
            message.error('User already exists!');
            return;
        }

        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        message.success('Registered successfully! You can now log in.');
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
            <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Email is required' },
                        { type: 'email', message: 'Enter a valid email' },
                    ]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Password is required' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
