import axios from "axios";

/**
 * 获取统计订单趋势分析
 * 
 * @export
 * @body {
 *  time: 时间区间：一天/一周/一月,
 *  startDate: 开始时间,
 *  endDate: 结束时间,
 *  source: 订单来源 EI/EB/EP,
 * }
 */
export const getOrderTrendByTime = (body:object) => {
  return axios.get(`/api/v1/ucsp/orders/trends`, { params: body})
}

/**
 * 获取订单总金额
 * 
 * @export
 * @body {
 *  time: 时间区间：一天/一周/一月,
 *  startDate: 开始时间,
 *  endDate: 结束时间,
 *  source: 订单来源 EI/EB/EP,
 * }
 */
export const getOrderAmountByTime = (body:object) => {
  return axios.get(`/api/v1/ucsp/orders/analysis/amounts`, {params: body})
}

/**
 * 获取订单总数
 * 
 * @export
 * @body {
 * time: 时间区间：一天/一周/一月,
 *  startDate: 开始时间,
 *  endDate: 结束时间,
 *  source: 订单来源 EI/EB/EP,
 * }
 */
export const getOrderTotalByTime = (body:object) => {
  return axios.get(`/api/v1/ucsp/orders/analysis/totals`, {params: body})
}

/**
 * 获取同比环比数据
 * 
 * @export
 * @body {
 *  time: 时间区间：一天/一周/一月,
 *  startDate: 开始时间,
 *  endDate: 结束时间,
 *  source: 订单来源 EI/EB/EP,
 * }
 */
export const getRingWith = (body:object) => {
  return axios.get(`/api/v1/ucsp/orders/analysis`, {params: body})
}
