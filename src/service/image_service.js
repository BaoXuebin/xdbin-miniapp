import { fetch } from './req';

const qiniuUploader = require('./qiniuUploader');
export const fetchQiniuToken = type => fetch(`https://xdbin.com/api/v1/qiniu/token?type=${type}`);
export const upload = ({ token, file, filePath, success, error, progress }) => {
    const fileName = file.url.slice(file.url.lastIndexOf('.') - 6);
    qiniuUploader.upload(
        file.url,
        success, error,
        {
            region: 'ECN',
            domain: 'http://cdn.xdbin.com',
            key: `foods/${filePath}${fileName}`,
            uptoken: token
        },
        progress
    );
}