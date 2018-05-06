import React, { Component } from "react";
import { TodoService } from '../utils';

const ENTER_KEY = 13;

class TodoHeader extends Component {
  handleKeyPress = async (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    let { onAddTodo = () => {} } = this.props

    await TodoService.addTodo({
      text: e.target.value,
      completed: false
    })

    this.todoInput.value = '';
    onAddTodo();
  }
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.handleKeyPress}
          ref={(input) => this.todoInput = input}
          autoFocus={true}
        />
      </header>
    )
  }
}

class TodoItem extends Component {
  render() {
    let {
      todo = {},
      onComplete = () => {},
      onDestroy = () => {}
    } = this.props;
    return (
      <li key={todo.id} className={todo.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onComplete(todo)}
          />
          <label>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => onDestroy(todo)} />
        </div>
        <input
          className="edit"
          value={todo.text}
        />
      </li>
    )
  }
}

const TodoList = ({
  todos = [],
  onComplete = () => {},
  onDestroy = () => {}
}) => {
  return (
    <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          checked={false}
        />
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              onComplete={onComplete}
              onDestroy={onDestroy}
            />
          ))}
        </ul>
    </section>
  )
}

class TodoFooter extends Component {
  render() {
    let {
      todos = [],
      onClearCompleted = () => {}
    } = this.props;
    let activeTodoCount = todos.filter(todo => todo.completed === false).length || 0;
    let completedTodoCount = todos.filter(todo => todo.completed === true).length || 0;
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodoCount}</strong> item(s) left
        </span>
        <ul className="filters">
          <li>
            <a href="#/">
              All
            </a>
          </li>
          {' '}
          <li>
            <a href="#/active">
              Active
            </a>
          </li>
          {' '}
          <li>
            <a href="#/completed">
              Completed
            </a>
          </li>
        </ul>
        <button
          className="clear-completed"
          onClick={onClearCompleted}>
          Clear completed ({completedTodoCount})
        </button>
      </footer>
    )
  }
}

class TodoApp extends Component {
  state = {
    todos: [],
    filter: null
  }

  retrieveTodos = async () => {
    let todos = await TodoService.getTodos();
    this.setState({ todos });
  }

  handleClearCompleted = async () => {
    await TodoService.clearCompleted();
    await this.retrieveTodos();
  }

  handleCompleteTodo = async (todo) => {
    await TodoService.completeTodo(todo);
    await this.retrieveTodos();
  }

  handleDestroyTodo = async (todo) => {
    await TodoService.destroyTodo(todo);
    await this.retrieveTodos();
  }

  componentDidMount = () => this.retrieveTodos()

  render() {
    let { todos = [] } = this.state;
    return (
      <section className="todoapp">
        <TodoHeader
          onAddTodo={this.retrieveTodos}
        />
        <TodoList
          todos={todos}
          onComplete={this.handleCompleteTodo}
          onDestroy={this.handleDestroyTodo}
        />
        <TodoFooter
          todos={todos}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    )
  }
}

export default TodoApp;
