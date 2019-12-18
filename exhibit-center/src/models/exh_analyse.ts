import { getExhList, exhAnalysis, exhOverview } from "../api/exh_analyse";

export const exh = {
  state: {
    exhList: [],
    exhAnalysisInfo: null,
    exhOverviewInfo: null
  },
  reducers: {
    setExhList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setAnalysis(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setOverview(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    exhTimesData(state: any, payload: any) {
      return Object.assign({}, state, payload);
    }
  },
  effects: (dispatch: any) => ({
    async getExhList({ params, cb }: any, rootState?: any) {
      await getExhList(params)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            let arr:any[] = [];
            data.forEach(function(item: any){
              arr.push(item.expoName)
            })
            dispatch.exh.setExhList({ exhList: arr });
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async exhAnalysis({ params, cb }: any, rootState?: any) {
      await exhAnalysis(params)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch.exh.setAnalysis({ exhAnalysisInfo: res.data });
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && error.response && cb(error.response.status);
        });
    },

    async exhOverview({ params, cb }: any, rootState?: any) {
      await exhOverview(params)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch.exh.setOverview({ exhOverviewInfo: res.data.data });
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
