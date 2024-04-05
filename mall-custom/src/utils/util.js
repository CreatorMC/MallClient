/**
 * 将金额转换为 xxx.xx 元的格式
 * 
 * 具体格式：
 * 
 * 100
 * 
 * 100.5
 * 
 * 100.01
 * @param {Number|String} balance 金额，类型可以是字符串，或者数字
 * @returns 
 */
export function parseBalance(balance) {
  if(balance == null || balance == "") {
    return "无";
  }
  let numStr = balance;
  if(Number.isInteger(balance)) {
    numStr = String(balance);
  }
  if(numStr.length < 3) {
    let temp = "0";
    if(numStr.length == 2) {
      temp += numStr; 
    } else if(numStr.length == 1) {
      temp += "0" + numStr;
    }
    numStr = temp;
  }
  let result = numStr.substring(0, numStr.length - 2);
  let jiao = numStr.substring(numStr.length - 2, numStr.length - 1);
  let fen = numStr.substring(numStr.length - 1);
  //如果角和分，有一个不等于 0，说明存在小数。
  if(jiao != "0" || fen != "0") {
    result += "." + jiao;
    if(fen != "0") {
      result += fen;
    }
  }
  return result;
}

/**
 * 判断两个对象的值是否相等
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
export function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
 
  if (!obj1 || !obj2) {
    return false;
  }
 
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
 
  if (keys1.length !== keys2.length) {
    return false;
  }
 
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
 
  return true;
}