import router2Params from "./router2Params";

/**
 * 构造路由字符串，可尾部追加传参
 * @param {string} strPath 原路由字符串
 * @param {any} objParams 参数对象
 * @param {
 *    {string} order 参数覆盖优先级 'append' - 以追加参数优先级高 | 'source' - 以原路由携带参数优先级高
 *    {boolean} encode 参数是否编码 true - 将参数编码 | false - 将参数不编码
 * } objExtend 拓展功能对象
 * @returns 追加参数后的路由字符串
 */
export const routerAppendParams = (
  strPath = "",
  objParams = {},
  objExtend = {}
) => {
  const { order = "append", encode = true } = objExtend || {};
  const { path: sourcePath = "", params: sourceParams = {} } =
    router2Params(strPath);
  // console.log("routerAppendParams", sourcePath, sourceParams);
  let strResult = sourcePath;
  let mergeParams =
    order === "append"
      ? {
          ...sourceParams,
          ...objParams, // 以追加参数优先级高
        }
      : {
          ...objParams,
          ...sourceParams, // 以原路由携带参数优先级更高
        };

  if (mergeParams && JSON.stringify(mergeParams) !== "{}") {
    let isFirstParam = !sourcePath.includes("?");
    Object.keys(mergeParams).forEach((key) => {
      if (isFirstParam) {
        strResult += `?${key}=${
          encode ? encodeURIComponent(mergeParams[key]) : mergeParams[key]
        }`;
        isFirstParam = false;
      } else {
        strResult += `&${key}=${
          encode ? encodeURIComponent(mergeParams[key]) : mergeParams[key]
        }`;
      }
    });
  }
  return strResult;
};

export default routerAppendParams;
