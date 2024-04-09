import service from "../utils/request";

/**
 * 添加订单
 * @param {*} dto 
 * @returns 
 */
export function addOrder(dto) {
  return service.post("/order", dto, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}