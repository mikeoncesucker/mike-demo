import axios from "axios";

/**
 * 查询系统间数据接口调度情况
 * @export
 */
export const getDispatchData = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/data/dispatch?language=${language}`);
};

/**
 * 查询数据调用次数趋势(日期,调用成功次数,调用失败次数).
 * @export
 */
export const getTrend = () => {
  return axios.get(`/api/v1/ucsp/paas/data/trend`);
};

/**
 * 获取分项 API 调用列表(分项名,分项 api 调用成功数,分项 api 调用失败数,分项 api 调用总数).
 * @export
 */
export const getApiListBySystem = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/apiListBySystem?language=${language}`);
};

/**
 * 根据分项查询失败列表
 * @export
 */
export const getFailListByShortName = (shortName: string) => {
  return axios.get(
    `/api/v1/ucsp/paas/failBySystem/list?shortName=${shortName}`
  );
};

/**
 * 查询 API 调用情况圆饼图
 * @export
 */
export const getPieChart = () => {
  return axios.get(`/api/v1/ucsp/paas/service/pieChart`);
};

/**
 * 查询系统间数据接口调度详情
 * @export
 */
export const getApiList = (id: string) => {
  return axios.get(`/api/v1/ucsp/paas/data/apiList`);
};
