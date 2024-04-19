import service from "../utils/request";

/**
 * 添加历史记录
 * @param {*} id 商品 id
 * @returns 
 */
export function addHistory(id) {
  return service.post("/history", id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}