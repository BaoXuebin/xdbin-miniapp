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
                day: '27',
                month: '一月',
                content: '必胜客吃披萨',
                images: [
                  'http://cdn.xdbin.com/foods/tmp_186c956716919ac75d1b1e5901e031d4bee68e38e404b625.jpg',
                  'http://cdn.xdbin.com/foods/tmp_654a0de06c3dbe27f4fe660ae8f99e3371a505f04ce43ee4.jpg',
                  'http://cdn.xdbin.com/foods/tmp_a1219f6050ab60ddcaa637bf11cbc78802d5afe22479854f.jpg',
                  'http://cdn.xdbin.com/foods/tmp_b07481e2621617ca3ebd4c8f1b49139f32c4c0ed977b667d.jpg',
                  'http://cdn.xdbin.com/pics/20190122214909'
                ],
                publishTime: new Date()
            },
            {
                key: '2',
                day: '08',
                month: '一月',
                content: '伊曼努尔·康德，著名德意志哲学家，德国古典哲学创始人，启蒙运动时期最重要的思想家之一。生于东普鲁士哥尼斯堡（今俄罗斯加里宁格勒）。哥尼斯堡大学毕业。1755年起在母校执教，1770年升教授。其思想分为“前批判时期”和“批判时期”。在前批判时期，以自然科学的研究为主，并进行哲学探究。1755年发表《自然通史和天体论》，提出关于太阳系起源的星云假说。其学说深深影响近代西方哲学，并开启了德国唯心主义和康德主义等诸多流派。',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909'
                ],
                publishTime: new Date()
            },
            {
                key: '3',
                day: '30',
                month: '十二',
                content: '伊曼努尔·康德，著名德意志哲学家，德国古典哲学创始人，启蒙运动时期最重要的思想家之一。生于东普鲁士哥尼斯堡（今俄罗斯加里宁格勒）。哥尼斯堡大学毕业。1755年起在母校执教，1770年升教授。其思想分为“前批判时期”和“批判时期”。在前批判时期，以自然科学的研究为主，并进行哲学探究。1755年发表《自然通史和天体论》，提出关于太阳系起源的星云假说。其学说深深影响近代西方哲学，并开启了德国唯心主义和康德主义等诸多流派。',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909'
                ],
                publishTime: new Date()
            },
            {
                key: '4',
                day: '17',
                month: '十二',
                content: '伊曼努尔·康德，著名德意志哲学家，德国古典哲学创始人，启蒙运动时期最重要的思想家之一。生于东普鲁士哥尼斯堡（今俄罗斯加里宁格勒）。哥尼斯堡大学毕业。1755年起在母校执教，1770年升教授。其思想分为“前批判时期”和“批判时期”。在前批判时期，以自然科学的研究为主，并进行哲学探究。1755年发表《自然通史和天体论》，提出关于太阳系起源的星云假说。其学说深深影响近代西方哲学，并开启了德国唯心主义和康德主义等诸多流派。',
                images: [
                    'http://cdn.xdbin.com/pics/20190122214909'
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
