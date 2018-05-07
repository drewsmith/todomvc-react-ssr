import React, { Component } from "react";

import TodoHeader from "./TodoHeader";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

import { TodoService, FILTER_ACTIVE, FILTER_COMPLETED } from "../utils";
import Storage from "../utils/storage";

const todoService = new TodoService(Storage);

class TodoApp extends Component {
  state = {
    todos: [],
    filter: null
  };

  retrieveTodos = () => {
    let todos = todoService.getTodos();
    let { filter } = this.state;

    if (filter === FILTER_ACTIVE) {
      todos = todos.filter(todo => todo.completed === false);
    } else if (filter === FILTER_COMPLETED) {
      todos = todos.filter(todo => todo.completed === true);
    }
    this.setState({ todos });
  };

  handleFilter = (filter = null) =>
    this.setState({ filter }, this.retrieveTodos);

  handleAddTodo = todo => {
    todoService.addTodo(todo);
    this.retrieveTodos();
  };

  handleClearCompleted = () => {
    todoService.clearCompleted();
    this.retrieveTodos();
  };

  handleCompleteTodo = todo => {
    todoService.completeTodo(todo);
    this.retrieveTodos();
  };

  handleDestroyTodo = todo => {
    todoService.destroyTodo(todo);
    this.retrieveTodos();
  };

  componentDidMount = () => this.retrieveTodos();

  render() {
    let { todos = [] } = this.state;
    return (
      <section className="todoapp">
        <TodoHeader onAddTodo={this.handleAddTodo} />
        <TodoList
          todos={todos}
          onComplete={this.handleCompleteTodo}
          onDestroy={this.handleDestroyTodo}
        />
        <TodoFooter
          todos={todos}
          onClearCompleted={this.handleClearCompleted}
          onFilter={this.handleFilter}
        />
      </section>
    );
  }
}

export default TodoApp;
