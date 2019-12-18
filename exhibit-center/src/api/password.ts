import axios from "axios";

/**
 * 修改密码
 *
 * @export
 * @param query
 */
export const putPassword = (userId: string, body: object) => {
  return axios.put(`/api/v1/ucsp/user/users/${userId}/changeCredential`, body);
};
