import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtMessage } from "taro-ui";

import { login } from '../../service/user_service';

class Welcome extends Component {

  config = {
    navigationBarTitleText: '美食手记'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {
    
  }

  componentDidMount() {
    Taro.login()
      .then(res => login(res.code))
      .then((res) => {
        if (res.status >= 400) {
          console.error(res.message);
          Taro.atMessage({ type: 'error', message: '登录失败' });
        }
        const { token } = res;
        Taro.setStorageSync('token', token);
        Taro.reLaunch({ url: "/pages/index/index" });
      })
      .catch((error) => {
        console.error(error);
        Taro.atMessage({ type: 'error', message: '登录失败' });
      });
  }

  render () {
    return (
      <View>
        <AtMessage />
      </View>
    )
  }
}

export default Welcome
