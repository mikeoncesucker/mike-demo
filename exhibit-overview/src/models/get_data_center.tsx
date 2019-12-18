import {
  getSysNum,
  getTransNum,
  getFuncList,
  getLineChartData,
  getLoopChartData,
  getBusinessData
} from "../api/get_data_center";

export const centerRawData = {
  state: {
    sysNum: null,
    transNum: null,
    sysList: null,
    businessData: {},
    lineChartData: null,
    loopChartData: [],
  },
  reducers: {
    setSysNum(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setTransNum(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setSysList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setBusinessData(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setLineChartData(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setLoopChartData(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch: any) => ({
    async getSysNum({ params, cb }: any, rootState?: any) {
      await getSysNum(params)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch.centerRawData.setSysNum({
              sysNum: res.data.resultMap.systemNum
            });
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async getTransNum({ params, cb }: any, rootState?: any) {
      await getTransNum(params)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch.centerRawData.setSysNum({
              transNum: res.data.resultMap.dataNum
            });
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async getFuncList({ language, cb }: any, rootState?: any) {
      await getFuncList(language)
        .then((res: any) => {
          if (res.status === 200) {
            const result = res.data.resultMap;
            dispatch.centerRawData.setSysList({
              sysList: result ? result : {}
            })
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async getLineChartData({ params, cb }: any, rootState?: any) {
      await getLineChartData(params)
        .then((res: any) => {
          if (res.status === 200) {
            const result = res.data.resultMap;
            dispatch.centerRawData.setLineChartData({
              lineChartData: result ? result.data : null
            })
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async getLoopChartData({ language, cb }: any, rootState?: any) {
      await getLoopChartData(language)
        .then((res: any) => {
          if (res.status === 200) {
            const result = res.data.resultMap;
            dispatch.centerRawData.setLineChartData({
              loopChartData: result ? result.data : []
            })
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async getBusinessData({ params, cb }: any, rootState?: any) {
      await getBusinessData(params)
        .then((res :any) => {
          if (res.status === 200) {
            dispatch.centerRawData.setBusinessData({
              businessData: res.data.resultMap
            })
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    }
  })
};
