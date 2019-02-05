import { fetch } from './req';

const qiniuUploader = require('./qiniuUploader');
export const fetchQiniuToken = type => fetch(`https://xdbin.com/api/v1/qiniu/token?type=${type}`);
export const upload = ({ token, file, success, error, progress }) => {
    qiniuUploader.upload(
        file.url,
        success, error,
        {
            region: 'ECN',
            domain: 'http://cdn.xdbin.com',
            key: `foods/${file.url.split('//')[1]}`,
            uptoken: token
        },
        progress
    );
}