
import connect from './connect'
import Store from './store'

const isArray = Array.isArray

function createStore(defaults) {
  if (typeof defaults !== 'object') {
    throw new Error('invalid default state')
  }

  if (isArray(defaults)) {
    return new Store({
      defaults
    })
  }

  return new Store({
    defaultState: defaults
  })
}

export {
  createStore,
  connect
}
