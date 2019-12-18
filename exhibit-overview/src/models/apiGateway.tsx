import {
  getDispatchData,
  getTrend,
  getApiListBySystem,
  getFailListByShortName,
  getPieChart,
  getApiList
} from "../api/apiGateway";

export const apiGateway = {
  state: {
    dispatchData: null,
    trend: null,
    apiListBySystem: null,
    pieChart: null,
    apiList: null,
    failList: null
  },
  reducers: {
    setDispatchData(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetDispatchData(state: any, payload: any) {
      return Object.assign({}, state, { dispatchData: null });
    },
    setTrend(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetTrend(state: any, payload: any) {
      return Object.assign({}, state, { trend: null });
    },
    setApiListBySystem(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetApiListBySystem(state: any, payload: any) {
      return Object.assign({}, state, { apiListBySystem: null });
    },
    setFailList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetFailList(state: any, payload: any) {
      return Object.assign({}, state, { failList: null });
    },
    setPieChart(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetPieChart(state: any, payload: any) {
      return Object.assign({}, state, { pieChart: null });
    },
    setServiceList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetServiceList(state: any, payload: any) {
      return Object.assign({}, state, { serviceList: null });
    }
  },
  effects: (dispatch: any) => ({
    async getDispatchData({ language, cb }: any, rootState?: any) {
      await getDispatchData(language).then((res: any) => {
        if (res.status === 200) {
          dispatch.apiGateway.setDispatchData({
            dispatchData: res.data.resultMap
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getTrend({ cb }: any, rootState?: any) {
      await getTrend().then((res: any) => {
        if (res.status === 200) {
          const result = res.data.resultMap;
          dispatch.apiGateway.setTrend({
            trend: result ? result.data : null
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getApiListBySystem({ language, cb }: any, rootState?: any) {
      await getApiListBySystem(language).then((res: any) => {
        if (res.status === 200) {
          const result = res.data.resultMap;
          dispatch.apiGateway.setApiListBySystem({
            apiListBySystem: result ? result.data : null
          });
          cb && cb(result ? result.data : null);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getFailListByShortName({ shortName, cb }: any, rootState?: any) {
      await getFailListByShortName(shortName).then((res: any) => {
        if (res.status === 200) {
          const result = res.data.resultMap;
          dispatch.apiGateway.setFailList({
            failList: result ? result.data : null
          });
          cb && cb(result ? result.data : null);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getPieChart({ cb }: any, rootState?: any) {
      await getPieChart().then((res: any) => {
        if (res.status === 200) {
          dispatch.apiGateway.setPieChart({
            pieChart: res.data.resultMap
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getApiList({ cb, id }: any, rootState?: any) {
      await getApiList(id).then((res: any) => {
        if (res.status === 200) {
          dispatch.apiGateway.setServiceList({
            apiList: res.data.resultMap
          });
          cb && cb(res.data.resultMap);
        } else {
          cb && cb(new Error());
        }
      });
    }
  })
};
