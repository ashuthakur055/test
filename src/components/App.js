import React, { useEffect } from 'react';
import { Switch, BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCookie } from '../services/cookies';
import { Layout } from 'antd';
import * as userActions from '../redux/actions/userActions';
import routeOptions from '../routes/route';
import './App.less';

const { Content } = Layout;
const App = props => {
  const ssfToken = getCookie('ssfToken');
  const ssftime = getCookie('ssfTime');
  const ssfrft = getCookie('ssfrft');
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
  const isTokenExpired = () => {
    if (!ssfToken) {
      return true;
    }
  };
  useEffect(() => {
    (async () => {
      if (isTokenExpired()) {
        redirecToPublic();
      }
      if (ssftime !== 'undefined') {
        let newDate = new Date(ssftime);
        let cookieExpiryTime = newDate.getTime();
        let currentTime = new Date().getTime();

        if (ssfToken && cookieExpiryTime - currentTime > 180000) {
          await props.manualSignIn(ssfToken);
        } else if (ssfToken && cookieExpiryTime - currentTime <= 180000 && cookieExpiryTime - currentTime > 0) {
          if (ssfrft) {
            await props.refreshtoken(ssfrft);
          } else {
            redirecToPublic();
          }
        } else {
          redirecToPublic();
        }
      } else {
        redirecToPublic();
      }
    })();
  }, [ssfToken, props.history]);

  let publicRoutes = routeOptions.publicRoutes.map(({ path, component, exact }) => {
    return <Route key={Math.random() * 10} path={path} component={component} exact={exact} />;
  });

  // let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
  //   <Route key={Math.random() * 10} exact={exact} path={path} component={component} />

  // ));
  let routes = routeOptions.routes.map(({ path, component, exact }, i) => (
    <Route
      key={Math.random() * 10}
      exact={exact}
      path={path}
      render={props =>
        isTokenExpired()
          ? // Redirect to login page if the access token is expired
            props.history.push('/login')
          : // Render the component if the access token is not expired
            React.createElement(component, props)
      }
    />
  ));

  /*let privateRoutes = routeOptions.privateRoutes.map(({ path, component, exact, roles }, i) => (
		<Route
			key={Math.random() + "ROUTE_"}
			exact={exact}
			path={path}
			component={component}
			roles={roles}
		/>
	));*/

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
