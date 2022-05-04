/**
 * 获取当前网页的URL， 不包含#及其后面部分
 * 确认url是页面完整的url(请在当前页面alert(location.href.split('#')[0])确认)，包括'http(s)://'部分，以及'？'后面的GET参数部分,但不包括'#'hash后面的部分。
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62
 * @param
 * @returns
 */
const getUrl = () => {
  // const url1 = window.location.href.split("#")[0];
  // const url2 = window.location.href.split("?")[1];
  // return `${url1}${url2}`;
  // return window.location.href.replace("#", "");
  return window.location.href.split("#")[0];
};

export default getUrl;
