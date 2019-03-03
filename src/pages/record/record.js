import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  AtTextarea,
  AtImagePicker,
  AtButton,
  AtMessage,
  AtForm,
  AtSwitch,
  AtTabs,
  AtTabsPane,
  AtInput,
  AtRadio
} from "taro-ui";
import moment from "moment";

import { upload, fetchQiniuToken } from "../../service/image_service";

import "./record.scss";
import { saveOrUpdateNote } from "../../service/note_service";
import { saveTodo } from "../../service/todo_service";

class Record extends Component {
  config = {
    navigationBarTitleText: "添加"
  };

  tabList = [{ title: "发布手记" }, { title: "添加待办" }];

  constructor() {
    super(...arguments);
    this.state = {
      value: "",
      files: [],
      uploading: false,
      filePaths: [],
      pub: true,
      progress: -1,
      current: 0,
      todoItem: "",
      todoType: ""
    };
  }

  handleUploadImage(file, filePath, token) {
    const _this = this;
    return new Promise((resolve, reject) => {
      upload({
        token,
        file,
        filePath,
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
      Taro.atMessage({ type: "error", message: "内容不能为空" });
      return;
    }
    // 图片上次七牛云
    this.setState({ uploading: true });
    let filePaths = [];
    const res = await fetchQiniuToken("foods");
    const now = moment().format("YYYYMMDD_HHmmss");
    for (let idx in files) {
      const filePath = `${now}/${idx}/`;
      await this.handleUploadImage(files[idx], filePath, res.token)
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
      .then(success => {
        console.log(success);
        this.setState({ uploading: false, files: [], value: "" }, () => {
          // Taro.atMessage({ message: "发布成功", type: "success" });
          this.handleNavigateIndex();
        });
      })
      .catch(error => {
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

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleChangeTodoItem(item) {
    this.setState({
      todoItem: item
    });
  }

  handleChangeTodoType(type) {
    this.setState({
      todoType: type
    });
  }

  handleAddTodo() {
    const { todoItem, todoType } = this.state;
    if (!todoItem || !todoItem.trim()) {
      Taro.atMessage({ message: "待办不能为空", type: "error" });
      return;
    }
    if (!todoType) {
      Taro.atMessage({ message: "请选择待办类别", type: "error" });
      return;
    }
    this.setState({
      uploading: true
    });
    saveTodo({
      title: todoItem,
      type: todoType,
      ifPub: 1
    })
      .then(res => {
        this.setState({
          uploading: false,
          todos: [...this.state.todos, res],
          todoItem: '',
          todoType: ''
        });
        Taro.atMessage({ message: "添加成功", type: "success" });
      })
      .catch(() => {
        this.setState({
          uploading: false
        });
      });
  }

  render() {
    const {
      value,
      files,
      uploading,
      pub,
      current,
      todoItem,
      todoType
    } = this.state;
    return (
      <View>
        <AtMessage />
        <AtTabs
          current={this.state.current}
          tabList={this.tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style="padding: 20px;">
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
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View className="section gap">
              <AtInput
                title="待办"
                type="text"
                placeholder="添加待办"
                value={todoItem}
                onChange={this.handleChangeTodoItem.bind(this)}
              />
            </View>
            <View className="section gap">
              <AtRadio
                options={[
                  { label: "Food", value: "food" },
                  { label: "Study", value: "study" },
                  { label: "Sport", value: "sport" },
                  { label: "Game", value: "game" }
                ]}
                value={todoType}
                onClick={this.handleChangeTodoType.bind(this)}
              />
            </View>
            <View style={{ padding: "0 20px" }}>
              <AtButton
                className="gap"
                type="primary"
                disabled={uploading}
                loading={uploading}
                onClick={this.handleAddTodo.bind(this)}
              >
                添加
              </AtButton>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Record;
