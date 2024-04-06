import service from "../utils/request";

/**
 * 获取当前用户的地址列表
 * @returns 
 */
 export function listAddresses() {
  return service.get("/address", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}