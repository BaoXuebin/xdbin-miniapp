import { fetch } from './req';
import * as qiniu from 'qiniu-js';

const qiniuUploader = require('./qiniuUploader');

const fetchQiniuToken = type => fetch(`https://xdbin.com/api/v1/qiniu/token?type=${type}`);
export const upload = async ({ files, success, error, progress }) => {
    console.log(files);
    const res = await fetchQiniuToken('video');
    if (files && files.length > 0) {
        files.forEach((file) => {
            if (!res) return;
            const { key, token } = res;
            qiniuUploader.upload(
                file.url,
                success, error,
                {
                    region: 'ECN',
                    domain: 'bzkdlkaf.bkt.clouddn.com',
                    key,
                    uptoken: token
                },
                progress
            );
        });
    }
}