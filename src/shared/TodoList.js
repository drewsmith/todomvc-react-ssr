import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos = [],
  onComplete = () => {},
  onDestroy = () => {}
}) => {
  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" checked={false} />
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem todo={todo} onComplete={onComplete} onDestroy={onDestroy} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
