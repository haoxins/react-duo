
import * as api from '../api'
import store from '../store'

export function getItems() {
  return api
    .getItems()
    .then(({items}) => {
      store.set({items})
    })
}

export function addItem(data) {
  const items = store.get('items')

  return api
    .addItem(data)
    .then(({item}) => {
      store.set({
        items: [...items, item],
        added: item
      })
    })
}
