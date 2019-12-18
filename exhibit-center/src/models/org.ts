import {
  getOrgList,
  getOrgTreeList,
  getOrgById,
  deleteOrg,
  createOrg,
  putOrg
} from "../api/org";

export const org = {
  state: {
    org: null,
    orgList: null,
    orgTreeList: null
  },
  reducers: {
    setOrg(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrg(state: any, payload: any) {
      return Object.assign(state, { org: null });
    },
    setOrgList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrgList(state: any, payload: any) {
      return Object.assign(state, { orgList: null });
    },
    setOrgTreeList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrgTreeList(state: any, payload: any) {
      return Object.assign(state, { orgTreeList: null });
    }
  },
  effects: (dispatch: any) => ({
    async getOrgList({ cb }: any, rootState?: any) {
      await getOrgList().then((res: any) => {
        if (res.status === 200) {
          dispatch.org.setOrgList({
            orgList: res.data.data
          });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getOrgTreeList({ cb }: any, rootState?: any) {
      await getOrgTreeList().then((res: any) => {
        if (res.status === 200) {
          dispatch.org.setOrgTreeList({ orgTreeList: res.data.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getOrgById({ orgId, cb }: any, rootState?: any) {
      await getOrgById(orgId).then((res: any) => {
        if (res.status === 200) {
          dispatch.org.setOrg({ org: res.data.data });
          cb && cb(res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async deleteOrg({ orgId, cb }: any, rootState?: any) {
      await deleteOrg(orgId).then((res: any) => {
        if (res.status === 200) {
          dispatch.org.setOrgTreeList({ orgTreeList: res.data.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    // createOrg
    async createOrg({ body, cb }: any, rootState?: any) {
      await createOrg(body).then((res: any) => {
        if (res.status === 200 && res.data.code === "200") {
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    // putOrg
    async putOrg({ orgId, body, cb }: any, rootState?: any) {
      await putOrg(orgId, body).then((res: any) => {
        if (res.status === 200) {
          // dispatch.org.setOrgTreeList({ orgTreeList: res.data.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetOrgLists() {
      dispatch.org.resetOrgList();
    },
    async resetOrgTreeLists() {
      dispatch.org.resetOrgTreeList();
    },
    async resetOrgs() {
      dispatch.org.resetOrg();
    }
  })
};
