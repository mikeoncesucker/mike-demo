import axios from "axios";

/**
 * 获取用户列表
 * @export
 * @param params
 */
export const getUserList = (params: any) => {
  return axios.get(`/api/v1/ucsp/user/users`, { params });
};

/**
 * 创建用户
 * @export
 * @param body
 */
export const createUser = (body: any) => {
  return axios.post(`/api/v1/ucsp/user/users`, body);
};

/**
 * 获取用户详情
 * @export
 * @param userId: 用户ID
 */
export const getUserByUserId = (userId: string) => {
  return axios.get(`/api/v1/ucsp/user/users/${userId}`);
};

/**
 * 修改用户
 * @export
 * @param userId
 * @param body
 */
export const putUser = (userId: string, body: any) => {
  return axios.put(`/api/v1/ucsp/user/users/${userId}`, body);
};

/**
 * 修改用户状态
 *
 * @export
 * @param userId 用户ID
 * @param body
 */
export const putUserStatus = (userId: string, status: string) => {
  return axios.put(`/api/v1/ucsp/user/users/${userId}/status?status=${status}`);
};

/**
 * 查询所有用户列表
 * @export
 */
export const getAllUserList = () => {
  return axios.get(`/api/v1/ucsp/user/users/info/list`);
};

/**
 * 重置用户密码
 * @export
 * @param userId 用户ID
 */
export const resetUserPassword = (userId: string) => {
  return axios.put(`/api/v1/ucsp/user/users/${userId}/resetCredential`);
};

/**
 * 查询业务系统下的所有角色
 * @export
 */
export const getRoleByUserId = (bisiness: string, userId: string) => {
  return axios.get(`/api/v1/${bisiness}/user/users/${userId}/roles`);
};
