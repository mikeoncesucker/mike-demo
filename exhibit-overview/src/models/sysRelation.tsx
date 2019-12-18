import { 
  getCallGraph, 
} from '../api/sysRelation';

export const sysRelation = {
  state: {
    list: null
  },
  reducers: {
    setList(state:any, payload:any) {
      return Object.assign({}, state, payload)
    },
    resetList(state: any, payload: any) {
      return Object.assign({}, state, { list: null})
    }
  },
  effects: (dispatch:any)=> ({
    async getCallGraph({ language, cb }: any, rootState?: any) {
      await getCallGraph(language).then((res: any) => {
        if (res.status === 200) {
          dispatch.sysRelation.setList({
            list: res.data.resultMap
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
  })
}