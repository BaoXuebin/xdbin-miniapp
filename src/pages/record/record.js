import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtButton, AtMessage } from 'taro-ui'

import { upload } from '../../service/image_service';

import './record.scss'

class Record extends Component {

    config = {
        navigationBarTitleText: '添加'
    }

    constructor() {
        super(...arguments);
        this.state = {
            value: '',
            files: [],
            uploading: false,
            filePaths: [],
            progress: -1
        };
    }

    handleUploadImage(files) {
        const _this = this;
        upload({
            files,
            success: (res) => {
                console.log(res);
                this.setState({
                    filePaths: _this.state.filePaths.concat([res.url])
                });
            },
            error: (error) => {
                console.error(error);
                Taro.atMessage({ 'message': '图片上传失败', 'type': 'error', });
            },
            progress: (res) => {
                // progress, totalBytesSent, totalBytesExpectedToSend
                _this.setState({
                    progress: res.progress
                });
            }
        });
    }

    handlePublish() {
        const { value, files } = this.state;
        this.setState({ uploading: true });
        this.handleUploadImage(files);
        console.log(value, this.state.filePaths);
        this.setState({ uploading: false, files: [], value: '' });
    };

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    onChange(files, type, index) {
        let idx = index;
        if (typeof index !== 'number') {
            idx = index.target.dataset.eHandleremoveimgAA;
        }
        if (type === 'remove') {
            this.setState({
                files: files.filter(file => file !== files[idx])
            });
        } else {
            this.setState({
                files
            });
        }
    }

    onFail(mes) {
        console.log(mes);
    }

    onImageClick(index, file) {
        console.log(index, file);
    }

    render() {
        const { value, files, filePaths, uploading, progress } = this.state;
        return (
            <View class="container">
                <AtMessage />
                <View className="gap">
                    <AtImagePicker
                        multiple
                        files={files}
                        onChange={this.onChange.bind(this)}
                        onFail={this.onFail.bind(this)}
                        onImageClick={this.onImageClick.bind(this)}
                    />
                </View>
                <View className="section gap">
                    <AtTextarea
                        className="gap"
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        maxLength={200}
                        placeholder='记录此刻的心情 ~'
                    />
                </View>
                <AtButton className="gap" type='primary' disabled={uploading} loading={uploading} onClick={this.handlePublish.bind(this)}>
                    {
                        uploading ? `图片上传(${filePaths.length + 1}/${files.length}) ${progress}%` : '发布'
                    }
                </AtButton>
            </View>
        );
    }
}

export default Record;