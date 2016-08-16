
import { createStore } from '../../../'

const defaults = [{
  name: 'itemList',
  path: 'items',
  state: {
    items: [],
    added: {},
    flag: ''
  }
}, {
  name: 'itemDetail',
  path: 'items/:id',
  state: {
    item: {},
    flag: ''
  }
}]

export default createStore(defaults, {
  smart: true
})
