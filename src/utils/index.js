import { v4 as uuid } from 'uuid';

export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';

export const TodoService = (storage) => {
  return {

    addTodo: (todo = {}) => storage.setItem(todo),

    clearCompleted: () => {
      let todos = storage.getAll();
      storage.setItems(
        todos.filter(todo => todo.completed === false)
      );
    },

    completeTodo: (todo = {}) => {
      let todos = storage.getAll();
      storage.setItems([
        ...todos.filter(t => t.id !== todo.id),
        Object.assign(todo, { completed: !todo.completed })
      ]);
    },

    destroyTodo: todo => storage.remove(todo),

    getTodos: () => storage.getAll()

  }
}
