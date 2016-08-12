
const items = [{
  id: 1,
  name: 'one'
}, {
  id: 2,
  name: 'two'
}, {
  id: 3,
  name: 'three'
}]

export function getItems() {
  return Promise.resolve({
    message: 'success',
    total: items.length,
    page: 1,
    items
  })
}

export function getItem(id) {
  id = id | 0
  const item = items.filter(i => i.id === id)[0]

  if (!item) {
    return Promise.resolve({
      message: 'not found',
    })
  }

  return Promise.resolve({
    message: 'success',
    item: {...item}
  })
}

export function addItem(item) {
  const id = items.length + 1
  const data = {...item, id}

  items.push(data)

  return Promise.resolve({
    message: 'success',
    item: {...data}
  })
}
