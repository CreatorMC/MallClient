import service from "../utils/request";

/**
 * 获取当前用户信息
 * @returns 
 */
export function userInfo() {
  return service.get("/user/userInfo", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 获取指定id的用户信息
 * @param {*} id 用户id
 * @returns 
 */
export function getUserInfo(id) {
  return service.get(`/user/${id}`);
}

/**
 * 获取当前用户余额
 * @returns 
 */
export function getUserBalance() {
  return service.get("/user/balance", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 用户注册
 * @param {*} data 
 * @returns 
 */
export function register(data) {
  return service.post("/user/register", data);
}

/**
 * 更新用户信息
 * @param {*} file 头像文件
 * @param {*} email 邮箱
 * @param {*} nickName 昵称
 * @param {*} sex 性别（0男，1女，2未知）
 * @returns 
 */
export function updateUserInfo(file, email, nickName, sex) {
  const data = new FormData();
  data.append('file', file);
  data.append('email', email);
  data.append('nickName', nickName);
  data.append('sex', sex);
  return service.put("/user/userInfo", data, {
    headers: {
      "token": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data"
    }
  })
}

/**
 * 更新用户密码
 * @param {*} data 
 * @returns 
 */
export function updateUserPassword(data) {
  return service.put("/user/userPassword", data);
}