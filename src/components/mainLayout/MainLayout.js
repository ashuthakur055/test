import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Row, Col, Modal, Tooltip } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import * as userActions from '../../redux/actions/userActions';
import { sideMenu, profileMenu } from './menu';
import Logo from '../../assets/images/logo-black.png';
import './main.less';
import RestrictedPage from '../../../error/restrictedPage';
import PageNotFound from '../../../error/pageNotFound';
const { Header, Content, Sider } = Layout;

const MainLayout = props => {
  const [siderCollapse, setSiderCollapse] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    let menuItem = props.match.params.menuItem;
    let roleType = props.roleType;
    roleType = roleType == 'admin' ? roleType : 'other_users';
    if (roleType && !menuItem) {
      let firstItem = sideMenu[roleType][0].key;
      props.history.push(firstItem);
    }
    let sec = props.match.params.section;
    if (sec != 'edit' && menuItem == 'print-objects') {
      window.onload = handlePageLoad;
    }
  }, []);

  const handlePageLoad = () => {
    localStorage.removeItem('print_sticky_filter');
    localStorage.removeItem('sticky_current_pagination');
    localStorage.removeItem('sticky_current_tab');
  };

  const onSiderCollapse = () => {
    setSiderCollapse(!siderCollapse);
  };
  const handleProfileMenu = async e => {
    if (e.key === 'sign-out') {
      try {
        await props.signOut();
      } catch (error) {
        // If there's an error during sign-out, log it for debugging purposes.
        console.error('Error during sign-out:', error);
      } finally {
        // Redirect to the login page, regardless of whether sign-out succeeded or not.
        props.history.replace('/login');
      }
    }
  };
  const renderComponent = (roleType, itemName, section, section_2, id) => {
    let componentProps = {
      history: props.history,
      match: props.match,
    };
    if (roleType) {
      roleType = roleType === 'admin' ? roleType : 'other_users';
      let compts = [];
      let collectionCondition = true;
      //prevent the users to view the collection and associted its negative and prints if they dont have permission to view the collections
      if (itemName != 'print-objects') {
        handlePageLoad();
      }

      if (roleType != 'admin' && id) {
        id = id != 'new' && parseInt(id) === NaN ? 0 : id;
        if (itemName == 'collections') {
          collectionCondition = props.collections_permissions.view.includes(parseInt(id));
        }
        if (section == 'negative-objects') {
          if (section_2 == 'collection') {
            collectionCondition = props.collections_permissions.view.includes(parseInt(id));
          } else {
            collectionCondition =
              id === 'new' ? props.tabs_permissions?.negatives?.create : props.prints_negatives_obj.includes(parseInt(id));
          }
        }
        if (itemName == 'print-objects') {
          if (section == 'collection') {
            collectionCondition = props.collections_permissions.view.includes(parseInt(id));
          } else {
            collectionCondition = props.prints_negatives_obj.includes(parseInt(id));
          }
        }
      }
      for (let index = 0; index < sideMenu[roleType].length; index++) {
        const value = sideMenu[roleType][index];
        if (value.key == itemName && (roleType == 'admin' || (props.tabs_access.includes(itemName) && collectionCondition))) {
          let hasChild = false;
          if (typeof value.component === 'function') {
            if (section && value?.children?.length > 0) {
              for (let childKey = 0; childKey < value.children.length; childKey++) {
                if (section == value.children[childKey].key) {
                  hasChild = true;
                }
              }
              if (!props.tabs_access.includes(section) && itemName === 'settings' && roleType !== 'admin') {
                compts.push(<RestrictedPage />);
                break;
              }
              if (!props.tabs_access.includes(section) && itemName === 'bibliography' && roleType !== 'admin') {
                compts.push(<RestrictedPage />);
                break;
              }
              if (!hasChild) {
                compts.push(<PageNotFound />);
                break;
              }
            }

            compts.push(value.component(props, section));
            break;
          }
          compts.push(value.component);
          break;
        }
        if (value.key == itemName && !props.tabs_access.includes(itemName) && roleType !== 'admin') {
          compts.push(<RestrictedPage />);
          break;
        }
      }
      if (compts.length == 0 && !collectionCondition) {
        compts.push(<RestrictedPage />);
      } else if (compts.length == 0) {
        compts.push(<PageNotFound />);
      }
      return compts;
    } else {
      return '';
    }
  };

  const itemName = (roleType, menuItem) => {
    let menuItemName = '';
    if (roleType) {
      sideMenu[roleType].forEach(value => {
        if (value.key === menuItem) {
          menuItemName = value.name;
        }
      });
    }
    return menuItemName;
  };

  // Handler for open submenu change

  const render = () => {
    let user = props.user;
    let roleType = props.roleType;
    let menuItem = props.match.params.menuItem;
    let section = props.match.params.section;
    let section_2 = props.match.params.section_2;
    let id = props.match.params.id;
    let selectedKey = [menuItem];
    roleType = roleType == 'admin' ? roleType : 'other_users';
    roleType &&
      sideMenu[roleType].forEach(item => {
        if (item.key === menuItem) {
          if (item.children && item.children.length > 0) {
            let childItemKey = [];
            item.children.forEach(child => {
              if (child.children && child.children.length > 0) {
                const subChildFound = child.children.find(subChild => {
                  return subChild.key === section || subChild.key === id || subChild.key === section_2;
                });
                if (subChildFound) {
                  childItemKey.push(child.key);
                  childItemKey.push(subChildFound.key);
                }
              } else if (child.key === section || child.key === id) {
                childItemKey.push(child.key);
              }
            });
            selectedKey = [menuItem, ...childItemKey];
          } else {
            selectedKey = [menuItem];
          }
        }
      });

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className="sider main-sidebar" breakpoint="lg" collapsed={siderCollapse} onCollapse={onSiderCollapse} width="230">
          <div className="logo-img">
            <img src={Logo} alt="KIT4 Traders" />
          </div>
          {/* <div className="logo-name">{!siderCollapse && user.first_name + ' ' + user.last_name}</div>
          {!siderCollapse && <div className="menu-title">Menu</div>} */}
          <Menu
            selectedKeys={selectedKey}
            defaultOpenKeys={selectedKey}
            className="menu"
            mode="inline"
            theme="dark"
            items={
              roleType
                ? sideMenu[roleType].map(value => {
                    if (roleType == 'admin' || props.tabs_access.includes(value.key)) {
                      return {
                        ...value,
                        label: value.children ? (
                          <Tooltip title={siderCollapse ? '' : value.name} placement="right">
                            {value.name}
                          </Tooltip>
                        ) : (
                          <Tooltip title={siderCollapse ? '' : value.name} placement="right">
                            <Link to={'/' + value.key}>{value.name}</Link>
                          </Tooltip>
                        ),
                        children: value.children
                          ? value.children.map(item => {
                              if (
                                (value.key != 'settings' && value.key != 'bibliography') ||
                                props.tabs_access.includes(item.key) ||
                                roleType == 'admin'
                              ) {
                                return {
                                  ...item,
                                  label: item.children ? (
                                    <Tooltip title={siderCollapse ? '' : item.label} placement="right">
                                      {item.label}
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title={siderCollapse ? '' : item.label} placement="right">
                                      <Link to={'/' + value.key + '/' + item.key} title={item.label}>
                                        {item.label}
                                      </Link>
                                    </Tooltip>
                                  ),
                                  children: item.children
                                    ? item.children.map(subItem => {
                                        return {
                                          ...subItem,
                                          label: (
                                            <Tooltip title={siderCollapse ? '' : subItem.label} placement="right">
                                              <Link to={'/' + value.key + '/' + item.key + '/' + subItem.key} title={subItem.label}>
                                                {subItem.label}
                                              </Link>
                                            </Tooltip>
                                          ),
                                        };
                                      })
                                    : null,
                                };
                              }
                            })
                          : null,
                      };
                    }
                  })
                : []
            }
          ></Menu>
        </Sider>
        <Layout style={{ marginLeft: 0 }} className="content-layout">
          <Header className="header shadow">
            <Row gutter={[16, 16]}>
              <Col xs={3} sm={3} md={1}>
                {siderCollapse ? <MenuUnfoldOutlined onClick={onSiderCollapse} /> : <MenuFoldOutlined onClick={onSiderCollapse} />}
              </Col>
              <Col xs={10} sm={10} md={14}>
                {/* <div className='header-title'>{itemName(roleType, menuItem)}</div> */}
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
              {props.status.type == 'success' && (
                <Col span={24}>{React.useMemo(() => renderComponent(roleType, menuItem, section, section_2, id))}</Col>
              )}
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
}, userActions)(React.memo(MainLayout));
