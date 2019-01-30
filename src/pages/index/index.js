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
                content: '孔乙己是站着喝酒而穿长衫的唯一的人。他身材很高大；青白脸色，皱纹间时常夹些伤痕；一部乱蓬蓬的花白的胡子。穿的虽然是长衫，可是又脏又破，似乎十多年没有补，也没有洗。他对人说话，总是满口之乎者也⑹，教人半懂不懂的。因为他姓孔，别人便从描红纸上的“上大人孔乙己⑺”这半懂不懂的话里，替他取下一个绰号，叫作孔乙己。孔乙己一到店，所有喝酒的人便都看着他笑，有的叫道，“孔乙己，你脸上又添上新伤疤了！”他不回答，对柜里说，“温两碗酒，要一碟茴香豆。”便排出九文大钱。他们又故意的高声嚷道，“你一定又偷了人家的东西了！”孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”“什么清白？我前天亲眼见你偷了何家的书，吊着打。”孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷⑻”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。',
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
                content: '在这些时候，我可以附和着笑，掌柜是决不责备的。而且掌柜见了孔乙己，也每每这样问他，引人发笑。孔乙己自己知道不能和他们谈天，便只好向孩子说话。有一回对我说道，“你读过书么？”我略略点一点头。他说，“读过书，……我便考你一考。茴香豆的茴字，怎样写的？”我想，讨饭一样的人，也配考我么？便回过脸去，不再理会。孔乙己等了许久，很恳切的说道，“不能写罢？……我教给你，记着！这些字应该记着。将来做掌柜的时候，写账要用。”我暗想我和掌柜的等级还很远呢，而且我们掌柜也从不将茴香豆上账；又好笑，又不耐烦，懒懒的答他道，“谁要你教，不是草头底下一个来回的回字么？”孔乙己显出极高兴的样子，将两个指头的长指甲敲着柜台，点头说，“对呀对呀！……回字有四样写法⑿，你知道么？”我愈不耐烦了，努着嘴走远。孔乙己刚用指甲蘸了酒，想在柜上写字，见我毫不热心，便又叹一口气，显出极惋惜的样子。',
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
            url: '/pages/record/index'
        })
    }

    render() {
        const { notes } = this.state;
        return (
            <View>
                <View class='container nopadding'>
                    <View class='timeline'>
                        {notes.map((note, index) => (
                            <TimelineItem key={note.key} body={note} last={index === notes.length - 1} />
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
