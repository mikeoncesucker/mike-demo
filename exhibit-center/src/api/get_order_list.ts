import axios from "axios";

/**
 * 获取订单列表
 *
 * @export
 * @param query
 */
export const getOrderList = (data: object) => {
    return axios.get(`/api/v1/ucsp/orders`, {params: data})
  }

/**
 * 获取订单详情
 *
 * @export
 * @param query id:订单ID
 */
export const getOrderDetail = (id: string) => {
  return axios.get(`/api/v1/ucsp/orders/${id}`)
}