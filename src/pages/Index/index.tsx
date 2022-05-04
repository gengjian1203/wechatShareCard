import React, { useEffect } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Utils from "../../../utils";

import "./index.less";

export default function Index() {
  // console.log("Index", useRouter);
  const {
    path = "",
    params: {
      title = "自定义分享标题",
      desc = "自定义分享内容",
      link = "https://www.baidu.com/",
      imgUrl = "https://7072-prod-5gkxku5cdb510bb2-1259256375.tcb.qcloud.la/resource/logo-mini.jpg?sign=3d8367ff9cb4b704c447987dc35500b0&t=1651589808",
    },
  } = useRouter() || {};

  const pathReal =
    "https://prod-5gkxku5cdb510bb2-1259256375.tcloudbaseapp.com/wechatShareCard/index.html#/";

  const regConsole = () => {
    const con = require("../../../utils/lib/vconsole.min");
    // eslint-disable-next-line
    const vConsole = new con();
    console.log("vConsole", vConsole);
  };

  // 获取token
  const queryAccessToken = async () => {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: `https://code-maker-view-tool-1679438-1259256375.ap-shanghai.run.tcloudbase.com/api/get/getJsapiTicketAccounts`,
        complete: (res: any) => {
          const token = res?.data?.body?.ticket || "";
          console.log("queryAccessToken", res);
          console.log("queryAccessToken", res?.data?.body?.ticket);
          resolve(token);
        },
      });
    });
  };

  // 注册事件
  const regConfig = () => {
    const titleReal = decodeURIComponent(title);
    const descReal = decodeURIComponent(desc);
    const linkReal = decodeURIComponent(link);
    const imgUrlReal = decodeURIComponent(imgUrl);

    const linkShare = Utils.routerAppendParams(pathReal, {
      title: titleReal,
      desc: descReal,
      link: linkReal,
      imgUrl: imgUrlReal,
    });
    console.log("regConfig", linkShare);
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
    wx &&
      wx.updateAppMessageShareData({
        title: titleReal, // 分享标题
        desc: descReal, // 分享描述
        link: linkShare, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrlReal, // 分享图标
        success: () => {
          // 设置成功
        },
      });
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
    wx &&
      wx.updateTimelineShareData({
        title: titleReal, // 分享标题
        link: linkShare, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrlReal, // 分享图标
        success: () => {
          // 设置成功
        },
      });
  };

  const loadPage = async () => {
    //
    regConsole();
    //
    const token = await queryAccessToken();
    console.log("loadPage", token);
    const res = await Utils.initConfig(token);
    if (res) {
      regConfig();
    } else {
      Taro.showToast({
        title: "注册失败",
        icon: "none",
      });
    }
  };

  useEffect(() => {
    loadPage();
  });

  return (
    <View className="indexWrap">
      <View className="iconLoading" />
    </View>
  );
}
