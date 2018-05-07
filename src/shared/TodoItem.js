import React from 'react';

const TodoItem = ({
  todo = {},
  onComplete = () => {},
  onDestroy = () => {}
}) => (
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

export default TodoItem;
