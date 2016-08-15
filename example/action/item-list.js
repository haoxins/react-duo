
import * as api from '../api'
import store from '../store'

export function getItems() {
  return api
    .getItems()
    .then(({items}) => ({items}))
}

export function addItem(data) {
  const items = store.get('itemList.items')

  return api
    .addItem(data)
    .then(({item}) => ({
      items: [...items, item],
      added: item
    }))
}
