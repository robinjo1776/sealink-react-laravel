import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log("Form values:", values); // Log form values for debugging
    setLoading(true);
    try {
      // Make the POST request with 'username' and 'password'
      const response = await axios.post("http://127.0.0.1:8000/api/login", values);
      
      if (response.data.token) {
        console.log("Token received:", response.data.token); // Debug: Log the received token

        // Save token and user info in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userRole", response.data.user.role);

        // Log user role for debugging
        console.log("User role:", response.data.user.role);

        // Check if user role is 'employee' and navigate
        if (response.data.user.role === "employee") {
          navigate("/emp_lead");
        } else {
          message.error("Access denied: Invalid role.");
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      message.error("Invalid username or password");
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
            name="username" // Use 'username' here
            rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth-button"
              loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
