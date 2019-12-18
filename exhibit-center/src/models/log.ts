import{
    getOperationLogList
} from '../api/log';
import{
    querySysList
} from '../api/resource_and_role';

export const log = {
    state: {
        logList: null,
        sysList: null
    },
    reducers: {
        setLogList(state: any, payload: any) {
          return Object.assign({}, state, payload);
        },
        resetLogList(state: any, payload: any) {
          return Object.assign(state, { logList: null });
        },
        setSysList(state: any, payload: any) {
          return Object.assign({}, state, payload);
        },
        resetSysList(state: any, payload: any) {
        return Object.assign(state, { sysList: null });
        }
    },
    effects: (dispatch: any) => ({
        async getOperationLogList({ params, cb }: any, rootState?: any) {
          await getOperationLogList(params).then((res: any) => {
            if (res.status === 200) {
              dispatch.log.setLogList({ logList: res.data });
              cb && cb(res.data);
            } else {
              cb && cb(new Error());
            }
          });
        },

        async querySysList({ params, cb }: any, rootState?: any) {
            await querySysList(params).then((res: any) => {
              if (res.status === 200) {
                dispatch.log.setSysList({ sysList: res.data.data });
                cb && cb(res.data);
              } else {
                cb && cb(new Error());
              }
            });
        },

    })

};