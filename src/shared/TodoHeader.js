import React, { Component } from "react";

const ENTER_KEY = 13;

class TodoHeader extends Component {
  handleKeyPress = e => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    let { onAddTodo = () => {} } = this.props;

    onAddTodo({
      text: e.target.value,
      completed: false
    });

    if (this.todoInput) {
      this.todoInput.value = "";
    }
  };
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyPress}
          ref={input => (this.todoInput = input)}
          autoFocus={true}
        />
      </header>
    );
  }
}

export default TodoHeader;
