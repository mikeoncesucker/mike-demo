import axios from "axios";

/**
 * 查询业务系统列表
 *
 * @export
 * @param {
 *  userId: 用户id
 *  name: 系统名称
 * }
 */
export const querySysList = (params: object) => {
  return axios.get(`/api/v1/ucsp/user/systems`, { params });
};

/**
 * 根据id查询业务系统
 *
 * @export
 * @param {
 *  id: 用户id
 * }
 */
export const querySysById = (id: string) => {
  return axios.get(`/api/v1/ucsp/user/systems/${id}`);
};

/**
 * 新增业务系统
 *
 * @export
 * @param {
 *  description: 描述
 *  id: 系统id
 *  name: 名字
 *  path: 路径
 * }
 */
export const addBusiSys = (params: object) => {
  return axios.post(`/api/v1/ucsp/user/systems`, params);
};

/**
 * 修改业务系统
 *
 * @export
 * @param {
 *  description: 描述
 *  name: 名字
 *  path: 路径
 *  updatedAt 修改时间
 * }
 */
export const editBusiSys = (id: string, params: object) => {
  return axios.put(`/api/v1/ucsp/user/systems/${id}`, params);
};

/**
 * 查询角色列表
 *
 * @export
 * @param {
 *  roleId: 角色id
 * }
 */
export const queryRoleList = (identifier: any, params: object) => {
  return axios.get(`/api/v1/${identifier}/user/roles`, { params });
};

/**
 * 创建角色
 *
 * @export
 * @param {
 *  description: 描述
 *  id: 角色id
 *  name: 名字
 *  path: 路径
 * }
 */
export const addRole = (identifier: string, params: object) => {
  return axios.post(`/api/v1/${identifier}/user/roles`, params);
};

/**
 * 根据id查询角色
 *
 * @export
 * @param {
 *  id: 角色id
 * }
 */
export const queryRoleById = (identifier: string, id: string) => {
  return axios.get(`/api/v1/${identifier}/user/roles/${id}`);
};

/**
 * 修改角色
 *
 * @export
 * @param {
 *  description: 描述
 *  id: 角色id
 *  name: 名字
 *  path: 路径
 * }
 */
export const editRole = (identifier: string, id: string, params: object) => {
  return axios.put(`/api/v1/${identifier}/user/roles/${id}`, params);
};

/**
 * 删除角色
 *
 * @export
 * @param {
 *  id: 角色id
 * }
 */
export const deleteRole = (identifier: string, id: string) => {
  return axios.delete(`/api/v1/${identifier}/user/roles/${id}`);
};

/**
 * 查询角色资源关系
 *
 * @export
 * @param
 * roleId: 角色id
 */
export function queryRoleResources(identifier: string, roleId: string) {
  return axios.get(`/api/v1/${identifier}/user/roles/${roleId}/resources`);
}

/**
 * 创建角色资源关系
 *
 * @export
 * @param {
 *  roleId: 角色id
 *  resourceIds: 资源id
 * }
 */
export function addRoleResources(
  identifier: string,
  roleId: string,
  params: object
) {
  return axios.post(
    `/api/v1/${identifier}/user/roles/${roleId}/resources`,
    params
  );
}

/**
 * 查询资源列表
 *
 * @export
 * @param {
 * }
 */
export function queryResourcesList(identifier: string) {
  return axios.get(`/api/v1/${identifier}/user/resources`);
}

/**
 * 删除角色资源关系
 *
 * @export
 * @param {
 *  resourceIds: 资源id
 * }
 */
export function deleteRoleResources(
  identifier: string,
  roleId: string,
  params: object
) {
  return axios.delete(
    `/api/v1/${identifier}/user/roles/${roleId}/resources`,
    params
  );
}

/**
 * 查询角色用户关系
 *
 * @export
 * @param
 * roleId: 角色id
 */
export function queryRoleUsers(identifier: string, roleId: string) {
  return axios.get(`/api/v1/${identifier}/user/roles/${roleId}/users`);
}

/**
 * 创建角色用户关系
 *
 * @export
 * @param {
 *  roleId: 角色id
 *  userIds: 用户id
 * }
 */
export function addRoleUsers(
  identifier: string,
  roleId: string,
  params: object
) {
  return axios.post(`/api/v1/${identifier}/user/roles/${roleId}/users`, params);
}

/**
 * 删除角色用户关系
 *
 * @export
 * @param {
 *  roleId: 角色id
 *  userIds: 用户id
 * }
 */
export function deleteRoleUsers(identifier: string, roleId: string, parmas: object) {
  return axios.delete(`/api/v1/${identifier}/user/roles/${roleId}/users`, parmas);
}

/**
 * 查询所有组织树形
 *
 * @export
 * @param
 */
export function queryOrgList() {
  return axios.get(`/api/v1/ucsp/user/orgs`);
}

/**
 * 查询组织用户列表
 *
 * @export
 * @param
 * orgId: 组织id
 */
export function queryOrgUsers(orgId: string) {
  return axios.get(`/api/v1/ucsp/user/orgs/${orgId}/users`);
}

/**
 * 搜索用户
 * @export
 * @param params
 */
export const queryUserByName = (params: any) => {
  return axios.get(`/api/v1/ucsp/user/users`, { params });
};