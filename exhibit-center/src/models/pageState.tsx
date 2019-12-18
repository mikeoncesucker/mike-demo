export const pageState = {
  state: {
    userPageState: null,
    orgPageState: null,
    roleAndResourceState: null,
    eventPageState: null,
    eventConfigPageState: null,
    orderPageState: null,
    payPageState: null,
    logPageState: null,
  },
  reducers: {
    resetAllPageState(state: any, payload: any) {
      return Object.assign(state, {
        userPageState: null,
        orgPageState: null,
        roleAndResourceState: null,
        eventPageState: null,
        eventConfigPageState: null,
        orderPageState: null,
        payPageState: null,
        logPageState: null,
      });
    },
    setUserPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetUserPageState(state: any, payload: any) {
      return Object.assign(state, { userPageState: null });
    },
    setOrgPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrgPageState(state: any, payload: any) {
      return Object.assign(state, { orgPageState: null });
    },
    setRoleAndResourceState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRoleAndResourceState(state: any, payload: any) {
      return Object.assign(state, { roleAndResourceState: null });
    },
    // 其他页面状态保存与取消保存的方法
    setEventPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetEventPageState(state: any, payload: any) {
      return Object.assign(state, { eventPageState: null });
    },
    setEventConfigPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetEventConfigPageState(state: any, payload: any) {
      return Object.assign(state, { eventConfigPageState: null });
    },
    // 其他页面状态保存与取消保存的方法
    setOrderPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrderPageState(state: any, payload: any) {
      return Object.assign(state, { orderPageState: null });
    },
    setPayPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetPayPageState(state: any, payload: any) {
      return Object.assign(state, { payPageState: null });
    },
    setLogPageState(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetLogPageState(state: any, payload: any) {
      return Object.assign(state, { logPageState: null });
    }
  },
  effects: (dispatch: any) => ({
    async putUserPageState({ userPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setUserPageState({ userPageState: userPageState });
    },
    async putOrgPageState({ orgPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setOrgPageState({ orgPageState: orgPageState });
    },
    async setUserPageState({ userPageState, cb }: any, rootState?: any) {},
    async setRoleAndResourceState(
      { roleAndResourceState, cb }: any,
      rootState?: any
    ) {},

    async putEventPageState({ eventPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setEventPageState({ eventPageState: eventPageState });
    },
    async putEventConfigPageState(
      { eventConfigPageState, cb }: any,
      rootState?: any
    ) {
      dispatch.pageState.setEventConfigPageState({
        eventConfigPageState: eventConfigPageState
      });
    },
    async putOrderPageState({ orderPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setOrderPageState({ orderPageState: orderPageState });
    },
    async putPayPageState({ payPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setPayPageState({ payPageState: payPageState });
    },
    async putLogPageState({ logPageState, cb }: any, rootState?: any) {
      dispatch.pageState.setLogPageState({ logPageState: logPageState });
    },

    async resetAllPageState(rootState?: any) {}
  })
};
