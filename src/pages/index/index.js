import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.css'
import TimelineItem from './item/timeline_item';

class Index extends Component {

    config = {
        navigationBarTitleText: '美食手记'
    }

    state = {
        notes: [
            {
                key: '1',
                day: '09',
                month: '一月',
                content: '微信小程序之让vie',
                // images: [
                //   'http://cdn.xdbin.com/pics/20190122214909',
                //   'http://cdn.xdbin.com/pics/20181120000045',
                //   'http://cdn.xdbin.com/pics/20181112235327',
                //   'http://cdn.xdbin.com/pics/20180620113034'
                // ],
                publishTime: new Date()
            },
            {
                key: '2',
                day: '08',
                month: '一月',
                content: '孔乙己是站着喝酒',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909',
                    'http://cdn.xdbin.com/pics/20181120000045',
                    'http://cdn.xdbin.com/pics/20181112235327',
                    'http://cdn.xdbin.com/pics/20180620113034'
                ],
                publishTime: new Date()
            },
            {
                key: '3',
                day: '05',
                month: '一月',
                content: '三大技术打卡机SD卡接口叫我',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909',
                    'http://cdn.xdbin.com/pics/20181120000045',
                    'http://cdn.xdbin.com/pics/20181112235327',
                    'http://cdn.xdbin.com/pics/20180620113034'
                ],
                publishTime: new Date()
            },
            {
                key: '4',
                day: '28',
                month: '十二',
                content: '在这些时。',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909',
                    'http://cdn.xdbin.com/pics/20181120000045',
                    'http://cdn.xdbin.com/pics/20181112235327',
                    'http://cdn.xdbin.com/pics/20180620113034'
                ],
                publishTime: new Date()
            }
        ]
    };

    handleNavigateAdd() {
        Taro.navigateTo({
            url: '/pages/record/record'
        })
    }

    render() {
        const { notes } = this.state;
        return (
            <View style={{ marginBottom: '80rpx' }}>
                <View class='container nopadding'>
                    <View class='timeline'>
                        {notes.map((note, index) => (
                            <TimelineItem key={note.key} defaultProps={{}} body={note} last={index === notes.length - 1} />
                        ))}
                    </View>
                </View>
                <AtTabBar
                    fixed
                    color='#1da57a'
                    tabList={[
                        { iconType: 'camera' }
                    ]}
                    onClick={this.handleNavigateAdd.bind(this)}
                />
            </View>
        )
    }
}

export default Index
