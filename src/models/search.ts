import * as searchAPI from '../api/search';
export const search = {
  state: {
    query: {},
    detail: {},
    levelList: [],
    statusList: [],
    appCodeList: [],
    typeList: [],
  },
  reducers: {
    setQuery(state,payload) {
      return Object.assign({}, state, payload);
    },
    setDetail(state,payload) {
      return Object.assign({}, state, payload)
    },
    setAppCodeList(state,payload) {
      return Object.assign({}, state, payload);
    },
    setTypeList(state,payload) {
      return Object.assign({}, state, payload);
    },
    setLevelList(state,payload) {
      return Object.assign({}, state, payload);
    },
    setStatusList(state,payload) {
      return Object.assign({}, state, payload);
    },
    resetQuery(state,payload) {
      return Object.assign({}, state, payload);
    },
    resetDetail(state,payload) {
      return Object.assign({}, state, payload)
    },
    resetAppCodeList(state,payload) {
      return Object.assign({}, state, payload);
    },
    resetTypeList(state,payload) {
      return Object.assign({}, state, payload);
    },
    resetLevelList(state,payload) {
      return Object.assign({}, state, payload);
    },
    resetStatusList(state,payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch) => ({
    async getData({ query, cb }, rootState) {
      searchAPI
        .searchData(query)
        .then((res) => {
          if (res.status === 200) {
            dispatch.search.setQuery({query})
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getDetailById({ id, cb }, rootState) {
      searchAPI
        .getDetailById(id)
        .then((res) => {
          if (res.status === 200) {
            dispatch.search.setDetail({
              detail: res.data.data || {}
            })
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getAppCodeList({ cb }, rootState) {
      searchAPI
        .getAppCodeList()
        .then((res) => {
          if (res.status === 200) {
            dispatch.search.setLevelList({
              appCodeList: res.data.data
            })
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getTypeList({ cb }, rootState) {
      searchAPI
        .getTypeList()
        .then((res) => {
          if (res.status === 200) {
            dispatch.search.setLevelList({
              typeList: res.data.data
            })
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getLevelList({ cb }, rootState) {
      searchAPI
        .getLevelList()
        .then((res) => {
          if (res.status === 200) {
            const colorList = ['#02B583', '#08ABF8', '#FBB244', '#F54238'];
            const data = res.data.data.map((item, index) => {
              return {
                ...item,
                color: colorList[index]
              }
            })
            dispatch.search.setLevelList({
              levelList: data
            })
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getStatusList({ cb }, rootState) {
      searchAPI
        .getStatusList()
        .then((res) => {
          if (res.status === 200) {
            const colorList = ['#02B583', '#08ABF8', '#FBB244', '#F54238', '#FC5B5B'];
            const data = res.data.data.map((item, index) => {
              return {
                ...item,
                color: colorList[index]
              }
            })
            dispatch.search.setLevelList({
              statusList: data
            })
            cb && cb(null, res.data);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    resetQuerys() {
      dispatch.search.resetQuery({
        query: {}
      })
    },
    resetDetails() {
      dispatch.search.resetDetail({
        detail: {}
      })
    },
    resetAppCodeLists() {
      dispatch.search.resetAppCodeList({
        appCodeList: []
      })
    },
    resetTypeLists() {
      dispatch.search.resetTypeList({
        typeList: []
      })
    },
    resetLevelLists() {
      dispatch.search.resetLevelList({
        levelList: []
      })
    },
    resetStatusLists() {
      dispatch.search.resetStatusList({
        statusList: []
      })
    }
  })
};
