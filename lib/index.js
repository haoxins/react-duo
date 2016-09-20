
export { default as connect } from './connect'
import Store from './store'

export function createStore(opts) {
  return new Store(opts)
}
