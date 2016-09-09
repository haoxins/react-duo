
import clone from 'lodash.clonedeep'

const isArray = Array.isArray

export default class Store {
  constructor(opts) {
    const {
      defaultState,
      defaults
    } = opts

    this._store = clone(defaultState)
    this._listeners = []
    this._routes = []
    this.smart = true

    if (this.smart) {
      if (!isArray(defaults)) {
        throw new Error('invalid default state with smart mode')
      }
      this.setDefaults(defaults)
    } else {
      if (!isObject(defaultState)) {
        throw new Error('invalid default state')
      }
      this.setDefault(defaultState)
    }
  }

  setDefaults(defaults) {
    this._routes = defaults.map(def => ({
      path: def.path,
      name: def.name
    }))

    defaults.forEach(def => {
      const path = def.path
      const state = def.state || {}

      this._set(state, {path})
    })
  }

  setDefault() {
    // TODO
  }

  getNameByPath(path) {
    const r = this._routes
      .filter(r => r.path === path)

    if (r.length) {
      return r[0].name
    }

    return ''
  }

  dispatch = (updated, opts = {}) => {
    const { path } = opts

    return Promise.resolve(updated)
      .then(data => {
        this._set(data, {path})
        return clone(data)
      })
  }

  removeListener(listener) {
    for (let i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i] === listener) {
        this._listeners.splice(i, 1)
        break
      }
    }
  }

  addListener(listener) {
    if (typeof listener !== 'function') {
      throw new Error('invalid listener')
    }

    if (this._listeners.includes(listener)) {
      throw new Error('duplicated listener')
    }

    this._listeners.push(listener)
  }

  getAll(path) {
    let result = {}

    if (path) {
      const name = this.getNameByPath(path)
      Object.keys(this._store).forEach(key => {
        if (key.startsWith(name + '.')) {
          result[key.replace(name + '.', '')] = this._store[key]
        }
      })

      return clone(result)
    }

    return clone(this._store)
  }

  _set(updated, opts = {}) {
    const { path } = opts

    if (this.smart && !path) {
      throw new Error('route path is required for smart mode')
    }

    const pre = clone(this._store)

    if (this.smart) {
      const name = this.getNameByPath(path)
      const up = {}
      Object.keys(updated).forEach(key => {
        up[name + '.' + key] = updated[key]
      })

      this._store = clone({...pre, ...up})
    } else {
      this._store = clone({...pre, ...updated})
    }

    this._listeners.forEach(listener => {
      listener()
    })
  }

  /**
   * key: `itemDetail.item`, `item`
   */
  get(key) {
    return this._store[key]
  }
}

/**
 * private
 */

function isObject(o) {
  return o && (typeof o === 'object') && !isArray(o)
}
