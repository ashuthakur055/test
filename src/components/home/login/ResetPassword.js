import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Row, Col, Spin, Menu, Layout } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import * as userActions from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderComponent from './layout/Header';
import FooterComponent from './layout/Footer';
const { Content } = Layout;

const ResetPassword = props => {
  const onFinish = async values => {};
  let render = () => {
    return (
      <>
        <Content>
          <HeaderComponent />
          {/* <Content> */}
          <Row className="login-p">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="login-section">
                <div className="form-card">
                  <div className="form-heading">Reset Password</div>
                  <p>Please fill in your email address below and we’ll send you a link to reset your password.</p>
                  <div className="form-section">
                    <Form className="log-in-form" layout="vertical" onFinish={onFinish}>
                      <Form.Item name="user_name" rules={[{ required: true, message: 'Please input your name' }]}>
                        <Input Placeholder="User Name" prefix={<UserOutlined className="prefix-icon" />} />
                      </Form.Item>

                      <Spin spinning={false} size="large" indicator={<LoadingOutlined />}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-button">
                            Reset Password
                          </Button>
                        </Form.Item>
                      </Spin>
                    </Form>
                    <div align="center">
                      <Link className="link-text" to="/login">
                        Back to login page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* </Content> */}
          <FooterComponent />
        </Content>
      </>
    );
  };

  return render();
};

export default connect(state => {
  return {
    ...state.status,
    ...state.user,
  };
}, userActions)(ResetPassword);
// export default Login;
