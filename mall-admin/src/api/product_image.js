import service from "../utils/request";

/**
 * 上传商品图片
 * @param {*} data 
 * @returns url
 */
export function addProductImage(data, options) {
  return service.post("/content/product_image", data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'token': localStorage.getItem("token")
    },
    onUploadProgress(evt) {
      const progressEvt = { 
        percent: 0
      };
      progressEvt.percent = evt.total > 0 ? (evt.loaded / evt.total) * 100 : 0;
      options.onProgress(progressEvt);
    }
  });
}