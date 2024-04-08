import service from "../utils/request";

/**
 * 添加商品到购物车
 * @param {*} dto 
 * @returns 
 */
export function addCart(dto) {
  return service.post("/cart", dto, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新购物车项
 * @param {*} dto 
 * @returns 
 */
export function updateCart(dto) {
  return service.post("/cart/updateCart", dto, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 获取当前用户的购物车
 * @returns 
 */
export function getCart() {
  return service.get("/cart", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 获取当前用户选中的购物车项列表
 * @param {*} ids 购物车项 id 列表
 * @returns 
 */
export function getSelectedCart(ids) {
  return service.get("/cart/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除购物车项
 * @param {*} ids 
 * @returns 
 */
export function deleteCart(ids) {
  return service.delete("/cart/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}