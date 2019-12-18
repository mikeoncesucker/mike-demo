import { queryList, payDetail, paymentAmounts, statBySystem, PayMethod } from "../api/pay";

export const pay = {
  state: {
    listData: {},
    detail: {},
    chartData: [],
    PayMethod: [],
    statBySystem: []
  },
  reducers: {
    setList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setDetail(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setPaymentAmounts(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setDataBySystem(state: any, payload: any) {
      return Object.assign({}, state, { statBySystem: payload });
    },
    setPayMethod(state: any, payload: any) {
      return Object.assign({}, state, { PayMethod: payload });
    },
  },
  effects: (dispatch: any) => ({
    async getList({ params, cb }: any, rootState?: any) {
      await queryList(params).then((res: any) => {
        if (res.data) {
          dispatch.pay.setList({ listData: res.data});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async payDetail({ id, cb }: any, rootState?: any) {
      await payDetail(id).then((res: any) => {
        if (res.data) {
          dispatch.pay.setDetail({ detail: res.data});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async paymentAmounts({ params, cb }: any, rootState?: any) {
      await paymentAmounts(params).then((res: any) => {
        if (res.data) {
          dispatch.pay.setPaymentAmounts({ chartData: res.data});
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getStatBySystem( cb : any, rootState?: any) {
      await statBySystem().then((res: any) => {
        if (res.data) {
          dispatch.pay.setDataBySystem(res.data);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async getPayMethod(cb : any, rootState?: any) {
      await PayMethod().then((res: any) => {
        if (res.data) {
          dispatch.pay.setPayMethod(res.data || []);
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
  })
};
