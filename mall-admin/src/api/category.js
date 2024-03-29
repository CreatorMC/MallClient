import service from "../utils/request";

/**
 * 添加分类
 * @param {*} data 
 * @returns 
 */
export function addCategory(data) {
  return service.post("/content/category", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新分类
 * @param {*} data 
 * @returns 
 */
export function updateCategory(data) {
  return service.put("/content/category", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除分类
 * @param {*} ids 
 * @returns 
 */
export function deleteCategory(ids) {
  return service.delete("/content/category/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询所有分类
 * @returns 
 */
export function getAllCategory() {
  return service.get("/content/category/listAllCategory", {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询单个分类
 * @param {*} id 分类 id 
 * @returns 
 */
export function getCategory(id) {
  return service.get("/content/category/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 分页查询分类列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含分类名
 * @returns 
 */
export function getCategoryList(pageNum, pageSize, dto) {
  return service.get("/content/category/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      name: dto.name
    }
  });
}
