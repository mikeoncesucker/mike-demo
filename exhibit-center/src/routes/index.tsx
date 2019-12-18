import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import loadable from "react-loadable";
import Nav from "../containers/app/nav";
import Header from "../containers/app/header";
// import Footer from "../containers/app/footer";
import Breadcrumb from "../compontents/breadcrumb_bar";
import Loading from "../compontents/loading";
import { Layout, LocaleProvider } from "antd";
import { withStyles } from "@material-ui/styles";

import zhCN from "antd/lib/locale-provider/zh_CN";
import enUS from "antd/lib/locale-provider/en_US";
import { connect } from "react-redux";
import { Spin } from "antd";
import Axios from "axios";
import store from "store";

interface AppProps {
  history: any;
  classes: any;
  location: any;
  match: any;
  locale: any;
  loading: any;
  isLogin: any;
}
const styles: any = (theme: any) => ({
  hide: {
    display: 'none'
  },
  root: {
    height: "100vh",
    "& .ant-switch": {
      width: "34px",
      height: "14px"
    },
    "& .ant-switch:after": {
      width: "20px",
      height: "20px",
      top: "-4px",
      left: "-1px"
    },
    "& .ant-switch-checked": {
      backgroundColor: "rgba(2, 181, 144, .6)"
    },
    "& .ant-switch-checked:after": {
      backgroundColor: "#02B583",
      marginLeft: "1px",
      left: "43px"
    }
  },
  containers: {
    // paddingBottom: "40px"
  }
});

let orgMgr = loadable({
  loader: (): any => import(/* webpackChunkName: "orgMgr" */ "./org_mgr"),
  loading: () => {
    return <Loading />;
  }
});

let orgDetails = loadable({
  loader: () =>
    import("./org_mgr/details"),
  loading: () => {
    return <Loading />;
  }
});

let orgEdit = loadable({
  loader: () => import("./org_mgr/edit"),
  loading: () => {
    return <Loading />;
  }
});

let passwordPoliciesMgr = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "passwordPoliciesMgr" */ "./password_policies_mgr"
    ),
  loading: () => {
    return <Loading />;
  }
});

let userMgr = loadable({
  loader: () => import("./user_mgr"),
  loading: () => {
    return <Loading />;
  }
});

let userDetails = loadable({
  loader: () =>
    import(/* webpackChunkName: "userDetails" */ "./user_mgr/details"),
  loading: () => {
    return <Loading />;
  }
});

let userEdit = loadable({
  loader: () => import(/* webpackChunkName: "userEdit" */ "./user_mgr/edit"),
  loading: () => {
    return <Loading />;
  }
});

let resourceAndRoleMgr = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "resourceAndRoleMgr" */ "./resource_and_role_mgr"
    ),
  loading: () => {
    return <Loading />;
  }
});

let resourceAndRoleEdit = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "resourceAndRoleEdit" */ "./resource_and_role_mgr/edit"
    ),
  loading: () => {
    return <Loading />;
  }
});

let authorization = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "authorization" */ "./resource_and_role_mgr/authorization/authorization"
    ),
  loading: () => {
    return <Loading />;
  }
});

let authorizationEdit = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "authorizationEdit" */ "./resource_and_role_mgr/authorization/authorization_edit"
    ),
  loading: () => {
    return <Loading />;
  }
});

let roleAuthorization = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "roleAuthorization" */ "./resource_and_role_mgr/authorization/role_authorization"
    ),
  loading: () => {
    return <Loading />;
  }
});

let resourceAuthorization = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "resourceAuthorization" */ "./resource_and_role_mgr/authorization/resource_authorization"
    ),
  loading: () => {
    return <Loading />;
  }
});

// 订单中心
let orderSearch = loadable({
  loader: () =>
    import(/* webpackChunkName: "orderSearch" */ "./order_mgr/order_search"),
  loading: () => {
    return <Loading />;
  }
});

let orderDetail = loadable({
  loader: () =>
    import(/* webpackChunkName: "orderDetail" */ "./order_mgr/order_detail"),
  loading: () => {
    return <Loading />;
  }
});

let orderAnal = loadable({
  loader: () =>
    import(/* webpackChunkName: "orderAnal" */ "./order_mgr/order_anal"),
  loading: () => {
    return <Loading />;
  }
});

let orderExhAnalyse = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "orderExhAnalyse" */ "./order_mgr/order_exh_anal"
    ),
  loading: () => {
    return <Loading />;
  }
});

let error = loadable({
  loader: () => import(/* webpackChunkName: "error" */ "./Error"),
  loading: () => {
    return <Loading />;
  }
});

let hello = loadable({
  loader: () => import(/* webpackChunkName: "hello" */ "./Hello"),
  loading: () => {
    return <Loading />;
  }
});

let eventQuery = loadable({
  loader: () => import(/* webpackChunkName: "eventQuery" */ "./event/query"),
  loading: () => {
    return <Loading />;
  }
});
let eventQueryDetail = loadable({
  loader: () =>
    import(/* webpackChunkName: "eventQueryDetail" */ "./event/query/detail"),
  loading: () => {
    return <Loading />;
  }
});
let eventAnalyze = loadable({
  loader: () =>
    import(/* webpackChunkName: "eventAnalyze" */ "./event/analyze"),
  loading: () => {
    return <Loading />;
  }
});
let eventConfig = loadable({
  loader: () => import(/* webpackChunkName: "eventConfig" */ "./event/config"),
  loading: () => {
    return <Loading />;
  }
});
let eventConfigCreate = loadable({
  loader: () =>
    import(/* webpackChunkName: "eventConfigCreate" */ "./event/config/create"),
  loading: () => {
    return <Loading />;
  }
});
let eventConfigDetail = loadable({
  loader: () =>
    import(/* webpackChunkName: "eventConfigDetail" */ "./event/config/detail"),
  loading: () => {
    return <Loading />;
  }
});
let payQuery = loadable({
  loader: () => import(/* webpackChunkName: "payQuery" */ "./pay/query"),
  loading: () => {
    return <Loading />;
  }
});
let payQueryDetail = loadable({
  loader: () =>
    import(/* webpackChunkName: "payQueryDetail" */ "./pay/query/detail"),
  loading: () => {
    return <Loading />;
  }
});
let payAnalyze = loadable({
  loader: () => import(/* webpackChunkName: "payAnalyze" */ "./pay/analyze"),
  loading: () => {
    return <Loading />;
  }
});
let operationLog = loadable({
  loader: () => import(/* webpackChunkName: "log" */ "./operation_log_mgr"),
  loading: () => {
    return <Loading />;
  }
});
let logDetails = loadable({
  loader: () => import(/* webpackChunkName: "logDetails" */ "./operation_log_mgr/details"),
  loading: () => {
    return <Loading />;
  }
});

class RootRoute extends React.Component<AppProps, any> {
  componentWillMount() {
    const title: any = {
      'zh': '协同支撑-业务中台',
      'en': 'UCSP Business center',
    }
    document.title = title[store.get('local_language')]
  }
  componentWillReceiveProps() {
    Axios.defaults.headers.common["accessToken"] =
      store.get("accessToken") ||
      "";
  };

  render() {
    const { match, classes, locale, loading, isLogin } = this.props;
    return (
      <LocaleProvider locale={locale === "zh" ? zhCN : enUS}>
        <div className={!isLogin ? classes.hide : ''}>
          <Layout className={classes.root}>
            <Nav />
            <Layout className={classes.containers}>
              {loading && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(100,100,100, 0.3)",
                    zIndex: 10,
                    position: "fixed",
                    textAlign: "center",
                    padding: "330px 260px 0 0"
                  }}
                >
                  <Spin size="large" />
                </div>
              )}
              <Header />
              <Breadcrumb />
              {locale && (
                <div className={classes.content}>
                  <Switch>
                    {/* 组织机构管理 */}
                    <Route exact path={`${match.url}org`} component={orgMgr} />
                    <Route
                      exact
                      path={`${match.url}org/details`}
                      component={orgDetails}
                    />
                    <Route
                      exact
                      path={`${match.url}org/edit`}
                      component={orgEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}org/create`}
                      component={orgEdit}
                    />
                    {/* 密码策略管理 */}
                    <Route
                      exact
                      path={`${match.url}passwordPolicies`}
                      component={passwordPoliciesMgr}
                    />
                    {/* 用户管理 */}
                    <Route exact path={`${match.url}user`} component={userMgr} />
                    <Route
                      exact
                      path={`${match.url}user/details`}
                      component={userDetails}
                    />
                    <Route
                      exact
                      path={`${match.url}user/edit`}
                      component={userEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}user/create`}
                      component={userEdit}
                    />
                    {/* 资源与角色管理 */}
                    <Route
                      exact
                      path={`${match.url}resourceAndRole`}
                      component={resourceAndRoleMgr}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/edit`}
                      component={resourceAndRoleEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/create`}
                      component={resourceAndRoleEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/authorization`}
                      component={authorization}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/authorization/create`}
                      component={authorizationEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/authorization/edit`}
                      component={authorizationEdit}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/authorization/roleAuthorization`}
                      component={roleAuthorization}
                    />
                    <Route
                      exact
                      path={`${match.url}resourceAndRole/authorization/resourceAuthorization`}
                      component={resourceAuthorization}
                    />
                    <Route
                      exact
                      path={`${match.url}orderSearch`}
                      component={orderSearch}
                    />
                    <Route
                      exact
                      path={`${match.url}orderSearch/detail`}
                      component={orderDetail}
                    />
                    <Route
                      exact
                      path={`${match.url}orderAnalyse`}
                      component={orderAnal}
                    />
                    <Route
                      exact
                      path={`${match.url}orderExhAnalyse`}
                      component={orderExhAnalyse}
                    />
                    <Route
                      exact
                      path={`${match.url}eventQuery`}
                      component={eventQuery}
                    />
                    <Route
                      exact
                      path={`${match.url}eventQuery/detail/:id`}
                      component={eventQueryDetail}
                    />
                    <Route
                      exact
                      path={`${match.url}eventAnalyze`}
                      component={eventAnalyze}
                    />
                    <Route
                      exact
                      path={`${match.url}eventConfig`}
                      component={eventConfig}
                    />
                    <Route
                      exact
                      path={`${match.url}eventConfig/detail/:id`}
                      component={eventConfigDetail}
                    />
                    <Route
                      exact
                      path={`${match.url}eventConfig/create`}
                      component={eventConfigCreate}
                    />
                    <Route
                      exact
                      path={`${match.url}eventConfig/edit/:id?`}
                      component={eventConfigCreate}
                    />
                    <Route
                      exact
                      path={`${match.url}payQuery`}
                      component={payQuery}
                    />
                    <Route
                      exact
                      path={`${match.url}payQuery/detail/:id`}
                      component={payQueryDetail}
                    />
                    <Route
                      exact
                      path={`${match.url}payAnalyze`}
                      component={payAnalyze}
                    />
                    <Route
                      exact
                      path={`${match.url}operationLog`}
                      component={operationLog}
                    />
                    <Route
                      exact
                      path={`${match.url}operationLog/details`}
                      component={logDetails}
                    />
                    {/* 欢迎页面 */}
                    <Route exact path={`${match.url}`} component={hello} />
                    {/* 404 未找到页面 */}
                    <Route path={`${match.url}`} component={error} />
                  </Switch>
                </div>
              )}
            </Layout>
          </Layout>
        </div>
      </LocaleProvider>
    );
  }
}

const mapState2Props = ({ intl: { locale }, app: { loading, isLogin } }: any) => ({
  locale,
  loading,
  isLogin
});

export default withStyles(styles)(
  withRouter(connect(mapState2Props)(RootRoute))
);
