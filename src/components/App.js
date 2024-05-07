import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import * as userActions from '../redux/actions/userActions';
import routeOptions from '../routes/route';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './App.less';

const { Content } = Layout;
const App = props => {
  const redirecToPublic = async () => {
    let { pathname, search } = props.history.location;
    let publicRoutes = routeOptions.publicRoutes;
    let isPathMatch = false;
    for (let i = 0; i < publicRoutes.length; i++) {
      let item = publicRoutes[i];
      if (item.path === pathname) {
        isPathMatch = true;
        props.history.push(pathname + search);
        break;
      }
    }
    if (!isPathMatch) {
      await props.signOut();
      props.history.push('/login');
    }
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (!user) {
        redirecToPublic();
      }
    });
  }, []);

  let publicRoutes = routeOptions.publicRoutes.map(({ path, component, exact }) => {
    return <Route key={Math.random() * 10} path={path} component={component} exact={exact} />;
  });

  let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
    <Route key={Math.random() * 10} exact={exact} path={path} render={props => React.createElement(component, props)} />
  ));
  return (
    <div className="app-container App">
      <Layout>
        <Layout className="site-layout">
          <Content>
            <Switch>
              {publicRoutes}
              {routes}
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default withRouter(
  connect(state => {
    return {
      ...state.status,
      ...state.user,
    };
  }, userActions)(App)
);
