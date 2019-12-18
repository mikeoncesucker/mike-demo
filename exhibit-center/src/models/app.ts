import { getUserResources, getUser } from "../api/app";

let resourcesLabel: any = [];

export const app = {
  state: {
    name: "深圳国际会展中心业务中心",
    userResources: null,
    user: null,
    isLogin: null,
    resourcesLabel: null,
    loading: null
  },
  reducers: {
    setUserResource(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetUserResource(state: any, payload: any) {
      return Object.assign({}, state, { userResources: null });
    },
    setUser(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setResourcesLabel(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetUser(state: any, payload: any) {
      return Object.assign(state, { user: null });
    },
    setLoading(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetLoading(state: any, payload: any) {
      return Object.assign(state, { loading: null });
    }
  },
  effects: (dispatch: any) => ({
    async getUserResources({ userId, cb }: any, rootState?: any) {
      await getUserResources(userId).then((res: any) => {
        if (res.status === 200) {
          const userResources = res.data.data && res.data.data.children;
          dispatch.app.setUserResource({
            userResources
          });
          this.getResourcesLabel(userResources);
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getUser({ cb }: any, rootState?: any) {
      await getUser().then((res: any) => {
        if (res.status === 200 && res.data.code === '200') {
          dispatch.app.setUser({
            isLogin: true,
            user: res.data.data
          });
          cb && cb(res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetUserResources() {
      dispatch.app.resetUserResource();
    },
    async resetUsers() {
      dispatch.app.resetUser();
    },
    async getResourcesLabel(data: any) {
      let _arr: any = [];
      data.map((item: any) => {
        if (item.label) {
          _arr.push(item.label);
        }
        if (item.children) {
          this.getResourcesLabel(item.children);
        }
        return _arr;
      });
      resourcesLabel = resourcesLabel.concat(_arr);
      let hash = [];
      for (let i = 0; i < resourcesLabel.length; i++) {
        if (hash.indexOf(resourcesLabel[i]) === -1) {
          hash.push(resourcesLabel[i]);
        }
      }
      dispatch.app.setUser({
        resourcesLabel: hash
      });
    },
    effects: (dispatch: any) => ({
      async setLoading(loading: any, rootState?: any) {
        dispatch.intl.setLoading({
          loading: loading
        });
      }
    })
  })
};
