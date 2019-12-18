import {
  getPasswordPolicies,
  putPasswordPolicies
} from "../api/password_policies";

export const password_policies = {
  state: {
    password_policies: null
  },
  reducers: {
    setPasswordPolicies(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetPasswordPolicies(state: any, payload: any) {
      Object.assign(state, { password_policies: null });
      return Object.assign(state, { password_policies: null });
    }
  },
  effects: (dispatch: any) => ({
    async getPasswordPolicies({ params, cb }: any, rootState?: any) {
      await getPasswordPolicies(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.password_policies.setPasswordPolicies({
            password_policies: res.data.data
          });
          cb && cb(null, res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async putPasswordPolicies({ body, cb }: any, rootState?: any) {
      await putPasswordPolicies(body)
        .then((res: any) => {
          if (res.status === 200) {
            cb && cb(res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch(error => {
          cb && cb(error.response.status);
        });
    },

    async resetPasswordPoliciess() {
      dispatch.password_policies.resetPasswordPolicies();
    }
  })
};
