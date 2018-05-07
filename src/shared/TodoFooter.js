import React from 'react';
import { FILTER_ACTIVE, FILTER_COMPLETED } from '../utils';

const activeCount = (todos = []) => todos.filter(todo => todo.completed === false).length || 0;
const completedCount = (todos = []) => todos.filter(todo => todo.completed === true).length || 0;

const TodoFooter = ({
  todos = [],
  onClearCompleted = () => {},
  onFilter = () => {}
}) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{activeCount(todos)}</strong> item(s) left
    </span>
    <ul className="filters">
      <li>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onFilter(null);
        }}>
          All
        </a>
      </li>
      {' '}
      <li>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onFilter(FILTER_ACTIVE);
        }}>
          Active
        </a>
      </li>
      {' '}
      <li>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onFilter(FILTER_COMPLETED);
        }}>
          Completed
        </a>
      </li>
    </ul>
    <button
      className="clear-completed"
      onClick={onClearCompleted}>
      Clear completed ({completedCount(todos)})
    </button>
  </footer>
)

export default TodoFooter;
