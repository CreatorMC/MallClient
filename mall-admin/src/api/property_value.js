import service from "../utils/request";

/**
 * 添加属性值
 * @param {*} data 
 * @returns 
 */
export function addPropertyValue(data) {
  return service.post("/content/property_value", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 更新属性值
 * @param {*} data 
 * @returns 
 */
export function updatePropertyValue(data) {
  return service.put("/content/property_value", data, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 删除属性值
 * @param {*} ids 
 * @returns 
 */
export function deletePropertyValue(ids) {
  return service.delete("/content/property_value/" + ids, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 查询单个属性值
 * @param {*} id 属性值 id 
 * @returns 
 */
export function getPropertyValue(id) {
  return service.get("/content/property_value/" + id, {
    headers: {
      "token": localStorage.getItem("token")
    }
  });
}

/**
 * 分页查询属性值列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含所属商品 id、所属属性 id、属性值内容
 * @returns 
 */
export function getPropertyValueList(pageNum, pageSize, dto) {
  return service.get("/content/property_value/list", {
    headers: {
      "token": localStorage.getItem("token")
    },
    params: {
      pageNum,
      pageSize,
      productId: dto.productId,
      propertyId: dto.propertyId,
      value: dto.value
    }
  });
}
