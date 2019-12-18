import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import RootRoute from "./routes/home";
import { Provider } from "react-redux";
import Intl from './intl';
import { message } from "antd";
import axios from "axios";
import { store } from "./store";
import Store from 'store';

import error_code_en from "./error_code/error_code_en";
import error_code_zh from "./error_code/error_code_zh";
interface AppProps {}
// Store.set(
//   "accessToken",
//   "e77c4346-5030-4cc0-b978-f16b5dc84167_74e28df418bb4d6b9589cfe5fc050bb4"
// );
axios.interceptors.request.use(
  config => {
    if(config.url !== '/api/v1/ucsp/paas/data/apiList') {
      store.dispatch.app.setLoadings(true);
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    let code = response.data.status.code;
    if (code !== "200") {
      if (code === "401" || code === "402" || code === '501') {
        Store.set('success',false)
        window.location.href = "http://172.16.10.147/portal/#/login";
        // 测试的登录地址
        // window.location.href = "http://portal.shenzhen-world.com:8088/portal/#/login";
        // 双创云的登录地址
      } else {
        if(store.getState().intl.locale === 'zh') {
          message.error(error_code_zh[code]);
        } else if(store.getState().intl.locale === 'en') {
          message.error(error_code_en[code]);
        }
      }
    }else {
      Store.set('success',true)
    }
    store.dispatch.app.setLoadings(false);
    return response;
  },
  err => {
    store.dispatch.app.setLoadings(false);
    return Promise.reject(err);
  }
);
class App extends React.Component<AppProps, any> {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Intl>
            <Router>
              <Route path="/" component={RootRoute} />
            </Router>
          </Intl>
        </Provider> 
      </div>
    );
  }
}

export default App;
