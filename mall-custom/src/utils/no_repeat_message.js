import { ElMessageBox } from 'element-plus' //引入message弹出框
 
let messageDom = null
const resetMessage = (options) => {
  // 判断弹窗是否已存在,若存在则关闭
  if (messageDom) {
    ElMessageBox.close()
  }
  messageDom = ElMessageBox(options)
  return messageDom
}
export const message = resetMessage