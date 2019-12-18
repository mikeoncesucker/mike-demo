import axios from "axios";

/**
 * 获取密码策略
 *
 * @export
 * @param query
 */
export const getPasswordPolicies = (query: string) => {
  return axios.get("/api/v1/ucsp/user/credential_policy");
};

export const putPasswordPolicies = (body: object) => {
  return axios.put("/api/v1/ucsp/user/credential_policy", body);
};
