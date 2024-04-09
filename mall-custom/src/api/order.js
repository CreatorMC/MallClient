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

/**
 * 获取指定订单总金额
 * @param {*} id 订单 id
 * @returns 
 */
export function getOrderPrice(id) {
  return service.get("/order/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 支付订单
 * @param {*} dto 
 * @returns 
 */
export function payOrder(dto) {
  return service.put("/order", dto, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}