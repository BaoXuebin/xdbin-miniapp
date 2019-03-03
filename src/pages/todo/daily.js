import Taro, { Component } from "@tarojs/taro";
import { View, AtSwipeAction, AtMessage } from "taro-ui";
import moment from "moment";

import "./daily.scss";
import TodoItem from "../../components/todo/TodoItem";
import { fetchTodayTodoList, finishTodoById } from "../../service/todo_service";

class DailyPage extends Component {
  config = {
    navigationBarTitleText: moment().format("MM月DD日"),
    enablePullDownRefresh: true
  };

  state = {
    todos: []
  };

  componentWillMount() {
    this.handleReqTodayTodos();
  }

  onPullDownRefresh() {
    // 下拉刷新，获取最新的数据
    this.handleReqTodayTodos(() => {
      Taro.stopPullDownRefresh();
    });
  }

  handleReqTodayTodos(callback) {
    Taro.showNavigationBarLoading();
    fetchTodayTodoList({ pageNo: 1, pageSize: 50 })
      .then(res => {
        const { content } = res;
        this.setState({
          todos: content
        });
        Taro.hideNavigationBarLoading();
        if (callback && typeof callback === "function") {
          callback();
        }
      })
      .catch(() => {
        Taro.atMessage({ type: "error", message: "请求失败" });
        Taro.hideNavigationBarLoading();
        if (callback && typeof callback === "function") {
          callback();
        }
      });
  }

  handleFinish(id) {
    finishTodoById(id)
      .then((res) => {
        this.setState({
          todos: this.state.todos.map(todo =>
            todo.id === res.id ? Object.assign({}, todo, res) : todo
          )
        });
      });
  }

  render() {
    const { todos } = this.state;
    return (
      <View className="page-container">
        <AtMessage />
        {todos.map(todo => (
          <View key={todo.id} className="todo-wrapper">
            <AtSwipeAction
              disabled={todo.ifFinish == 1}
              autoClose
              options={[
                {
                  text: "完成",
                  style: {
                    backgroundColor: "#86BDCE",
                    width: "40px"
                  }
                }
              ]}
              onClick={this.handleFinish.bind(this, todo.id)}
            >
              <TodoItem key={todo.id} todo={todo} />
            </AtSwipeAction>
          </View>
        ))}
      </View>
    );
  }
}

export default DailyPage;
