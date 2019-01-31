import Taro from '@tarojs/taro';

export const flatCondition = (condition) => {
  let result = '';
  if (!condition) return result;
  for (let key in condition) {
    if (result === '') {
      result += `${key}=${condition[key]}`;
    } else {
      result += `&${key}=${condition[key]}`;
    }
  }
  return result;
};

export const fetch = (url, data = {}, header) => {
  let _header = header || {};
  // 默认 header
  const _defaultHeaders = {
    'content-type': 'application/json',
    'auth': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJCYW9YdWViaW4iLCJjcmVhdGVkIjoxNTQ4OTQ4ODQ1NTE5LCJleHAiOjE1NDg5NTI0NDV9.PLQPcJT09ybm9xsfWQURivKs2_SIGhV5uL6gh4-oloQ'
  };
  _header = Object.assign({}, _defaultHeaders, header);
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      data,
      header: _header
    }).then((result) => {
      const { data, statusCode } = result;
        if (statusCode === 200) {
          const { code } = data;
          switch (code) {
            case 401:
              try {
                Taro.atMessage({ 'message': '登录身份过期', 'type': 'error', });
              } catch (error) {
                console.error(error);
              }
              reject(data);
              break;
            default:
              break;
          }
        }
        resolve(data);
    }).catch((e) => { reject(e); });
  });
};