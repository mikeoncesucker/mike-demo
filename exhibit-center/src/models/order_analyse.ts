import {
  getOrderTrendByTime,
  getOrderAmountByTime,
  getOrderTotalByTime,
  getRingWith,
} from "../api/order_analyse";
export const order_analyse = {
  state: {
    trend: null,
    amount: null,
    total: null
  },
  reducers: {
    setTrend(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetTrend(state: any, payload: any) {
      return Object.assign(state, { trend: null });
    },
    setAmount(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetAmount(state: any, payload: any) {
      return Object.assign({}, state, { amount: null });
    },
    setTotal(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetTotal(state: any, payload: any) {
      return Object.assign({}, state, { total: null });
    }
  },
  effects: (dispatch: any) => ({
    async getOrderTrendByTime({ params, cb }: any, rootState?: any) {
      await getOrderTrendByTime(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.order_analyse.setTrend({
            trend: res.data.data
          });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async getOrderAmountByTime({ params, cb }: any, rootState?: any) {
      await getOrderAmountByTime(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.order_analyse.setAmount({
            amount: res.data.data
          });
          cb && cb(null, res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async getOrderTotalByTime({ params, cb }: any, rootState?: any) {
      await getOrderTotalByTime(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.order_analyse.setAmount({
            total: res.data.data
          });

          cb && cb(null, res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async getRingWith({ params, cb }: any, rootState?: any) {
      await getRingWith(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.order_analyse.setAmount({
          });

          cb && cb(null, res.data.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetTrends() {
      dispatch.order_analyse.resetTrend();
    },
    async resetAmounts() {
      dispatch.order_analyse.resetAmount();
    },
    async resetTotals() {
      dispatch.order_analyse.resetTotal();
    }
  })
};
