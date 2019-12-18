import axios from "axios";

/**
 * 获取支撑系统数量
 *
 * @export
 * @param null
 */
export const getSysNum = (params: object) => {
  return axios.get(`/api/v1/ucsp/paas/system/num`);
};

/**
 * 获取数据传输次数
 *
 * @export
 * @param null
 */
export const getTransNum = (params: object) => {
  return axios.get(`/api/v1/ucsp/paas/data/num`);
};

/**
 * 获取各分项功能列表
 *
 * @export
 * @param null
 */
export const getFuncList = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/service/systemId?language=${language}`);
};

/**
 * 获取数据共享折线图数据
 *
 * @export
 * @param null
 */
export const getLineChartData = (params: object) => {
  return axios.get(`/api/v1/ucsp/paas/data/lineChart`);
};

/**
 * 获取数据共享占比饼图数据
 *
 * @export
 * @param null
 */
export const getLoopChartData = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/data/PieChart?language=${language}`);
};

/**
 * 获取登录、用户、展会、订单、事件、支付的数量
 *
 * @export
 * @param null
 */
export const getBusinessData = (params: object) => {
  return axios.get(`/api/v1/ucsp/paas/businessData`);
};

