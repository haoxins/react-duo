
import clone from 'lodash.clonedeep'

export default class Store {
  constructor(opts) {
    const {
      defaultState = {}
    } = opts

    this._store = clone(defaultState)
    this._listeners = []
  }

  onChange(listener) {
    if (typeof listener !== 'function') {
      throw new Error('invalid listener')
    }

    this._listeners.push(listener)
  }

  getAll() {
    return this._store
  }

  set(update) {
    const pre = clone(this._store)
    this._store = clone({...pre, ...update})
    const next = clone(this._store)

    this._listeners.forEach(listener => {
      listener(next, pre)
    })
  }

  get(key) {
    return this._store[key]
  }
}
