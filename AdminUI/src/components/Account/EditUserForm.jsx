import React, { useEffect } from 'react';
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Option } = Select;

const EditUserForm = ({ userId, onClose, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${userId}`);
        form.setFieldsValue({
          username: data.username || '',
          email: data.email || '',
          name: data.name || '',
          role: data.role || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Swal.fire('Error', 'Failed to load user data.', 'error');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, form]);

  const handleSubmit = async (values) => {
    const payload = {
      username: values.username,
      email: values.email,
      name: values.name,
      role: values.role,
    };

    // Include password and confirmation if provided
    if (values.password) {
      payload.password = values.password;
    }
    if (values.passwordConfirmation) {
      payload.password_confirmation = values.passwordConfirmation; // Send confirmation field
    }

    try {
      const { data } = await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, payload);
      Swal.fire('Updated!', 'User data has been updated successfully.', 'success');
      onUpdate(data); // Call onUpdate to update user in the table
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response) {
        console.log('Server response:', error.response.data);
      }
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the user.';
      Swal.fire('Error', errorMessage, 'error');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select placeholder="Select Role">
          <Option value="admin">Admin</Option>
          <Option value="employee">Employee</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: false, message: 'Please input your password!' }]} // Optional for updates
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>
      <Form.Item
        name="passwordConfirmation"
        rules={[
          { required: false, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
