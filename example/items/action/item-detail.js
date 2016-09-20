
import store from '../store'

export function getItem(id) {
  id = id | 0

  const items = store.get('items.items') || []

  const item = items.filter(i => i.id === id)[0]

  if (!item) {
    throw new Error('item not found')
  }

  return Promise.resolve({
    item: {...item}
  })
}
