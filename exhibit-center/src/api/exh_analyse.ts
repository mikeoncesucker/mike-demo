import axios from "axios";

/**
 * 获取展会下拉列表
 *
 * @export
 * @param query
 */
export const getExhList = (params: object) => {
    return axios.get(`/api/v1/ucsp/orders/expoNames`, {params})
  }

/**
 * 根据展会名称获取展会分析
 *
 * @export
 * @param query
 */
export const exhAnalysis = (params: object) => {
  return axios.get(`/api/v1/ucsp/orders/expoAnalysis`, {params})
}

/**
 * 获取展会概览数据
 *
 * @export
 * @param query
 */
export const exhOverview = (params: object) => {
  return axios.get(`/api/v1/ucsp/orders/expoGeneral`, {params})
}