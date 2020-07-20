// 前端常量集合

// 空href
const NULL_HREF_STR = 'javascript:;'

// 常用正则表达式
const COMMON_REG = {
  PASSWORD: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,20}$/,
  CHINESE: /[^u4e00-u9fa5]/,
  CHINESEXSTR: /^[u4e00-u9fa5_a-zA-Z0-9]+$/,
  PRICE: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  EMAIL: /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/,
  NUMXSTR: /^[A-Za-z0-9._]+$/,
  NUMSTR: /^\d+$/,
  CODE: /^[\w\d_\-+.]*$/,
  URL: /^(http|https|ftp):\/\/[a-z0-9\-.]+.[a-z]{2,3}(:[a-z0-9]*)?\/?([a-z0-9-._?,'+&amp;%$#=~])*$/,
  TEL: /^(0\d{2,3}-\d{7,8})$/,
  FAX: /^(0\\d{2,3}-\d{7,8})$/,
  MOBILE: /^(1[35847]\d{9})$/,
  QQ: /^[1-9][0-9]{4,9}$/,
  GUID: /^[A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12}$/,
  XGUID: /^[A-Za-z0-9]{32}$/,
  ZIPCODE: /^\d{6}$/,
  DATE: /^\d{4}[.|-|/][0|1]?\d{1}[.|-|/][0-3]?\d{1}$/,
  IP: /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9]).(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d).(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d).(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/,
}

const HTTP_CODE = {
  StatusOK: 1,
  OK: 200,
  NotModified: 304,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  ServerError: 500,
  NotImplemented: 501,
  ServiceUnavailable: 503,
}

export { NULL_HREF_STR, COMMON_REG, HTTP_CODE }
