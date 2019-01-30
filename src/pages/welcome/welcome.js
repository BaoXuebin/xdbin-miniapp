import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Welcome extends Component {

  // config = {yarn
  //   navigationBarTitleText: 'Welcome'
  // }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <span>Welcome</span>
      </View>
    )
  }
}

export default Welcome
