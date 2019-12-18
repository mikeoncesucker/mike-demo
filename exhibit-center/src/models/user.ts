import {
  getUserList,
  resetUserPassword,
  createUser,
  putUser,
  getUserByUserId,
  putUserStatus,
  getRoleByUserId
} from "../api/user";

export const user = {
  state: {
    name: "深圳国际会展中心业务中心",
    userList: null,
    user: null,
    role: null
  },
  reducers: {
    setUser(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetUser(state: any, payload: any) {
      return Object.assign(state, { user: null });
    },
    setUserList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetUserList(state: any, payload: any) {
      return Object.assign(state, { userList: null });
    },
    setRole(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRole(state: any, payload: any) {
      return Object.assign(state, { role: null });
    }
  },
  effects: (dispatch: any) => ({
    async getUserList({ params, cb }: any, rootState?: any) {
      await getUserList(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.user.setUserList({ userList: res.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async resetUserPassword({ userId, cb }: any, rootState?: any) {
      await resetUserPassword(userId).then((res: any) => {
        if (res.status === 200) {
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async createUser({ body, cb }: any, rootState?: any) {
      await createUser(body).then((res: any) => {
        if (res.status === 200) {
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async putUser({ userId, body, cb }: any, rootState?: any) {
      await putUser(userId, body).then((res: any) => {
        if (res.status === 200 && res.data.code === "200") {
          cb && cb(res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getUserByUserId({ userId, cb }: any, rootState?: any) {
      await getUserByUserId(userId).then((res: any) => {
        if (res.status === 200) {
          dispatch.user.setUser({ user: res.data.data });
          cb && cb(res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async putUserStatus({ userId, status, cb }: any, rootState?: any) {
      await putUserStatus(userId, status).then((res: any) => {
        if (res.status === 200) {
          // dispatch.user.setUser({ user: res.data.data });
          cb && cb(res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getRoleByUserId({ bisiness, userId, cb }: any, rootState?: any) {
      await getRoleByUserId(bisiness, userId).then((res: any) => {
        if (res.status === 200) {
          dispatch.user.setUser({ role: res.data.data });
          cb && cb(res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetUsers() {
      dispatch.user.resetUser();
    },
    async resetUserLists() {
      dispatch.user.resetUserList();
    }
  })
};
