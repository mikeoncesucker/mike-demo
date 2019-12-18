import * as portalAPI from '../api/portal';
export const portal = {
  state: {
    cards: [],
    todos: [],
  },
  reducers: {
    setCards(state, payload) {
      return Object.assign({}, state, payload);
    },
    setTodos(state, payload) {
      return Object.assign({}, state, payload);
    },
    resetCards(state, payload) {
      return Object.assign({}, state, payload);
    },
    resetTodos(state, payload) {
      return Object.assign({}, state, payload);
    },
  },
  effects: (dispatch) => ({
    async getAllCards({ language,cb }, rootState) {
      portalAPI
        .allCards(language)
        .then((res) => {
          if (res.status === 200) {
            dispatch.portal.setCards({ 
              cards: res.data.data.completes
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
    saveCards({ cb, data }, rootState) {
      portalAPI
        .saveCards(data)
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
    async changeTheme({ theme,cb }, rootState) {
      portalAPI
        .changeTheme(theme)
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
    searchCards({ cb, serachName, language }, rootState) {
      portalAPI
        .searchCards(serachName, language)
        .then((res) => {
          if (res.status === 200) { 
            dispatch.portal.setTodos({ 
              todos: res.data.data.todos
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
    getCurrentLanguage({cb},rootState) {
      portalAPI
        .getCurrentLanguage()
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, res.data);
          }else{
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    setLanguage({language,cb},rootState) {
      portalAPI
        .setLanguage(language)
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, language.language);
          }else{
            cb && cb(new Error());
          }
        })
        .catch((err) => {
          cb && cb(err);
        });
    },
    async getSystemAuthorityByName({shortName, userId, cb}, rootState) {
      portalAPI
        .getSystemAuthorityByName(shortName,userId)
        .then((res) => {
          if (res.status === 200) {
            cb && cb(null, res.data);
          } else {
            cb && cb(null, res.data);
          }
        })
        .catch((err) => {
          cb && cb(err)
        })
    },
    resetCard() {
      dispatch.portal.resetCards({
        cards: []
      })
    },
    resetTodo() {
      dispatch.portal.resetTodos({
        todos: []
      })
    }
  })
};
