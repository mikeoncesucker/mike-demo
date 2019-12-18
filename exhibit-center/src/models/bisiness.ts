import {
  getBisiness,
  getRoleByBisiness,
  getResourcesByRole
} from "../api/bisiness";

export const bisiness = {
  state: {
    bisiness: null,
    role: null,
    resources: null
  },
  reducers: {
    setBisiness(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetBisiness(state: any, payload: any) {
      return Object.assign(state, { bisiness: null });
    },
    setRole(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRole(state: any, payload: any) {
      return Object.assign(state, { role: null });
    },
    setResources(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetResourcess(state: any, payload: any) {
      return Object.assign(state, { resources: null });
    }
  },
  effects: (dispatch: any) => ({
    async getBisiness({ userId, cb }: any, rootState?: any) {
      await getBisiness(userId).then((res: any) => {
        if (res.status === 200) {
          dispatch.bisiness.setBisiness({ bisiness: res.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getRoleByBisiness({ bisiness, cb }: any, rootState?: any) {
      await getRoleByBisiness(bisiness).then((res: any) => {
        if (res.status === 200) {
          dispatch.bisiness.setRole({ role: res.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getResourcesByRole({ bisiness, roleId, cb }: any, rootState?: any) {
      await getResourcesByRole(bisiness, roleId).then((res: any) => {
        if (res.status === 200) {
          dispatch.bisiness.setResources({ resources: res.data });
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetBisinesss() {
      dispatch.bisiness.resetBisiness();
    },
    async resetRoles() {
      dispatch.bisiness.resetRole();
    },
    resetResourcess() {
      dispatch.bisiness.resetResources();
    }
  })
};
