import service from "../utils/request";

/**
 * 获取商品对应的属性和属性值对象
 * @param {*} id 商品 id
 * @returns 
 */
export function getCustomProperty(id) {
  return service.get("/property/" + id);
}