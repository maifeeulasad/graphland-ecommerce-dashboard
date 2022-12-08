import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import { network } from '../../../network/network';
import { storage } from '../../../local-storage/local-storage';

const { Title } = Typography;

const Login = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const onLoginClick = (values: any) => {
    setProcessing(true);
    network
      .post('/auth/login', { ...values })
      .then((res) => {
        messageApi.success('Login success');
        storage.setAccessToken(res.data.data.access_token);
        storage.setRefreshToken(res.data.data.refresh_token);
        navigate('/product-list');
        setProcessing(false);
      })
      .catch(() => {
        messageApi.error('Login failed');
        setProcessing(false);
      });
  };

  return (
    <div className={styles.center}>
      {messageContextHolder}
      <Title level={2}>Login</Title>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onLoginClick}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={processing}
            disabled={processing}
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export { Login };
