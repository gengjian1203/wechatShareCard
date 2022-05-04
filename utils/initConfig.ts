import getNoncestr from "./getNoncestr";
import getTimestamp from "./getTimestamp";
import getUrl from "./getUrl";
import getSignature from "./getSignature";

/**
 * 通过config接口注入权限验证配置
 * https://developer.work.weixin.qq.com/document/path/90514
 * @param token 企业微信id
 * @returns
 */
const initConfig = async (token) => {
  const noncestr = getNoncestr();
  const timestamp = getTimestamp();
  const url = getUrl();
  const signature = getSignature(noncestr, timestamp, url, token);
  console.log("jsapi_ticket", token);
  console.log("noncestr", noncestr);
  console.log("timestamp", timestamp);
  console.log("url", url);

  return new Promise((resolve) => {
    try {
      wx &&
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
          appId: "wx0817d49f468d5233", // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
      wx &&
        wx.ready(function () {
          resolve(true);
          console.log("initConfig end.");
        });
      wx &&
        wx.error(async function (res) {
          console.error("initConfig wx.error", res);
          resolve(false);
        });
    } catch (e) {
      console.error("initConfig", e);
      resolve(false);
    }
  });
};

export default initConfig;
