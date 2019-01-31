import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtButton } from 'taro-ui'

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
            files: []
        };
    }

    handlePublish() {
        const { value, files } = this.state;
        console.log(value, files);
        upload(files[0])
            .then((res) => { console.log(res); });
    };

    handleChange (event) {
        this.setState({
            value: event.target.value
        });
    }

    onChange(files, type, index) {
        if (type === 'remove') {
            this.setState({
                files: files.filter(file => file !== files[index])
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
        const { value, files } = this.state;
        return (
            <View class="container">
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
                <AtButton className="gap" type='primary' onClick={this.handlePublish.bind(this)}>发布</AtButton>
            </View>
        );
    }
}

export default Record;