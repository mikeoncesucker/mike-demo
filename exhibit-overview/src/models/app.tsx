export const app = {
  state: {
    loading: null
  },
  reducers: {
    setLoading(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetLoading(state: any, payload: any) {
      return Object.assign(state, { loading: null });
    }
  },
  effects: (dispatch: any) => ({
    async setLoadings(loading: any, rootState?: any) {
      dispatch.app.setLoading({
        loading: loading
      });
    },
    
  })
};
