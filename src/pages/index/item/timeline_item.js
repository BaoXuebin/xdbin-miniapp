import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import monment from 'moment';

import './timeline_item.scss';
class TimelineItem extends Component {

    readImage(idx, images) {
        wx.previewImage({
            current: images[idx],
            urls: images
        })
    }

    render() {
        const { day, month, notes } = this.props.body;
        const last = this.props.last;
        return (
            <View className={last ? "timeline-item timeline-item-last" : "timeline-item"}>
                <View className="timeline-item-tail"></View>
                <View className="timeline-item-head time-line-item-head-blue"></View>
                {
                    notes.map((note, idx) => (
                        <View key={note.key} className="timeline-item-layout">
                            <View className="timeline-item-left">
                                {
                                    idx === 0 &&
                                    <View className="timeline-item-left-1 time-line-date">
                                        <Text className="day">{day}</Text>
                                        <Text className="month">{month}</Text>
                                    </View>
                                }
                                <View className="timeline-item-left-2 ">
                                    <View className="timeline-item-avatar">
                                        <Image lazyLoad style={{ width: '100%', height: '100%' }} src="http://cdn.xdbin.com/pics/20190122214909" alt="图片" />
                                    </View>
                                </View>
                            </View>
                            <View className="timeline-item-right">
                                <View key={note.key} className="timeline-item-content">
                                    <View>
                                        <View className="timeline-item-author">@初意</View>
                                        {note.content}
                                        <View className="content-container">
                                            {
                                                (note.images && note.images.length > 0) &&
                                                <View>
                                                    {note.images.map((i, idx) => (
                                                        <Image key={i} onClick={this.readImage.bind(this, idx, note.images)} lazyLoad class='thumbnail' src={i} alt="图片" />
                                                    ))}
                                                </View>
                                            }
                                            <View className="meta-container">
                                                <View className="meta-time">
                                                    {monment(note.publishTime).format('HH:mm')}
                                                </View>
                                                <View className="meta-img-num">
                                                    {note.images ? `共${note.images.length}张` : ''}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                }
            </View>
        );
    }
}

export default TimelineItem;