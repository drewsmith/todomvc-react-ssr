import { v4 as uuid } from 'uuid';
const KEY = 'todosmvc:todos';

const Storage = {

  getAll: () => {
    let items = localStorage.getItem(KEY);
    return items ? JSON.parse(items) : [];
  },

  remove: (item = {}) => {
    Storage.setItems(
      Storage.getAll().filter(i => i.id !== item.id)
    )
  },

  setItem: (item = {}) => {
    Storage.setItems([
      ...Storage.getAll().filter(i => i.id !== item.id),
      Object.assign(item, { id: uuid.v4() })
    ])
  },

  setItems: (items = []) => localStorage.setItem(
    KEY,
    JSON.stringify(items)
  )

}

export default Storage;
