import { fetch } from './req';
import * as qiniu from 'qiniu-js';

export const fetchQiniuToken = type => fetch(`https://xdbin.com/api/v1/qiniu/token?type=${type}`);
export const upload = file => new Promise((resolve) => {
  fetchQiniuToken()
    .then((res) => {
      const { key, token } = res;
      console.log(qiniu);
      const observable = qiniu.upload(
        file,
        key,
        token,
        { region: qiniu.region.z0 }
      );
      observable.subscribe({
        complete(res) {
          resolve(res);
        }
      });
    });
})