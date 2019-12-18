import axios from "axios";

/**
 * 查询用户操作日志列表
 * @export
 */
export const getOperationLogList = (params: any) => {
    return axios.get(`/api/v1/ucsp/user/opt/list`, { params });
};






