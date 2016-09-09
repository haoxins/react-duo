
export { default as connect } from './connect'
import Store from './store'

const isArray = Array.isArray

export function createStore(defaults) {
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
