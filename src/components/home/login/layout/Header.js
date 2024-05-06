import React from 'react';
import { Layout, Menu, Typography, Button, theme, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Logo from '../../../../assets/images/logo-black.png';
import Cart from '../../../../assets/images/cart.png';
import '../../../../assets/style/header.less'; // Import your custom CSS for header styling
import { HeaderMenu } from './HeaderMenu';

const { Header } = Layout;
const { leftHeader, rightHeader } = HeaderMenu;

const HeaderComponent = () => {
  return (
    <Header
      theme="light"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo">
        <img src={Logo} alt="Logo" style={{ marginRight: '20px', backgroundColor: '#fffff' }} />
      </div>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['4']}
        className="nav-menu"
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {leftHeader.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.component}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>

      <div className="right-menu">
        <Link to="/login">
          <img src={Cart} />
        </Link>

        <Link to="/login" className="menu-link">
          Login
        </Link>
        <Button type="link" className="menu-link" size="small" href="/sign-up">
          Sign Up
        </Button>
      </div>
    </Header>
  );
};

export default HeaderComponent;
