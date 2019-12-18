import React from "react";
import { Route, HashRouter as Router } from "react-router-dom";
import RootRoute from "./routes";
import { Provider } from "react-redux";
import moment from "moment";
import axios from "axios";

import "moment/locale/zh-cn";

import { store } from "./store";
import Intl from "./intl";
import { message } from "antd";
import error_code_zh from "./error_code/error_code_zh";
import error_code_en from "./error_code/error_code_en";

import Orderanal from "./routes/order_mgr/order_chart";
import Event from "./routes/event/event_chart";

// import Store from "store";

moment.locale("zh-cn");

interface AppProps {}
// Store.set(
//   "accessToken",
//   "e77c4346-5030-4cc0-b978-f16b5dc84167_6ea16f1380cb455f9e3c46ff18ea77d4"
// );

axios.interceptors.request.use(
  config => {
    store.dispatch.app.setLoading({
      loading: true
    });
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.data.code !== "200") {
      if (response.data.code === "402" || response.data.code === "401") {
        window.location.href = "http://172.16.10.147/portal/#/login";
        // 测试的登录地址
        // window.location.href = "http://portal.shenzhen-world.com:8088/portal/#/login";
        // 双创云的登录地址
      } else {
        if (store.getState().intl.locale === "zh") {
          const code = response.data.code;
          message.error(error_code_zh[code]);
        } else if (store.getState().intl.locale === "en") {
          const code = response.data.code;
          message.error(error_code_en[code]);
        }
      }
    }

    store.dispatch.app.setLoading({
      loading: false
    });
    return response;
  },
  err => {
    store.dispatch.app.setLoading({
      loading: false
    });
    return Promise.reject(err);
  }
);

const App: React.FC<AppProps> = () => {
  const isChart = window.location.hash.indexOf("/chart") > -1;
  return (
    <div className="App">
      <Provider store={store}>
        <Intl>
          {isChart ? (
            <Router>
              <Route path="/chart/orderChart" component={Orderanal} />
              <Route path="/chart/eventChart" component={Event} />
            </Router>
          ) : (
            <Router>
              <Route path="/" component={RootRoute} />
            </Router>
          )}
        </Intl>
      </Provider>
    </div>
  );
};

export default App;
