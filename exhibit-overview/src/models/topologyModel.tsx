import { 
  getTopological, 
} from '../api/topologyModel';

export const topologyModel = {
  state: {
    list: null,
  },
  reducers: {
    setSlider(state:any, payload:any) {
      return Object.assign({}, state, payload)
    },
    resetSlider(state: any, payload: any) {
      return Object.assign({}, state, { list: null})
    },
  },
  effects: (dispatch:any)=> ({
    async getTopological({ language, cb }: any, rootState?: any) {
      await getTopological(language).then((res: any) => {
        if (res.status === 200) {
          const result = res.data.resultMap;
          dispatch.topologyModel.setSlider({
            list: result ? result.data : []
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
  })
}