import axios from 'axios';

/**
 * 查询系统间调用关系竖行图
 * @export
 */
export const getCallGraph = (language: string)=> {
  return axios.get(`/api/v1/ucsp/paas/system/callGraph?language=${language}`)
}