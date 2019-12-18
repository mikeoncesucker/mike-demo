import axios from "axios";

/**
 * 获取系统参数
 *
 * @export
 * @param query
 */
export const getSysList = () => {
  return axios.get(`/api/v1/ucsp/paas/rule/list`);
};


/**
 * 磁盘使用率
 *
 * @export
 * @param query
 */
export const getNetFlow = () => {
  return axios.get(`/api/v1/ucsp/paas/filesystemRateByDate`);
};

/**
 * 获取API调用次数统计
 *
 * @export
 * @param query
 */
export const getApiCount = () => {
  return axios.get(`/api/v1/ucsp/paas/apiInvokeCountByDay`);
};

/**
 * 查询分项资源信息列表
 *
 * @export
 * @param query
 */
export const getresourceList = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/system/resourceList?language=${language}`);
};

/**
 * 查询Iaas性能指标(CPU,内存情况)
 *
 * @export
 * @param query
 */
export const getIaasList = () => {
  return axios.get(`/api/v1/ucsp/paas/Iaas/list`);
};

/**
 * 查询分项系统列表
 *
 * @export
 * @param query
 */
export const getSubitemSystemList = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/system/systemListAndOrder?language=${language}`);
};
