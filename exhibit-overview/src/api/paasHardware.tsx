import axios from "axios";

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
 * 查询分项重启次数
 *
 * @export
 * @param query
 */
export const getRestartNum = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/system/restartNum?language=${language}`);
};

/**
 * 查询运行中的服务占比
 *
 * @export
 * @param query
 */
export const getServerRate = (language: string) => {
  return axios.get(`/api/v1/ucsp/paas/service/runServiceBySystem?language=${language}`);
};

/**
 * 查询Iaas资源占用详情
 *
 * @export
 * @param query
 */
export const getResourceUseRate = (system: string, nodeIp: string, cb: any) => {

  return axios.get(`/api/v1/ucsp/paas/resource/list?system=${system}&nodeIp=${nodeIp}`)
};

/**
 * 查询节点列表
 *
 * @export
 * @param query
 */
export const getNodeByAll = (cb: any) => {
  return axios.get(`/api/v1/ucsp/paas/nodeByAll/list`);
};