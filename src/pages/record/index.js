import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTextarea, AtImagePicker, AtButton } from 'taro-ui'

import './index.scss'

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

    handleChange (event) {
        this.setState({
            value: event.target.value
        });
    }

    onChange(files, type, event) {
        console.log(files);
        if (type === 'remove') {
            const removeId = event.target.dataset.eHandleremoveimgAA;
            this.setState({
                files: files.filter(file => file !== files[removeId])
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
        return (
            <View class="container">
                <AtImagePicker
                    className="gap"
                    multiple
                    files={this.state.files}
                    onChange={this.onChange.bind(this)}
                    onFail={this.onFail.bind(this)}
                    onImageClick={this.onImageClick.bind(this)}
                />
                <AtTextarea
                    className="gap"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    maxLength={200}
                    placeholder='写下此刻的心情吧'
                />
                <AtButton className="gap" type='primary'>发布</AtButton>
            </View>
        );
    }
}

export default Record;