import axios from 'axios';

/**
 * 拓扑图轮播
 * @export
 */
export const getTopological = (language: string)=> {
  return axios.get(`/api/v1/ucsp/paas/system/systemListAndOrder?language=${language}`)
}

