import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTextarea,
  AtImagePicker,
  AtButton,
  AtMessage,
  AtForm,
  AtSwitch
} from "taro-ui";

import { upload, fetchQiniuToken } from "../../service/image_service";

import "./record.scss";
import { saveOrUpdateNote } from "../../service/note_service";

class Record extends Component {
  config = {
    navigationBarTitleText: "添加"
  };

  constructor() {
    super(...arguments);
    this.state = {
      value: "",
      files: [],
      uploading: false,
      filePaths: [],
      pub: true,
      progress: -1
    };
  }

  handleUploadImage(file, token) {
    const _this = this;
    return new Promise((resolve, reject) => {
      upload({
        token,
        file,
        success: res => {
          resolve(res);
        },
        error: error => {
          reject(error);
        },
        progress: res => {
          // progress, totalBytesSent, totalBytesExpectedToSend
          // console.log(res);
          _this.setState({
            progress: res.progress
          });
        }
      });
    });
  }

  async handlePublish() {
    const { value, files, pub } = this.state;
    if (!value || value.length > 200) {
      Taro.atMessage({  type: 'error', message: '内容不能为空' });
      return;
    }
    // 图片上次七牛云
    this.setState({ uploading: true });
    let filePaths = [];
    const res = await fetchQiniuToken("foods");
    for (let file of files) {
      await this.handleUploadImage(file, res.token)
        .then(result => {
          filePaths = this.state.filePaths.concat([result.imageURL]);
          this.setState({
            filePaths
          });
        })
        .catch(error => {
          console.error(error);
          Taro.atMessage({ message: "图片上传失败", type: "error" });
        });
    }
    saveOrUpdateNote({
      content: value,
      images: filePaths,
      pub: pub ? 1 : 0
    })
      .then((success) => {
        console.log(success);
        this.setState({ uploading: false, files: [], value: "" }, () => {
          // Taro.atMessage({ message: "发布成功", type: "success" });
          this.handleNavigateIndex();
        });
      })
      .catch((error) => {
        this.setState({ uploading: false });
        console.log(error);
        Taro.atMessage({ message: "发布失败", type: "error" });
      });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onChange(files, type, index) {
    let idx = index;
    if (typeof index !== "number") {
      idx = index.target.dataset.eHandleremoveimgAA;
    }
    if (type === "remove") {
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

  handleTogglePub(pub) {
    this.setState({
      pub
    });
  }

  handleNavigateIndex() {
    Taro.navigateBack({
      delta: 1
    });
  }

  buildBtnText() {
    const { files, filePaths, progress, uploading } = this.state;
    if (!uploading) return "发布";
    if (files.length === 0) {
      // 没有选择文件
      return `发布中...`;
    }
    return `图片上传(${filePaths.length}/${files.length}) ${progress}%`;
  }

  render() {
    const { value, files, uploading, pub } = this.state;
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
            placeholder="记录此刻的心情 ~"
          />
        </View>
        <AtForm className="gap">
          <AtSwitch
            title="公开"
            color="#1da57a"
            border
            checked={pub}
            onChange={this.handleTogglePub}
          />
        </AtForm>
        <AtButton
          className="gap"
          type="primary"
          disabled={uploading}
          loading={uploading}
          onClick={this.handlePublish.bind(this)}
        >
          {this.buildBtnText()}
        </AtButton>
      </View>
    );
  }
}

export default Record;
