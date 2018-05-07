import React from "react";
import { FILTER_ACTIVE, FILTER_COMPLETED } from "../utils";

const activeCount = (todos = []) =>
  todos.filter(todo => todo.completed === false).length || 0;
const completedCount = (todos = []) =>
  todos.filter(todo => todo.completed === true).length || 0;

const handleFilterClick = (
  event,
  filter = null,
  onFilter = () => {}
) => {
  event.preventDefault();
  onFilter(filter);
}

const links = [{
  text: "All",
  handleClick: (event, onFilter) => {
    handleFilterClick(event, null, onFilter);
  },
  filter: null
}, {
  text: "Active",
  handleClick: (event, onFilter) => {
    handleFilterClick(event, FILTER_ACTIVE, onFilter);
  },
  filter: FILTER_ACTIVE
}, {
  text: "Completed",
  handleClick: (event, onFilter) => {
    handleFilterClick(event, FILTER_COMPLETED, onFilter);
  },
  filter: FILTER_COMPLETED
}]

const TodoFooter = ({
  todos = [],
  onClearCompleted = () => {},
  onFilter = () => {},
  selectedFilter = null
}) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{activeCount(todos)}</strong> item(s) left
    </span>
    <ul className="filters">
      {links.map(link => (
        <li key={link.text}>
          <a
            href="#"
            onClick={e => link.handleClick(e, onFilter)}
            className={selectedFilter === link.filter ? "selected" : ""}
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
    <button className="clear-completed" onClick={onClearCompleted}>
      Clear completed ({completedCount(todos)})
    </button>
  </footer>
);

export default TodoFooter;
