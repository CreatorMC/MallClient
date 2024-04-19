import service from "../utils/request";

/**
 * 添加收藏
 * @param {*} id 商品 id
 * @returns 
 */
export function addStar(id) {
  return service.post("/star", id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询指定商品是否被当前用户收藏了
 * @param {*} id 商品 id
 * @returns 
 */
export function getIsStar(id) {
  return service.get("/star/getIsStar/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 取消收藏
 * @param {*} ids 商品 id 列表
 * @returns 
 */
export function deleteStar(ids) {
  return service.delete("/star/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}