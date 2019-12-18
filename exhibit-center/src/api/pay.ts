import axios from "axios";
const get = async (url: string, params?:object) => {
  return axios.get(url, { params }).then((res: any) => {
    return res.data;
  })
}

// 获取列表数据
export const queryList = async (params: object) => {
  return get('/api/v1/ucsp/payments', params)
} 

// 支付详情
export const payDetail = async (id: string|number) => {
  return get(`/api/v1/ucsp/payments/id/${id}`, {id});
} 
// 图表数据
export const paymentAmounts = async (params: any) => {
  return get(`/api/v1/ucsp/payments/totals`, params);
}

//系统来源
export const statBySystem = async () => {
  return get(`/api/v1/ucsp/payments/source`);
}

//支付方式PayMethod
export const PayMethod = async () => {
  return get(`/api/v1/ucsp/payments/payWay`);
}