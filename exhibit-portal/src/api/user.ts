import axios from 'axios';

/**
 * 登录
 *
 * @export
 * @param {*}
 * @returns
 */
export function login(data) {
	return axios.post('/api/v1/usup/sso/login', data, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 登录时获取验证码
 *
 * @export
 * @param {*}
 * @returns
 */
export function postCodeForLogin(data) {
	return axios.post('/api/v1/ucsp/user/validation/login', data, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 退出登录
 *
 * @export
 * @param {*}
 * @returns
 */
export function logout(params) {
	return axios.post('/api/v1/usup/sso/logout', params, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 获取验证码
 *
 * @export
 * @param {*}
 * @returns
 */
export function postCodeByVerify(params) {
	return axios.post('/api/v1/ucsp/user/email/verify', params, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 忘记密码重新设置密码
 *
 * @export
 * @param {*}
 * @returns
 */
export function postResetPassWordByVerify(params) {
	return axios.post('/api/v1/ucsp/user/forget/modify', params, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 知道原密码重新设置密码
 *
 * @export
 * @param {*}
 * @returns
 */
export function putPasswordByUserId(userId,body) {
	return axios.put(`/api/v1/ucsp/user/users/${userId}/changeCredential`, body, {
		headers: { 'Content-Type': 'application/json' }
	});
}
/**
 * 获取设置密码的规则
 *
 * @export
 * @param {*}
 * @returns
 */
export function getCredentialRule() {
	return axios.get(`/api/v1/ucsp/user/credential_rule`)
}
/**
 * 获取用户信息
 *
 * @export
 * @param {*}
 * @returns
 */
export function getUserInfo(params) {
	return axios.post('/api/v1/usup/sso/authentication', params, {
		headers: { 'Content-Type': 'application/json' }
	});
}


