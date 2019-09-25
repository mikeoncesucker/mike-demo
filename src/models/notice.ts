import * as noticeAPI from '../api/notice';
export const notice = {
  state: {
    notice: {},
    detail: {},
  },
  reducers: {
    setNoticeList(state, payload) {
      return Object.assign({}, state, payload);
    },
    setDetail(state, payload) {
      return Object.assign({}, state, payload);
    },
    resetNoticeList(state, payload) {
      return Object.assign({}, state, payload);
    },
    resetDetail(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch) => ({
    getNoticeList({ query, cb }, rootState) {
      noticeAPI
        .getNoticeList(query)
        .then((res) => {
          if (res.status === 200) {
            dispatch.notice.setNoticeList({ 
              notice: res.data.data 
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
    getReadById({ query, cb }, rootState) {
      noticeAPI
        .getReadById(query)
        .then((res) => {
          if (res.status === 200) {
            dispatch.notice.setDetail({
              detail: res.data.data
            })
            cb && cb(null,res.data)
          } else {
            cb && cb(new Error())
          }
        })
        .catch((err) => {
          cb && cb(err)
        })
    },
    deleteNotice({ cb }, rootState) {
      noticeAPI
        .deleteNotice()
        .then((res) => {
          if (res.status === 200) {
            dispatch.notice.setNoticeList({ notice: {}});
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    putDeleteById({ id, cb }, rootState ) {
      noticeAPI
        .putDeleteById(id)
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err)
        })
    },
    resetNoticeLists() {
      dispatch.notice.resetNoticeList({
        notice: {}
      })
    },
    resetDetails() {
      dispatch.notice.resetDetail({
        detail: {}
      })
    }
  })
};
