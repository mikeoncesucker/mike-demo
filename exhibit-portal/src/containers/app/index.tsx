import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { message } from 'antd';
import axios from 'axios';
import store from 'store';
import Login from '../login';
import ResetPassword from '../login/forget_pass_form';
import MainApp from './main_app';
import error_code_zh from './error_code_zh';
import error_code_en from './error_code_en';
export interface IAppProps {
  history;
  location;
  match;
}
axios.interceptors.response.use(
  response => {
    const code = response.data.status ? response.data.status.code : response.data.code;
    if (code !== '200') {
      const home = window.location.pathname === '/' && response.config.url === '/api/v1/usup/sso/authentication';
      if (store.get('local_language') === 'zh') {
        !home && message.error(error_code_zh[code])
      } else if (store.get('local_language') === 'en') {
        !home && message.error(error_code_en[code])
      }
      if (code === '402' ||
        code === 'sso-auth-400010' ||
        code === 'sso-auth-400011' ||
        code === 'sso-auth-400013' ||
        code === 'sso-auth-400015'
      ) {
        store.remove('accessToken')
        window.location.href = '#/login'
      }
    }
    return response;
  },
  err => {
    return Promise.reject(err);
  }
);
class App extends React.Component<IAppProps, any> {
  componentWillMount() {
    const title = store.get('local_language') === 'zh' ? '统一协同支撑平台' : 'UCSP';
    document.title = title;
    let designSize = 1600; 
    let html = window.screen;
    let wW = html.width;
    let rem = wW * 100 / designSize; 
    document.documentElement.style.fontSize = rem + 'px';
  }

  public render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path={`${match.url}resetPassword`} component={ResetPassword} />
        <Route path={`${match.url}`} component={MainApp} />
      </Switch>
    );
  }
}

export default withRouter(injectIntl(App));
