import Cookies from 'js-cookie';
const tokenKey = 'Admin-Token'
// 存
export function setToken (token) {
  return Cookies.set(tokenKey,token)
}
// 取
export function getToken () {
  return Cookies.get(tokenKey)
}
//删除
export function removeToken () {
  return Cookies.remove(tokenKey)
}