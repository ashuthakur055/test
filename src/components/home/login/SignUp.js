import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Row, Col, Spin, Menu, Layout, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons';
import * as userActions from '../../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderComponent from './layout/Header';
import FooterComponent from './layout/Footer';
const { Content } = Layout;
import GoogleLogo from '../../../assets/images/g.png';
import AppleLogo from '../../../assets/images/a.png';

const signUpComponent = props => {
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
                  <div className="form-heading">Signup</div>
                  <div className="form-section">
                    <Form className="log-in-form" layout="vertical" onFinish={onFinish}>
                      <Form.Item name="name" rules={[{ required: true, message: 'Please input your name' }]}>
                        <Input Placeholder="Name" prefix={<UserOutlined className="prefix-icon" />} />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email',
                          },
                        ]}
                      >
                        <Input placeholder="Email" prefix={<MailOutlined className="prefix-icon" />} />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password',
                          },
                        ]}
                      >
                        <Input.Password placeholder="Password" prefix={<LockOutlined className="prefix-icon" />} />
                      </Form.Item>

                      <Form.Item name="policy_accepted" valuePropName="checked">
                        <Checkbox>
                          I agree to <a href="">privacy policy</a> and <a href="">terms of conditions</a>
                        </Checkbox>
                      </Form.Item>

                      <Spin spinning={false} size="large" indicator={<LoadingOutlined />}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-button">
                            Signup
                          </Button>
                        </Form.Item>
                      </Spin>
                    </Form>
                    <div align="center">
                      <span> Already have an account?</span>
                      <a className="link-text" href="/login">
                        Login
                      </a>
                    </div>

                    <div class="signup-or">
                      <span>
                        <small>or login with</small>
                      </span>
                      <div className="signup-or-link" align="center">
                        <Link to="/login" style={{ marginRight: '10px' }}>
                          <img src={GoogleLogo} />
                        </Link>
                        <Link to="/login">
                          <img src={AppleLogo} />
                        </Link>
                      </div>
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
}, userActions)(signUpComponent);
// export default Login;
