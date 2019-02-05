import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import monment from "moment";

import "./timeline_item.scss";

class TimelineItem extends Component {
  readImage(idx, images) {
    Taro.previewImage({
      current: images[idx],
      urls: images
    });
  }

  render() {
    const { day, month, notes, fixed } = this.props.body;
    const last = this.props.last;
    return (
      <View className="timeline-item">
        {/* <View className="timeline-item-tail" />
        <View className="timeline-item-head time-line-item-head-blue" /> */}
        {notes.map((note, idx) => (
          <View key={note.key} className="timeline-item-layout">
            {!(last && idx === notes.length - 1) && (
              <View className="timeline-item-tail" />
            )}
            <View className="timeline-item-head time-line-item-head-blue" />
            <View className="timeline-item-left">
              {idx === 0 && (
                <View
                  className={
                    fixed
                      ? "timeline-item-left-1 time-line-date fixed"
                      : "timeline-item-left-1 time-line-date"
                  }
                >
                  <Text className="day">{day}</Text>
                  <Text className="month">{month}</Text>
                </View>
              )}
              <View className="timeline-item-left-2 ">
                <View className="timeline-item-avatar">
                  {/* <Image
                    lazyLoad
                    style={{ width: "100%", height: "100%" }}
                    src="http://cdn.xdbin.com/pics/20181120000045"
                    alt="头像"
                  /> */}
                </View>
              </View>
            </View>
            <View className="timeline-item-right">
              <View key={note.key} className="timeline-item-content">
                <View>
                  <View className="timeline-item-author">{note.nickName || 'Unknown'}</View>
                  {note.content}
                  <View className="content-container">
                    {note.images && note.images.length > 0 && (
                      <View>
                        {note.images.map((i, noteIdx) => (
                          <Image
                            key={i}
                            mode="aspectFill"
                            onClick={this.readImage.bind(
                              this,
                              noteIdx,
                              note.images
                            )}
                            lazyLoad
                            className="thumbnail"
                            src={i}
                            alt="图片"
                          />
                        ))}
                      </View>
                    )}
                    <View className="meta-container">
                      <View className="meta-time">
                        {monment(note.publishTime).format("HH:mm")}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}

export default TimelineItem;
