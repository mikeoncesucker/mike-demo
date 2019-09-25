import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {message} from 'antd';
import axios from 'axios';
import store from 'store';
import Login from '../login';
import ResetPassword from '../login/forget_pass_form';
import MainApp from './main_app';
import error_code_zh from './error_code_zh';
import error_code_en from './error_code_en';

if (store.get('accessToken')) {
  axios.defaults.headers.common['accessToken'] = store.get('accessToken');
}

export interface IAppProps {
  history;
  location;
  match;
}

axios.interceptors.response.use(
  response => {
    if(response.data.status && response.data.status.code !== '200') {
      const code = response.data.status.code;
      if(store.get('local_language') === 'zh') {
        message.error(error_code_zh[code])
      }else if(store.get('local_language') === 'en') {
        message.error(error_code_en[code])
      }
    }
    if(response.data.code && response.data.code !== '200') {
      const code = response.data.code;
      if(store.get('local_language') === 'zh') {
        message.error(error_code_zh[code])
      }else if(store.get('local_language') === 'en') {
        message.error(error_code_en[code])
      }
    }
    return response;
  },
  err => {
    if (err && err.response && (err.response.status === 401) ) {
      window.location.href = '/#/login';
      message.error(err.response.status)
    }
    return Promise.reject(err);
  }
);
class App extends React.Component<IAppProps, any> {

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

export default withRouter(App);
