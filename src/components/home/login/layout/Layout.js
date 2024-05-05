import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
const { Content } = Layout;

const LayoutComponent = ({ children }) => {
  return (
    <Layout>
      <HeaderComponent />
      <Content>{children}</Content>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutComponent;
