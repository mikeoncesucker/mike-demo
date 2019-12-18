import axios from "axios";

/**
 * 查询业务系统
 *
 * @export
 * @param query
 */
export const getBisiness = (userId?: string) => {
  return axios.get(
    `/api/v1/ucsp/user/systems${userId ? `?userId=${userId}` : ""}`
  );
};

/**
 * 查询业务系统下的角色
 *
 * @export
 * @param query
 */
export const getRoleByBisiness = (bisiness: string) => {
  return axios.get(`/api/v1/${bisiness}/user/roles`);
};

/**
 * 查询角色下的资源
 *
 * @export
 * @param query
 */
export const getResourcesByRole = (bisiness: string, roleId: string) => {
  return axios.get(`/api/v1/${bisiness}/user/roles/${roleId}/resources`);
};
