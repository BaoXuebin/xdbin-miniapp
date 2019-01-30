import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import monment from 'moment';

import 'taro-ui/dist/style/components/flex.scss'
import './timeline_item.scss';
class TimelineItem extends Component {
  render() {
    const { day, month, content, images, publishTime } = this.props.body;
    const last = this.props.last;
    return (
      <View className={ last ? "timeline-item timeline-item-last" : "timeline-item" }>
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
                { images.map(i => (
                  <image key={i} class='thumbnail' src={i} alt="图片" />
                )) }
              </View>
            }
            <View className='at-row meta-text'>
              <View className='at-col'>{monment(publishTime).format('HH:mm')}</View>
              <View className='at-col' style={{ textAlign: 'right' }}>{images ? `共${images.length}张` : ''}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default TimelineItem;