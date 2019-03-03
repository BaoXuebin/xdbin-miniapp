import Taro, { Component } from "@tarojs/taro";
import { View, AtMessage, AtLoading } from "taro-ui";
import moment from "moment";

import "./index.css";
import TimelineItem from "./item/timeline_item";
import { fetchPubNotes } from "../../service/note_service";
import { login, collect } from "../../service/user_service";
import { distinct } from "../../utils/Collections";

class Index extends Component {
  config = {
    navigationBarTitleText: "手记",
    enablePullDownRefresh: true
  };

  state = {
    loading: false,
    pageNo: 1,
    pageSize: 20,
    last: false,
    rawNotes: [],
    notes: Taro.getStorageSync("cache_data") || []
  };

  handleFetchPubNotes({ pageNo, pageSize }, concatType = "override", callback) {
    if (this.state.loading) {
      return;
    }
    // 页面加载完毕，请求新的手记列表
    this.setState({ loading: true });
    Taro.showNavigationBarLoading();

    fetchPubNotes({ pageNo, pageSize })
      .then(res => {
        const { content, last } = res;
        let rawNotes = [];
        if (concatType === "append") {
          rawNotes = distinct(
            this.state.rawNotes.concat(content),
            (e1, e2) => e1.id === e2.id
          );
        } else if (concatType === "unshift") {
          rawNotes = distinct(
            content.concat(this.state.rawNotes),
            (e1, e2) => e1.id === e2.id
          );
        } else {
          rawNotes = content;
        }
        this.setState(
          {
            last: this.state.last || last, // 如果 last 是 true 说明已经加载到最底部，则不再改变
            pageNo: res.pageNo,
            rawNotes,
            loading: false,
            notes: this.buildNoteTimeLineData(rawNotes)
          },
          () => {
            // 缓存最新的 50 条数据
            Taro.setStorageSync("cache_data", this.state.notes.slice(0, 30));
          }
        );
        Taro.hideNavigationBarLoading();
        if (typeof callback === "function") {
          callback();
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        console.error(error);
        Taro.hideNavigationBarLoading();
        if (typeof callback === "function") {
          callback();
        }
        Taro.atMessage({ type: "error", message: "获取最新数据失败" });
      });
  }

  componentWillMount() {
    const { pageNo, pageSize } = this.state;
    Taro.login()
      .then(res => login(res.code))
      .then(res => {
        const { code } = res;
        if (res.status >= 400 || code >= 400) {
          // console.error(res.message);
          // Taro.atMessage({ type: "error", message: "登录失败" });
        } else {
          const { token } = res;
          if (token) {
            Taro.setStorageSync("token", token);
          }
        }
        this.handleFetchPubNotes({ pageNo, pageSize }, "override");
      })
      .catch(error => {
        console.error(error);
        Taro.atMessage({ type: "error", message: "登录失败" });
      });
  }

  onPullDownRefresh() {
    // 下拉刷新，获取最新的数据
    this.handleFetchPubNotes(
      { pageNo: 1, pageSize: this.state.pageSize },
      "unshift",
      () => {
        Taro.stopPullDownRefresh();
      }
    );
  }

  onReachBottom() {
    const { pageNo, pageSize, loading, last } = this.state;
    if (loading || last) return;
    this.handleFetchPubNotes({ pageNo: pageNo + 1, pageSize }, "append");
  }

  buildNoteTimeLineData(rawNotes) {
    const notes = [];
    const days = []; // set 集合
    rawNotes.forEach(note => {
      const month = moment(note.publishTime).format("MMMM"); // 中文月份
      const day = moment(note.publishTime).format("DD");
      const key = moment(note.publishTime).format("YYYY-MM-DD");
      if (days.indexOf(key) < 0) {
        const dayNote = { key, month, day, notes: [], fixed: false };
        days.push(key);
        notes.push(dayNote);
      }
      const dayNote = notes.filter(n => n.key === key)[0];
      const { id, content, images, publishTime, nickName, avatarUrl, pub } = note;
      dayNote.notes.push({
        key: id,
        content,
        images,
        publishTime,
        nickName,
        avatarUrl,
        pub
      });
    });
    return notes;
  }

  handleNavigateRecord(event) {
    const { userInfo } = event.detail;
    if (!userInfo) {
      Taro.atMessage({
        type: "warning",
        message: "请先同意授权获取微信用户信息"
      });
      return;
    }
    Taro.getUserInfo()
      .then(res =>
        collect({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      )
      .then(() => {
        Taro.navigateTo({
          url: "/pages/record/record"
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { notes, last } = this.state;
    return (
      <View style={{ marginBottom: "120rpx" }}>
        <AtMessage />
        <View class="container nopadding">
          <View class="timeline">
            {notes &&
              notes.map((note, index) => (
                <TimelineItem
                  key={note.key}
                  body={note}
                  last={index === notes.length - 1}
                  fixed
                />
              ))}
          </View>
          {!last && (
            <View style={{ textAlign: "center", marginTop: "30rpx" }}>
              <AtLoading />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default Index;
