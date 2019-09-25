import * as commonAPI from '../api/common';
export const common = {
  state: {
    unreadNoticeList: {}
  },
  reducers: {
    setNoticeList(state, payload) {
      return Object.assign({}, state, payload);
    },
    resetNoticeList(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch) => ({
    // 未读消息列表
    async  getUnreadNoticeList({ language, cb }, rootState) {
      commonAPI
        .noticeList(language)
        .then((res) => {
          if (res.status === 200) {
            dispatch.common.setNoticeList({ 
              unreadNoticeList: res.data.data
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
    // 将未读消息标变成已读
    async  resetNoticeRead({ cb }, rootState) {
      commonAPI
        .resetNoticeList()
        .then((res) => {
          if (res.status === 200) {
            dispatch.common.setNoticeList({ unreadNoticeList: null });
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    resetNoticeLists() {
      dispatch.common.resetNoticeList({
        unreadNoticeList: {}
      })
    }
  })
};


