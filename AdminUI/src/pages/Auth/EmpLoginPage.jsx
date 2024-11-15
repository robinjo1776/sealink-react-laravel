import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth.css'; // Adjust path as needed
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', values);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', "employee"); 
        console.log("Employee role set to:", localStorage.getItem('userRole')); // Debugging log
        
        // Navigate based on user role
        if (response.data.user.role === 'employee') {
          navigate('/emp_lead'); // Adjust to your admin route
        } else {
          message.error('Access denied: Invalid role.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Employee Login</h2>
        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
