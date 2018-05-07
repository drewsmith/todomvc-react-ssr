import { TodoService } from '..';

const mockStorage = (mockItems = []) => {
  let items = mockItems;
  return {
    getAll: () => items,
    remove: item => (items = items.filter(i => i.id !== item.id)),
    setItem: item => items.push(item),
    setItems: newItems => (items = newItems)
  };
};

describe('TodoService', () => {
  describe('addItem', () => {
    test('should create new todo', () => {
      let todoService = new TodoService(mockStorage());

      let todo = {
        text: 'Testing',
        completed: true
      };

      todoService.addTodo(todo);

      let items = todoService.getTodos();
      expect(items.length).toBe(1);
      expect(items[0].text).toBe(todo.text);
      expect(items[0].completed).toBe(todo.completed);
    });
  });

  describe('clearCompleted', () => {
    test('should clear completed todos', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            text: 'Testing',
            completed: true
          },
          {
            text: 'Testing2',
            completed: true
          }
        ])
      );

      let items = todoService.getTodos();
      expect(items.length).toBe(2);
      expect(items.filter(item => item.completed === true).length).toBe(2);

      todoService.clearCompleted();
      expect(todoService.getTodos().length).toBe(0);
    });

    test('should leave active todos intact', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            text: 'Testing',
            completed: false
          },
          {
            text: 'Testing2',
            completed: false
          }
        ])
      );

      let items = todoService.getTodos();
      expect(items.length).toBe(2);
      expect(items.filter(item => item.completed === false).length).toBe(2);

      todoService.clearCompleted();
      items = todoService.getTodos();
      expect(items.length).toBe(2);
      expect(items.filter(item => item.completed === false).length).toBe(2);
    });
  });

  describe('completeTodo', () => {
    test('should complete active todo', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            id: 1,
            text: 'Testing',
            completed: false
          }
        ])
      );
      todoService.completeTodo({ id: 1, completed: false });
      let todos = todoService.getTodos();
      expect(todos.length).toBe(1);
      expect(todos[0].completed).toBe(true);
    });
    test('should activate completed todo', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            id: 1,
            text: 'Testing',
            completed: true
          }
        ])
      );
      todoService.completeTodo({ id: 1, completed: true });
      let todos = todoService.getTodos();
      expect(todos.length).toBe(1);
      expect(todos[0].completed).toBe(false);
    });
  });

  describe('destroyTodo', () => {
    test('should destroy todo', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            id: 1
          }
        ])
      );

      let todos = todoService.getTodos();
      expect(todos.length).toBe(1);

      todoService.destroyTodo({ id: 1 });
      expect(todoService.getTodos().length).toBe(0);
    });
    test('should ignore unknown todo', () => {
      let todoService = new TodoService(
        mockStorage([
          {
            id: 1
          }
        ])
      );

      let todos = todoService.getTodos();
      expect(todos.length).toBe(1);

      todoService.destroyTodo({ id: 2 });
      expect(todoService.getTodos().length).toBe(1);
    });
  });
});
