import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Row, Col } from 'antd';
import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import * as userActions from '../../redux/actions/userActions';
import { sideMenu, profileMenu } from './menu';
import Logo from '../../assets/images/logo.png';
import './main.less';

const { Header, Content, Sider } = Layout;

const MainLayout = props => {
  const [siderCollapse, setSiderCollapse] = useState(false);
  useEffect(() => {
    let menuItem = props.match.params.menuItem;
    if (!menuItem) {
      let firstItem = sideMenu[0].key;
      props.history.push(firstItem);
    }
  });

  const onSiderCollapse = () => {
    setSiderCollapse(!siderCollapse);
  };

  const handleProfileMenu = async e => {
    if (e.key === 'sign-out') {
      await props.logOut();
      props.history.push('/login');
    }
  };

  const renderComponent = (itemName, section) => {
    let componentProps = {
      history: props.history,
      match: props.match,
    };
    return sideMenu.map(value => {
      if (value.key === itemName) {
        if (typeof value.component === 'function') {
          console.log({ props }, { section });
          return value.component(props, section);
        }
        return value.component;
      }
      return '';
    });
  };

  const itemName = menuItem => {
    let menuItemName = '';
    sideMenu.forEach(value => {
      if (value.key === menuItem) {
        menuItemName = value.name;
      }
    });
    return menuItemName;
  };

  const render = () => {
    let user = props.user;
    let menuItem = props.match.params.menuItem;
    let section = props.match.params.section;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className="sider main-sidebar" breakpoint="lg" collapsed={siderCollapse} onCollapse={onSiderCollapse} width="230">
          <div className="logo-img">
            <img src={Logo} alt="KIT4 Traders" />
          </div>
          {/* <div className='logo-name'>{!siderCollapse && user.first_name + ' ' + user.last_name}</div>
					{!siderCollapse && <div className='menu-title'>Menu</div>} */}
          <Menu selectedKeys={[menuItem]} className="menu">
            {sideMenu.map(value => {
              return (
                <Menu.Item key={value.key} icon={value.icon}>
                  <Link to={'/' + value.key}>{value.name}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={siderCollapse ? { marginLeft: 0 } : { marginLeft: 0 }} className="content-layout">
          <Header className="header shadow">
            <Row gutter={[16, 16]}>
              <Col xs={3} sm={3} md={1}>
                {siderCollapse ? <MenuUnfoldOutlined onClick={onSiderCollapse} /> : <MenuFoldOutlined onClick={onSiderCollapse} />}
              </Col>
              <Col xs={10} sm={10} md={14}>
                {/* <div className='header-title'>{itemName(menuItem)}</div> */}
              </Col>
              <Col xs={11} sm={11} md={9}>
                <Row gutter={16} justify="end">
                  <Col className="right-header ant-row-end">
                    <Dropdown
                      overlay={
                        <Menu onClick={handleProfileMenu}>
                          {profileMenu.map(value => {
                            return <Menu.Item key={value.key}>{value.name}</Menu.Item>;
                          })}
                        </Menu>
                      }
                    >
                      <div style={{ width: 'fit-content', cursor: 'pointer' }}>
                        <Avatar icon={<UserOutlined />} /> &nbsp;
                        <DownOutlined />
                      </div>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: '32px 29px', overflow: 'initial' }}>
            <Row>
              <Col span={24}>{renderComponent(menuItem, section)}</Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  };

  return render();
};

export default connect(state => {
  return {
    ...state.status,
    ...state.user,
  };
}, userActions)(MainLayout);
