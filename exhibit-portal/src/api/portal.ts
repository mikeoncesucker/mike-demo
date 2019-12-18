import axios from "axios";

/**
 * 展示栏卡片列表
 *
 * @export
 * @returns
 */
export function allCards(language) {
  return axios.get(`/api/v1/ucsp/portal/cards/completes/${language}`);
}

/**
 * 用户保存常用卡片
 *
 * @export
 * @param {*} data
 * @returns
 */
export function saveCards(data) {
  return axios.put("/api/v1/ucsp/portal/cards/settings", data, {
    // headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * 主题切换
 *
 * @export
 * @param {*} theme
 * @returns
 */
export function changeTheme(theme) {
  return axios.put(`/api/v1/ucsp/portal/cards/themes/${theme}`);
}

/**
 * 搜索卡片 拖动栏卡片列表
 *
 * @export
 * @param {*} searchName
 * @returns
 */
export function searchCards(searchName, language) {
  return axios.get(
    `/api/v1/ucsp/portal/cards/todos/${language}?searchName=${searchName}`
  );
}

/**
 * 获取当前语言
 *
 * @export
 * @param {*}
 * @returns
 */
export function getCurrentLanguage() {
  return axios.get("/api/v1/ucsp/portal/user/language");
}

/**
 * 设置显示的语言
 *
 * @export
 * @param {*}
 * @returns
 */
export function setLanguage(params) {
  return axios.post("/api/v1/ucsp/portal/user/language/setting", params, {
    headers: { "Content-Type": "application/json" }
  });
}

/**
 * 验证用户访问子系统权限
 *
 * @export
 * @param {*}
 * @returns
 */
export function getSystemAuthorityByName(shorName,userId) {
  return axios.get(`/api/v1/${shorName}/user/access/${userId}`, {
    headers: { "Content-Type": "application/json" }
  });
}
