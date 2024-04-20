import service from "../utils/request";

/**
 * 查询当前用户的历史记录
 * @returns 
 */
export function listHistory() {
  return service.get("/history/listHistory", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

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

/**
 * 删除历史记录
 * @param {*} ids 历史记录 id 列表
 * @returns 
 */
export function deleteHistory(ids) {
  return service.delete("/history/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}