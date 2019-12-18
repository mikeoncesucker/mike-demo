import axios from "axios";

/**
 * 菜单列表
 *
 * @export
 * @param query
 */
export const getUserResources = (userId: string) => {
  return axios.get(`/api/v1/ucsp/user/resources/${userId}`);
};

/**
 * 获取当前用户信息userId: 用户ID
 */
export const getUser = () => {
  return axios.get(`/api/v1/ucsp/user/users/info/current`);
};
