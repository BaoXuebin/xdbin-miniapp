import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { AtIcon, AtButton, AtMessage } from "taro-ui";
import moment from 'moment';

import "./index.css";
import TimelineItem from "./item/timeline_item";
import { fetchPubNotes } from "../../service/note_service";
import { login, collect } from '../../service/user_service';

class Index extends Component {
  config = {
    navigationBarTitleText: "美食手记",
    enablePullDownRefresh: true
  };

  state = {
    loading: false,
    pageNo: 1,
    pageSize: 20,
    last: false,
    rawNotes: [],
    notes: []
  };

  handleFetchPubNotes(callback) {
    if (this.state.loading) {
      return;
    }
    // 页面加载完毕，请求新的手记列表
    this.setState({ loading: true });
    Taro.showNavigationBarLoading();

    const { pageSize } = this.state;
    fetchPubNotes({ pageNo: this.state.pageNo, pageSize })
      .then((res) => {
        const { content, last, pageNo } = res;
        const rawNotes = this.state.pageNo === pageNo ? content : content.concat(this.state.rawNotes);
        this.setState({
          last, pageNo, rawNotes,
          loading: false,
          notes: this.buildNoteTimeLineData(rawNotes)
        });
        Taro.hideNavigationBarLoading();
        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.error(error);
        Taro.hideNavigationBarLoading();
        if (typeof callback === 'function') {
          callback();
        }
        Taro.atMessage({ type: "error", message: "获取最新数据失败" });
      });
  }

  componentWillMount() {
    Taro.login()
      .then(res => login(res.code))
      .then((res) => {
        if (res.status >= 400) {
          console.error(res.message);
          Taro.atMessage({ type: 'error', message: '登录失败' });
        }
        const { token } = res;
        Taro.setStorageSync('token', token);
        this.handleFetchPubNotes();
      })
      .catch((error) => {
        console.error(error);
        Taro.atMessage({ type: 'error', message: '登录失败' });
      });
  }

  onPullDownRefresh() {
    this.handleFetchPubNotes(() => {
      Taro.stopPullDownRefresh();
    });
  }

  buildNoteTimeLineData(rawNotes) {
    const notes = [];
    const days = []; // set 集合
    rawNotes.forEach((note) => {
      const month = moment(note.publishTime).format('MMMM'); // 中文月份
      const day = moment(note.publishTime).format('DD');
      const key = moment(note.publishTime).format('YYYY-MM-DD');
      if (days.indexOf(key) < 0) {
        const dayNote = { key, month, day, notes: [], fixed: false };
        days.push(key);
        notes.push(dayNote);
      }
      const dayNote = notes.filter(n => n.key === key)[0];
      const { id, content, images, publishTime, nickName, avatarUrl } = note;
      dayNote.notes.push({
        key: id, content, images, publishTime, nickName, avatarUrl
      });
    });
    return notes;
  }

  handleNavigateRecord(event) {
    const { userInfo } = event.detail;
    if (!userInfo) {
      Taro.atMessage({ type: 'warning', message: '请先同意授权获取微信用户信息' });
      return;
    }
    Taro.getUserInfo()
      .then(res => collect({ nickName: res.userInfo.nickName, avatarUrl: res.userInfo.avatarUrl }))
      .then(() => {
        Taro.navigateTo({
          url: "/pages/record/record"
        });
      })
      .catch((error) => { console.error(error); });
  }

  render() {
    const { notes } = this.state;
    return (
      <View style={{ marginBottom: "80rpx" }}>
        <AtMessage />
        <View class="container nopadding" id="ssss">
          <View class="timeline">
            {notes && notes.map((note, index) => (
              <TimelineItem
                key={note.key}
                body={note}
                last={index === notes.length - 1}
                fixed
              />
            ))}
          </View>
        </View>
        <AtButton
          full
          className="publish-btn"
          openType="getUserInfo"
          onGetUserInfo={this.handleNavigateRecord}
        >
          <AtIcon value="camera" size="25" color="#1da57a"></AtIcon>
        </AtButton>
      </View>
    );
  }
}

export default Index;
