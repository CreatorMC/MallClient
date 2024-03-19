import service from "../utils/request";

/**
 * 分页查询分类列表
 * @param {*} pageNum 当前第几页
 * @param {*} pageSize 每页多少条
 * @param {*} dto 包含分类名
 * @returns 
 */
export function getCategoryList(pageNum, pageSize, dto) {
  return service.get("/category/list", {
    params: {
      pageNum,
      pageSize,
      name: dto.name
    }
  });
}
