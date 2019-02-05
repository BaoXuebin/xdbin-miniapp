import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import moment from 'moment'
import 'moment/locale/zh-cn'

import Index from './pages/index'
import Record from './pages/record/record'
import Welcome from './pages/welcome/welcome'

import configStore from './store'

import './app.scss'

moment.locale('zh-cn');

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/welcome/welcome',
      'pages/index/index',
      'pages/record/record'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Welcome />
        <Index />
        <Record />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
