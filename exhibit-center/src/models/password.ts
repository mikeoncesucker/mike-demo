import { putPassword } from "../api/password";

export const password = {
  state: {
    password: null
  },
  reducers: {
    setPassword(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetPassword(state: any, payload: any) {
      return Object.assign({}, state);
    }
  },
  effects: (dispatch: any) => ({
    async putPassword({ userId, body, cb }: any, rootState?: any) {
      await putPassword(userId, body)
        .then((res: any) => {
          if (res.status === 200) {
            cb && cb(res.status, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch(error => {
          cb && cb(error.response.status);
        });
    }
  })
};
