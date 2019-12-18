import axios from "axios";

/**
 * 查询所有组织树形
 * @export
 * @param
 */
export const getOrgTreeList = () => {
  return axios.get(`/api/v1/ucsp/user/orgs`);
};

/**
 * 查询所有组织列表
 * @export
 * @param
 */
export const getOrgList = () => {
  return axios.get(`/api/v1/ucsp/user/orgs/info/list`);
};

/**
 * 创建组织
 * @export
 * @param body: {
 *
 * }
 */
export const createOrg = (body: any) => {
  return axios.post(`/api/v1/ucsp/user/orgs`, body);
};

/**
 * 查询单个组织
 * @export
 * @param orgId: 组织ID
 */
export const getOrgById = (orgId: string) => {
  return axios.get(`/api/v1/ucsp/user/orgs/${orgId}`);
};

/**
 * 修改组织
 * @export
 * @param orgId: 组织ID
 */
export const putOrg = (orgId: string, body: any) => {
  return axios.put(`/api/v1/ucsp/user/orgs/${orgId}`, body);
};

/**
 * 删除组织
 * @export
 * @param orgId: 组织ID
 */
export const deleteOrg = (orgId: string) => {
  return axios.delete(`/api/v1/ucsp/user/orgs/${orgId}`);
};
