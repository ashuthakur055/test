import React from 'react';
import { Row, Col, Typography, Image, List, Divider, Layout, Space, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import Logo from '../../../../assets/images/logo.png';
import S1 from '../../../../assets/images/s1.png';
import S2 from '../../../../assets/images/s2.png';
import S3 from '../../../../assets/images/s3.png';
import S4 from '../../../../assets/images/s4.png';
import Call from '../../../../assets/images/call.png';
import Mail from '../../../../assets/images/mail.png';
import { FacebookOutlined, TwitterOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

import '../../../../assets/style/footer.less'; // Import your custom CSS for header styling

const { Footer, Content } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container">
        <div className="footersection">
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12}>
              <div className="footer-nav-logo">
                <a href="">
                  <img src={Logo} />
                </a>
                <p>
                  Forex trading involves significant risk of loss and is not suitable for all investors. High leverage can amplify profits
                  but also losses. Carefully consider your investment objectives, experience level, and risk tolerance before trading.
                  Information provided is for general guidance only and does not constitute investment advice. We are not liable for losses
                  or damages arising from the use of this information. Ensure you understand the risks associated with online Forex trading
                  and seek advice from an independent financial advisor if necessary.
                </p>
                <div>
                  <a href="https://www.facebook.com/yourfacebookpage" target="_blank" rel="noopener noreferrer">
                    <img src={S1} alt="Image" style={{ width: '36px', margin: '0 5px 0 0' }} />
                  </a>
                  <a href="https://twitter.com/yourtwitterpage" target="_blank" rel="noopener noreferrer">
                    <img src={S2} alt="Image" style={{ width: '36px', margin: '0 5px 0 0' }} />
                  </a>
                  <a href="https://twitter.com/yourtwitterpage" target="_blank" rel="noopener noreferrer">
                    <img src={S3} alt="Image" style={{ width: '36px', margin: '0 5px 0 0' }} />
                  </a>
                  <a href="https://twitter.com/yourtwitterpage" target="_blank" rel="noopener noreferrer">
                    <img src={S4} alt="Image" style={{ width: '36px', margin: '0 5px 0 0' }} />
                  </a>
                </div>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="footer-nav-ul">
                <Title level={3}>Company</Title>
                <List>
                  <List.Item>
                    <a href="">Experts</a>
                  </List.Item>
                  <List.Item>
                    <a href="">Online Courses</a>
                  </List.Item>
                  <List.Item>
                    <a href="">Webinars</a>
                  </List.Item>
                  <List.Item>
                    <a href="">Signals</a>
                  </List.Item>
                </List>
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="footer-nav-ul">
                <Title level={3}>Contact Us</Title>
                <List>
                  <List.Item>
                    <a href="tel:+17433844994">
                      <span>
                        <img src={Call} style={{ width: '18px' }} />
                      </span>{' '}
                      +1 (743)-384-4994
                    </a>
                  </List.Item>
                  <List.Item>
                    <a href="mailto:kit4trader@info.com">
                      <span>
                        <img src={Mail} style={{ width: '18px' }} />
                      </span>{' '}
                      kit4trader@info.com
                    </a>
                  </List.Item>
                </List>
              </div>
            </Col>
          </Row>
        </div>
        <div className="copy-right">
          <Row align="middle">
            <Col md={12} align="left">
              <div className="col-copy">
                <span>© Copyright 2010 - 2020, All Rights Reserved by KIT4TRADER</span>
              </div>
            </Col>
            <Col md={12} justify="end" align="end" class="Terms">
              <Link to="/login" style={{ marginRight: '10px' }}>
                Terms of Service
              </Link>

              <Link to="/login">Privacy Policy</Link>
            </Col>
          </Row>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
