import axios from "axios";

/**
 * 通知列表
 *
 * @export
 * @param {*} searchName
 * @returns
 */
export function noticeList(language) {
  return axios.get(`/api/v1/ucsp/portal/notice/unreads/${language}`);
}
/**
 * portal页清空通知列表
 *
 * @export
 * @param {*} searchName
 * @returns
 */
export function resetNoticeList() {
  return axios.put(`/api/v1/ucsp/portal/notice/read`);
}
