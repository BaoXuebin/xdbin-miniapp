import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./TodoItem.scss";

class TodoItem extends Component {
  render() {
    const { type, title, ifFinish } = this.props.todo;
    return (
      <View className={`todo-item-container ${type}`}>
        <View className="color-border" />
        <View className="cata-icon" />
        <View className="content">
          <Text>{title}</Text>
        </View>
        { ifFinish && <View className="finish" /> }
      </View>
    );
  }
}

export default TodoItem;
