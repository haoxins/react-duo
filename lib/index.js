
import connect from './connect'
import Store from './store'

function createStore(defaultState) {
  return new Store({
    defaultState
  })
}

export {
  createStore,
  connect
}
