import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const DashboardComponent = props => {
  const [user, setUser] = useState(null);
  console.log('🚀 ~ DashboardComponent ~ props:', props);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        props.history.push('/login');
      }
    });
    return () => unsubscribe(); // Cleanup function
  }, []);
  return (
    <Row>
      <Col span={24} className="app-breadcrumb-col">
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col className="white-paper" span={24}>
        <div className="dashboard">Welcome, {user?.displayName}</div>
      </Col>
    </Row>
  );
};

export default DashboardComponent;
