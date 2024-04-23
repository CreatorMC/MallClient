import service from "../utils/request";

/**
 * 分页查询商品列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含商品名和商品分类 id
 * @returns 
 */
export function getProductList(pageNum, pageSize, dto) {
  return service.get("/product/list", {
    params: {
      pageNum,
      pageSize,
      categoryId: dto.categoryId,
      name: dto.name
    }
  });
}

/**
 * 查询商品推荐列表
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @returns 
 */
export function getRecommendedProductList(pageNum, pageSize) {
  return service.get("/product/listRecommendedProductList", {
    params: {
      pageNum,
      pageSize
    },
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询单个商品
 * @param {*} id 商品 id
 * @returns 
 */
export function getProduct(id) {
  return service.get("/product/" + id);
}