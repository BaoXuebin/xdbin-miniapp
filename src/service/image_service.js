import { fetch } from './req';

const qiniuUploader = require('./qiniuUploader');
export const fetchQiniuToken = type => fetch(`https://xdbin.com/api/v1/qiniu/token?type=${type}`);
export const upload = ({ token, file, success, error, progress }) => {
    console.log(file);
    qiniuUploader.upload(
        file.url,
        success, error,
        {
            region: 'ECN',
            domain: 'bzkdlkaf.bkt.clouddn.com',
            key: `foods/${file.url.split('//')[1]}`,
            uptoken: token
        },
        progress
    );
}