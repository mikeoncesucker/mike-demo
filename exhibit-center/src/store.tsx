import { init } from "@rematch/core";

import { app } from "./models/app";
import { org } from "./models/org";
import { password } from "./models/password";
import { password_policies } from "./models/password_policies";
import { resource_and_role } from "./models/resource_and_role";
import { event } from "./models/event";
import { user } from "./models/user";
import { pay } from "./models/pay";
import { order } from "./models/get_order_list";
import { order_analyse } from "./models/order_analyse";
import { bisiness } from "./models/bisiness";
import { intl } from "./models/intl";
import { exh } from "./models/exh_analyse";
import { mlocation } from "./models/mlocation";
import { pageState } from "./models/pageState";
import { log } from "./models/log";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const store = init({
  models: {
    app,
    org,
    password,
    password_policies,
    resource_and_role,
    user,
    event,
    pay,
    order_analyse,
    order,
    exh,
    bisiness,
    intl,
    pageState,
    location: mlocation(history.location),
    log
  }
});
const { dispatch } = store;
history.listen((location: any, action: any) => {
  dispatch.location.changeLocation(location);
});
export { store, history };
