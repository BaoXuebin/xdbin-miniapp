import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import Record from './pages/record/index'
import Welcome from './pages/welcome/welcome'

import configStore from './store'

import 'taro-ui/dist/style/index.scss'
import './app.css'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/welcome/welcome',
      'pages/record/index',
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
        <Index />
        <Welcome />
        <Record />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
