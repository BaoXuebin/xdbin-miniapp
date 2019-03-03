import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import moment from 'moment'
import 'moment/locale/zh-cn'

import Index from './pages/index'
import Record from './pages/record/record'
import Welcome from './pages/welcome/welcome'
import DailyTodo from './pages/todo/daily'

import configStore from './store'

import './app.scss'

moment.locale('zh-cn');

const store = configStore()

class App extends Component {

  config = {
    pages: [
      // 'pages/welcome/welcome',
      'pages/index/index',
      'pages/record/record',
      'pages/todo/daily',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "black",
      selectedColor: "black",
      backgroundColor: "#white",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/index/index",
          text: "手记",
          iconPath: "./assets/icons/note.png",
          selectedIconPath: "./assets/icons/note_focus.png"
        },
        {
          pagePath: "pages/record/record",
          text: "添加",
          iconPath: "./assets/icons/add.png",
          selectedIconPath: "./assets/icons/add_focus.png"
        },
        {
          pagePath: "pages/todo/daily",
          text: "待办",
          iconPath: "./assets/icons/todo.png",
          selectedIconPath: "./assets/icons/todo_focus.png"
        }
      ]
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
        <DailyTodo />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
