import {
  getresourceList,
  getRestartNum,
  getServerRate,
  getResourceUseRate,
  getNodeByAll
} from "../api/paasHardware";

export const paasHardware = {
  state: {
    resourceList: [],
    restartNumList: [],
    serverList: [],
    resourceUseList: [],
    nodeList: [],
  },
  reducers: {
    setResourceList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetResourceList(state: any, payload: any) {
      return Object.assign(state, { resourceList: [] });
    },
    setRestartNum(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRestartNum(state: any, payload: any) {
      return Object.assign(state, { restartNumList: [] });
    },
    setServerRate(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetServerRate(state: any, payload: any) {
      return Object.assign(state, { serverList: [] });
    },
    setResourceUseRate(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetResourceUseRate(state: any, payload: any) {
      return Object.assign(state, { resourceUseList: [] });
    },
    setAllNodeList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetAllNodeList(state: any, payload: any) {
      return Object.assign(state, { nodeList: [] });
    },
  },
  effects: (dispatch: any) => ({
    async getresourceList(language: string) {
      await getresourceList(language).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.paasHardware.setResourceList({ resourceList: res.data.resultMap.data });
        } else {
        }
      });
    },
    async getRestartNum(language: string) {
      await getRestartNum(language).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.paasHardware.setRestartNum({ restartNumList: res.data.resultMap.data });
        } else {
        }
      });
    },
    async getServerRate(language: string) {
      await getServerRate(language).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.paasHardware.setServerRate({ serverList: res.data.resultMap });
        } else {
        }
      });
    },
    async getResourceUseRate({ system, nodeIp, cb }: any, rootState?: any) {
      await getResourceUseRate(system, nodeIp, cb).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.paasHardware.setResourceUseRate({ resourceUseList: res.data.resultMap });
          cb && cb(null, res.data);
        } else {
        }
      });
    },
    async getNodeByAll({ cb }: any, rootState?: any) {
      await getNodeByAll(cb).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.paasHardware.setAllNodeList({ nodeList: res.data.resultMap.data });
          cb && cb(null, res.data);
        } else {
        }
      });
    },
  })
};
