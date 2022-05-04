const ci = require("miniprogram-ci");

const main = async () => {
  const project = new ci.Project({
    appid: "wx821aadcd431646f9",
    type: "miniProgram",
    projectPath: "./client/dist/weapp",
    privateKeyPath: `./script/keys/private.wx821aadcd431646f9.key`,
    ignores: ["node_modules/**/*"],
  });

  // 静态网站
  console.log("静态网站上传中...");
  const result = await ci.cloud.uploadStaticStorage({
    project,
    env: "prod-5gkxku5cdb510bb2",
    path: "./dist/wechatShareCard",
    remotePath: "/wechatShareCard",
  });

  console.log("静态网站完毕.", result);
  console.log(
    `部署地址：https://prod-5gkxku5cdb510bb2-1259256375.tcloudbaseapp.com/wechatShareCard/index.html#/`
  );
};

// 主函数
main();
