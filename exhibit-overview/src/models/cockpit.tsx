import {
  getSysList,
  getNetFlow,
  getApiCount,
  getresourceList,
  getIaasList,
  getSubitemSystemList
} from "../api/cockpit";

export const cockpit = {
  state: {
    sysList: [],
    netFlowList: [],
    apiCountList: [],
    resourceList: [],
    iaasList: [],
    subitemList: []
  },
  reducers: {
    setSysList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetSysList(state: any, payload: any) {
      return Object.assign(state, { sysList: [] });
    },
    setNetFlowList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetNetFlowList(state: any, payload: any) {
      return Object.assign(state, { netFlowList: [] });
    },
    setApiCount(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetApiCount(state: any, payload: any) {
      return Object.assign(state, { apiCountList: [] });
    },
    setResourceList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetResourceList(state: any, payload: any) {
      return Object.assign(state, { resourceList: [] });
    },
    setIaasList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetIaasList(state: any, payload: any) {
      return Object.assign(state, { iaasList: [] });
    },
    setSubitemList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetSubitemList(state: any, payload: any) {
      return Object.assign(state, { subitemList: [] });
    },
  },
  effects: (dispatch: any) => ({
    async getSysList() {
      await getSysList().then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.cockpit.setSysList({ sysList: res.data.resultMap });
        } else {
        }
      });
    },
    async getNetFlow() {
      await getNetFlow().then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.cockpit.setNetFlowList({ netFlowList: res.data.resultMap.data });
        } else {
        }
      });
    },
    async getApiCount() {
      await getApiCount().then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.cockpit.setApiCount({ apiCountList: res.data.resultMap.data });
        } else {
        }
      });
    },
    async getresourceList(language: string) {
      await getresourceList(language).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.cockpit.setResourceList({ resourceList: res.data.resultMap.data });
        } else {
          
        }
      });
    },
    async getIaasList() {
      await getIaasList().then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          dispatch.cockpit.setIaasList({ iaasList: res.data.resultMap });
        } else {
        }
      });
    },
    async getSubitemSystemList(language: string) {
      await getSubitemSystemList(language).then((res: any) => {
        if (res.status === 200 && res.data.status.code === '200') {
          var dataArr = res.data.resultMap.data;
          dataArr.sort(function(a:any, b:any){
            return a.order - b.order;
          });
          dispatch.cockpit.setSubitemList({ subitemList: dataArr });
        }
      });
    },
  })
};
