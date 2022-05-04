import sha1 from 'sha1'
/**
 * 获取使用权限签名算法
 * https://developer.work.weixin.qq.com/document/path/90506
 * @param
 * @returns
 */
const getSignature = (noncestr, timestamp, url, ticket) => {
  // console.log('getSignUrl', url)
  const sign = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
  console.log('getSignature', sign)
  return sha1(sign)
}

export default getSignature
