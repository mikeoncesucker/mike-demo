import axios from "axios";

/**
 * 消息列表
 *
 * @export
 * @param {*}
 * @returns
 */
export function getNoticeList(query) {
  let { language, pageNumber, pageSize } = query;
  return axios.get(
    `/api/v1/ucsp/portal/notice/notices/${language}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
}
/**
 * 清空消息列表
 *
 * @export
 * @param {*}
 * @returns
 */
export function deleteNotice() {
  return axios.put(`/api/v1/ucsp/portal/notice/delete`, null, {
    headers: { "Content-Type": "application/json" }
  });
}
/**
* 点击单条变为已读/详情
*
* @export
* @param {*}
* @returns
*/
export function getReadById(query) {
 let { language, id } = query;
 return axios.get(
   `/api/v1/ucsp/portal/notice/read/${id}/${language}`
 );
}
/**
 * 清空某一条消息
 *
 * @export
 * @param {*}
 * @returns
 */
export function putDeleteById(id) {
  return axios.put(
    `/api/v1/ucsp/portal/notice/delete/${id}`
  );
}

