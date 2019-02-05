import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import moment from 'moment';

import "./index.css";
import TimelineItem from "./item/timeline_item";
import { fetchPubNotes } from "../../service/note_service";
import { collect } from '../../service/user_service';

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
    this.handleFetchPubNotes();
  }

  componentDidMount() {
    
  }

  onPullDownRefresh() {
    this.handleFetchPubNotes(() => {
      Taro.stopPullDownRefresh();
    });
  }

  onPageScroll() {
    
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
        notes.unshift(dayNote);
      }
      const dayNote = notes.filter(n => n.key === key)[0];
      const { id, content, images, publishTime } = note;
      dayNote.notes.unshift({
        key: id, content, images, publishTime
      });
    });
    return notes;
  }

  handleNavigateRecord() {
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
        <AtTabBar
          fixed
          color="#1da57a"
          open-type="getUserInfo"
          tabList={[{ iconType: "camera" }]}
          onClick={this.handleNavigateRecord.bind(this)}
        />
      </View>
    );
  }
}

export default Index;
