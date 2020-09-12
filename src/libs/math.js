/**
 * 精确加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accAdd = (arg1, arg2) => {
  arg1 = arg1.toString()
  arg2 = arg2.toString()
  let arg1Arr = arg1.split('.')
  let arg2Arr = arg2.split('.')
  let d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
  let d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
  let maxLen = Math.max(d1.length, d2.length)
  let m = Math.pow(10, maxLen)
  let result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen))
  let d = arguments[2]
  return typeof d === 'number' ? Number((result).toFixed(d)) : result
}

/**
 * 精确减法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accSub = (arg1, arg2) => {
  return accAdd(arg1, -arg2)
}

/**
 * 精确乘法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accMul = (arg1, arg2) => {
  let r1 = arg1.toString()
  let r2 = arg2.toString()
  let m
  let resultVal
  let d = arguments[2]
  m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
  resultVal = Number(r1.replace('.', '')) * Number(r2.replace('.', '')) / Math.pow(10, m)
  return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
}

/**
 * 精确除法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const accDiv = (arg1, arg2) => {
  let r1 = arg1.toString()
  let r2 = arg2.toString()
  let m
  let resultVal
  let d = arguments[2]
  m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0)
  resultVal = Number(r1.replace('.', '')) / Number(r2.replace('.', '')) * Math.pow(10, m)
  return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
}
