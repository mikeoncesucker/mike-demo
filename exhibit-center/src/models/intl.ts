export const intl = {
  state: {
    locale: null
  },
  reducers: {
    setLocale(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetLocale(state: any, payload: any) {
      return Object.assign(state, { locale: null });
    }
  },
  effects: (dispatch: any) => ({
    async putLocale({ locale, cb }: any, rootState?: any) {
      dispatch.intl.setLocale({
        locale: locale
      });
    }
  })
};
