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