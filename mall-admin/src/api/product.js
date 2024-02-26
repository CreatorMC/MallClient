import service from "../utils/request";

/**
 * 分页查询商品列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含商品名和商品分类 id
 * @returns 
 */
export function getProductList(pageNum, pageSize, dto) {
  return service.get("/content/product/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      categoryId: dto.categoryId,
      name: dto.name
    }
  });
}

/**
 * 添加商品
 * @param {*} data 
 * @returns 
 */
export function addProduct(data) {
  return service.post("/content/product", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除商品
 * @param {*} ids 商品id列表
 * @returns 
 */
export function deleteProduct(ids) {
  return service.delete("/content/product/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}