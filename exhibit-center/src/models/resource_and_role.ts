import {
  querySysList,
  addBusiSys,
  editBusiSys,
  querySysById,
  queryRoleList,
  addRole,
  queryRoleById,
  editRole,
  deleteRole,
  queryRoleResources,
  queryRoleUsers,
  addRoleUsers,
  queryOrgList,
  queryOrgUsers,
  queryUserByName,
  addRoleResources,
  queryResourcesList
} from "../api/resource_and_role";
import { number } from "prop-types";

export const resource_and_role = {
  state: {
    sysList: [],
    sysInfo: [],
    roleList: [],
    roleInfo: [],
    roleTotal: number,
    roleUsers: [],
    roleResource: [],
    orgList: [],
    resourceList: []
  },
  reducers: {
    setSysList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetSysList(state: any, payload: any) {
      return Object.assign(state, { sysList: [] });
    },
    setSysInfo(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetSysInfo(state: any, payload: any) {
      return Object.assign(state, { sysInfo: [] });
    },
    setRoleList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRoleList(state: any, payload: any) {
      return Object.assign(state, { roleList: [], roleTotal: number });
    },
    setRoleInfo(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRoleInfo(state: any, payload: any) {
      return Object.assign(state, { roleInfo: [] });
    },
    setRoleUsers(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRoleUsers(state: any, payload: any) {
      return Object.assign(state, { roleUsers: [] });
    },
    setRoleResource(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    setResourceList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetRoleResource(state: any, payload: any) {
      return Object.assign(state, { roleResource: [] });
    },
    setOrgList(state: any, payload: any) {
      return Object.assign({}, state, payload);
    },
    resetOrgList(state: any, payload: any) {
      return Object.assign(state, { orgList: [] });
    }
  },
  effects: (dispatch: any) => ({
    async querySysList({ params, cb }: any, rootState?: any) {
      await querySysList(params).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setSysList({ sysList: res.data.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async addBusiSys({ params, cb }: any, rootState?: any) {
      await addBusiSys(params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async editBusiSys({ id, params, cb }: any, rootState?: any) {
      await editBusiSys(id, params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async querySysById({ id, cb }: any, rootState?: any) {
      await querySysById(id).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setSysInfo({ sysInfo: res.data.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryRoleList({ identifier, params, cb }: any, rootState?: any) {
      await queryRoleList(identifier, params).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setRoleList({
            roleList: res.data.data,
            roleTotal: res.data.totalRecords
          });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryRoleById({ identifier, id, cb }: any, rootState?: any) {
      await queryRoleById(identifier, id).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setRoleInfo({ roleInfo: res.data.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async addRole({ identifier, params, cb }: any, rootState?: any) {
      await addRole(identifier, params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async editRole({ identifier, id, params, cb }: any, rootState?: any) {
      await editRole(identifier, id, params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async deleteRole({ identifier, id, cb }: any, rootState?: any) {
      await deleteRole(identifier, id).then((res: any) => {
        if (res.data.code === '200') {
          cb && cb(null, res.data);
        }
      });
    },
    async queryResourcesList({ identifier, cb }: any, rootState?: any) {
      await queryResourcesList(identifier).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setResourceList({
            resourceList: res.data.data.children || res.data.data
          });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryRoleResources({ identifier, id, cb }: any, rootState?: any) {
      await queryRoleResources(identifier, id).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setRoleResource({
            roleResource: res.data.data && (res.data.data.children || res.data.data)
          });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryRoleUsers({ identifier, id, cb }: any, rootState?: any) {
      await queryRoleUsers(identifier, id).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setRoleUsers({
            roleUsers: res.data.data.users !== undefined ?  res.data.data.users : res.data.data
          });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async addRoleUsers({ identifier, id, params, cb }: any, rootState?: any) {
      await addRoleUsers(identifier, id, params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryOrgList(cb: any) {
      await queryOrgList().then((res: any) => {
        if (res.status === 200 && res.data.code === '200') {
          dispatch.resource_and_role.setOrgList({ orgList: res.data.data });
          cb && cb(res.data.data);
        } else {
        }
      });
    },
    async queryOrgUsers({ id, cb }: any, rootState?: any) {
      await queryOrgUsers(id).then((res: any) => {
        if (res.status === 200) {
          dispatch.resource_and_role.setRoleUsers({ roleUsers: res.data.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async queryUserByName({ params, cb }: any, rootState?: any) {
      await queryUserByName(params).then((res: any) => {
        if (res.status === 200 && res.data.code === '200') {
          dispatch.resource_and_role.setRoleUsers({ roleUsers: res.data.data });
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },
    async addRoleResources(
      { identifier, id, params, cb }: any,
      rootState?: any
    ) {
      await addRoleResources(identifier, id, params).then((res: any) => {
        if (res.status === 200) {
          cb && cb(null, res.data);
        } else {
          cb && cb(new Error());
        }
      });
    },

    async resetSysLists() {
      dispatch.resource_and_role.resetSysList();
    },
    async resetSysInfos() {
      dispatch.resource_and_role.resetSysInfo();
    },
    async resetRoleLists() {
      dispatch.resource_and_role.resetRoleList();
    },
    async resetRoleInfos() {
      dispatch.resource_and_role.resetRoleInfo();
    },
    async resetRoleResources() {
      dispatch.resource_and_role.resetRoleResource();
    },
    async resetRoleUserss() {
      dispatch.resource_and_role.resetRoleUsers();
    },
    async resetOrgLists() {
      dispatch.resource_and_role.resetOrgList();
    }
  })
};
