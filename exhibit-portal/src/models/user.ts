import store from 'store';
import axios from 'axios';
import * as userAPI from '../api/user';
export const user = {
  state: {
    user: {}
  },
  reducers: {
    setUser(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch) => ({
    async login({ data, cb }, rootState) {
      userAPI
        .login(data)
        .then((res) => {
          if (res.status === 200) {
            store.set('accessToken', res.data.data.accessToken);
            axios.defaults.headers.common['accessToken'] = res.data.data.accessToken;
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async postCodeForLogin({ data, cb }, rootState) {
      userAPI
        .postCodeForLogin(data)
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async logout({ params, cb }, rootState) {
      userAPI
        .logout(params)
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async putPasswordByUserId({userId, body, cb}, rootState) {
      userAPI
        .putPasswordByUserId(userId, body,)
        .then((res)=> {
          if(res.status === 200) {
            cb && cb(res.status, res.data);
          }else {
            cb && cb(new Error());
          }
        })
        .catch((err)=>{
          cb && cb(err)
        })
    },
    async getCredentialRule({ cb }, rootState) {
      userAPI
        .getCredentialRule()
        .then((res)=> {
          if(res.status === 200) {
            cb && cb(res.status, res.data);
          }else {
            cb && cb(new Error())
          }
        })
        .catch((err)=> {

        })
    },
    async postCodeByVerify({ params, cb }, rootState) {
      userAPI
        .postCodeByVerify(params)
        .then((res) => {
          if(res.status === 200) {
            cb && cb(null, res.data);
          }else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err)
        })
    },
    async postResetPassWordByVerify({ params, cb }, rootState) {
      userAPI
        .postResetPassWordByVerify(params)
        .then((res) => {
          if(res.status === 200) {
            cb && cb(null, res.data);
          }else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err)
        })
    },
    async getUserInfo({ params, cb }, rootState) {
      userAPI
        .getUserInfo(params)
        .then((res) => {
          if (res.status === 200) {
            dispatch.user.setUser({ 
              user: res.data 
            });
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
  })
};
