import service from "../utils/request";

/**
 * 添加属性
 * @param {*} data 
 * @returns 
 */
export function addProperty(data) {
  return service.post("/content/property", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新属性
 * @param {*} data 
 * @returns 
 */
export function updateProperty(data) {
  return service.put("/content/property", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除属性
 * @param {*} ids 
 * @returns 
 */
export function deleteProperty(ids) {
  return service.delete("/content/property/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询单个属性
 * @param {*} id 属性 id 
 * @returns 
 */
export function getProperty(id) {
  return service.get("/content/property/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 分页查询属性列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含所属分类 id 和属性名
 * @returns 
 */
export function getPropertyList(pageNum, pageSize, dto) {
  return service.get("/content/property/list", {
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
