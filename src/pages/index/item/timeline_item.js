import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class TimelineItem extends Component {
  render() {
    const { day, month, content, images } = this.props.body;
    const last = this.props.last;
    return (
      <View class={ last ? "timeline-item timeline-item-last" : "timeline-item" }>
        <View class="timeline-item-tail"></View>
        <View class="timeline-item-head time-line-item-head-blue"></View>
        <View class="time-line-date">
          <Text class="day">{day}</Text>
          <Text class="month">{month}</Text>
        </View>
        <View class="timeline-item-content">
          {content}
          {
            (images && images.length > 0) &&
            <View className='at-row image-container'>
              { images.map(i => (
                <View className='at-col' style={{  }}>
                  <image class='thumbnail' key={i} src={i} alt="图片" />
                </View>
              )) }
            </View>
          }
        </View>
      </View>
    );
  }
}

export default TimelineItem;