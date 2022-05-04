/**
 * 生成签名的时间戳
 * https://developer.work.weixin.qq.com/document/path/90506
 * @param
 * @returns
 */
const getTimestamp = () => {
  return new Date().valueOf()
}

export default getTimestamp
