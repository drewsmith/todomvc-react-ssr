import { v4 as uuid } from 'uuid';

const TODOS_KEY = 'todosmvc:todos'
const setTodos = todos => localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

export const TodoService = {

  addTodo: async (todo = {}) => {
    let todos = await TodoService.getTodos();
    setTodos([
      ...todos,
      Object.assign(todo, { id: uuid.v4() })
    ])
  },

  clearCompleted: async () => {
    let todos = await TodoService.getTodos();
    setTodos(todos.filter(todo => todo.completed === false));
  },

  completeTodo: async (todo) => {
    let todos = await TodoService.getTodos();
    setTodos([
      ...todos.filter(t => t.id !== todo.id),
      Object.assign(todo, { completed: !todo.completed })
    ]);
  },

  destroyTodo: async (todo) => {
    let todos = await TodoService.getTodos();
    setTodos(todos.filter(t => t.id !== todo.id));
  },

  getTodos: async () => {
    let todos = localStorage.getItem(TODOS_KEY)
    return todos ? JSON.parse(todos) : []
  }

}
