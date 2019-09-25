import axios from 'axios';

/**
 * 搜索列表
 *
 * @export
 * @returns
 */
export function searchData(query) {
  let { searchName, page, size } = query;
  return axios.get(`/api/v1/ucsp/search/?query=${searchName}&page=${page}&size=${size}`);
}

/**
 * 事件详情
 *
 * @export
 * @returns
 */
export function getDetailById(id) {
  return axios.get(`/api/v1/ucsp/query/seach/id/${id}`);
}

/**
 * 事件类型
 *
 * @export
 * @returns
 */
export const getTypeList = async () => {
  return axios.get(`/api/v1/ucsp/event/enum/event_type_list`);
} 

/**
 * 系统名称
 *
 * @export
 * @returns
 */
export const getAppCodeList = async () => {
  return axios.get(`/api/v1/ucsp/event/enum/app_code_list`);
} 

/**
 * 事件等级
 *
 * @export
 * @returns
 */
export function getLevelList() {
  return axios.get(`/api/v1/ucsp/event/enum/event_level_list`);
}

/**
 * 事件状态
 *
 * @export
 * @returns
 */
export function getStatusList() {
  return axios.get(`/api/v1/ucsp/event/enum/event_status_list`);
}



