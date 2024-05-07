import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, Button, Row, Col, Spin, Menu, Layout } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { getCookie } from '../../../services/cookies';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderComponent from './layout/Header';
import FooterComponent from './layout/Footer';
import GoogleLogo from '../../../assets/images/g.png';
import AppleLogo from '../../../assets/images/a.png';
import * as userActions from '../../../redux/actions/userActions';

const { Content } = Layout;

const Login = props => {
  const ssfToken = getCookie('ssfToken');
  console.log('🚀 ~ Login ~ props:', props);
  useEffect(() => {
    if (!!(props.isLoggedIn && ssfToken)) {
      props.history.push('/');
    }
  }, []);
  const handleSignIn = async () => {
    await props.signInWithGoogle();
    props.history.push('/');
  };
  const onFinish = async values => {
    await props.signIn(values.emailAddress, values.password);
  };
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
                  <div className="form-heading">Login</div>
                  <div className="form-section">
                    <Form className="log-in-form" layout="vertical" onFinish={onFinish}>
                      <Form.Item name="emailAddress" rules={[{ required: true, message: 'Please input your email' }]}>
                        <Input Placeholder="Email" prefix={<MailOutlined className="prefix-icon" />} />
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

                      <div style={{ textAlign: 'right' }}>
                        <Link className="link-text" to="/reset-password">
                          Forgot Password?
                        </Link>
                      </div>

                      <Spin spinning={false} size="large" indicator={<LoadingOutlined />}>
                        <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-button">
                            Login
                          </Button>
                        </Form.Item>
                      </Spin>
                    </Form>
                    <div class="signup-or">
                      <span>
                        <small>or login with</small>
                      </span>
                      <div className="signup-or-link" align="center">
                        <Link style={{ marginRight: '10px' }} onClick={handleSignIn}>
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
}, userActions)(Login);
// export default Login;
