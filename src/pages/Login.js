import { Form, Typography, Col, Row, Button, Input } from "antd";
import React from "react";
import { useAuthInfo } from "../hooks/authContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuthInfo();
  const { push } = useHistory();

  function handleSubmit(userInfo) {
    login(userInfo, push);
  }
  return (
    <Row gutter={[16, 16]}>
      <Col offset={8} span={8}>
        <Typography.Title level={1}>Login</Typography.Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
