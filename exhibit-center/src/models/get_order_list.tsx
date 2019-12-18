import { getOrderList, getOrderDetail } from "../api/get_order_list";

export const order = {
  state: {
    list: [],
    detail: [],
  },
  reducers: {
    setOrderList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrderList(state: any, payload: any) {
      return Object.assign(state, { list: [] });
    },
    setOrderDetail(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrderDetail(state: any, payload: any) {
      return Object.assign(state, { detail: [] });
    },
  },
  effects: (dispatch: any) => ({
    async getOrderList({ params, cb }: any, rootState?: any) {
      await getOrderList(params)
        .then((res: any) => {
          if (res.status === 200) {
            dispatch.order.setOrderList({ list: res.data.data });
            cb && cb(null, res);
          } else {
            cb && cb(new Error());
          }
        })
        .catch((error: any) => {
          cb && cb(error.response.status);
        });
    },

    async resetOrderLists() {
      dispatch.order.resetOrderList({
        list: []
      });
    },

    async getOrderDetail( {id, cb }: any, rootState?: any) {
      await getOrderDetail(id).then((res: any) => {
        if (res.status === 200) {
          dispatch.order.setOrderDetail({ detail: res.data.data } );
          cb && cb(null, res);
        } else {
          cb && cb(new Error());
        }
      }).catch((error: any) => {
        cb && cb(error.response.status)
      });
    },

    async resetOrderDetails() {
      dispatch.order.resetOrderDetail();
    },
  })
};
