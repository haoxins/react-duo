
import store from '../store'

export function getItems() {
  const items = store.get('items.items') || []

  return Promise.resolve({
    total: items.length,
    page: 1,
    items
  })
}

export function addItem(data) {
  const items = store.get('items.items') || []
  const id = items.length + 1
  const item = {...data, id}

  return Promise.resolve({
    items: [...items, item],
    added: item
  })
}
