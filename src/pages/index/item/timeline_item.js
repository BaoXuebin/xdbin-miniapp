import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import monment from 'moment';

import './timeline_item.scss';
class TimelineItem extends Component {

    readImage(event) {
        console.log(event);
        let idx = event;
        if (typeof idx !== 'number') {
            idx = event.target.dataset.eReadimageAA;
        }
        const { images } = this.props.body;
        wx.previewImage({
            current: images[idx],
            urls: images
        })
    }

    render() {
        const { day, month, content, images, publishTime } = this.props.body;
        const last = this.props.last;
        return (
            <View className={last ? "timeline-item timeline-item-last" : "timeline-item"}>
                <View className="timeline-item-tail"></View>
                <View className="timeline-item-head time-line-item-head-blue"></View>
                <View className="time-line-date">
                    <Text className="day">{day}</Text>
                    <Text className="month">{month}</Text>
                </View>
                <View className="timeline-item-content">
                    {content}
                    <View className='content-container'>
                        {
                            (images && images.length > 0) &&
                            <View>
                                {images.map((i, idx) => (
                                    <Image key={i} onClick={this.readImage.bind(this, idx)} lazyLoad class='thumbnail' src={i} alt="图片" />
                                ))}
                            </View>
                        }
                        <View className="meta-container">
                            <View className="meta-time">
                                {monment(publishTime).format('HH:mm')}
                            </View>
                            <View className="meta-img-num">
                                {images ? `共${images.length}张` : ''}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default TimelineItem;