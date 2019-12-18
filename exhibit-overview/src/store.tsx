import { init } from "@rematch/core";
import { createBrowserHistory } from "history";
import { mlocation } from "./models/mlocation";
import { app } from "./models/app";
import { intl } from './models/intl';
import { apiGateway } from "./models/apiGateway";
import { sysRelation } from "./models/sysRelation";
import { cockpit } from "./models/cockpit";
import { topologyModel } from "./models/topologyModel";
import { centerRawData } from "./models/get_data_center";
import { paasHardware } from "./models/paasHardware";

const history = createBrowserHistory();

const store = init({
  models: {
    app,
    intl,
    apiGateway,
    sysRelation,
    location: mlocation(history.location),
    cockpit,
    centerRawData,
    paasHardware,
    topologyModel
  }
});
const { dispatch } = store;
history.listen((location, action) => {
  dispatch.location.changeLocation(location);
});
export { store, history };