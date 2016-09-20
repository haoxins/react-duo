
import clone from 'lodash.clonedeep'

const isArray = Array.isArray

export default class Store {
  constructor(opts) {
    const {
      smart = true,
      routes
    } = opts

    this._store = {}
    this._listeners = []
    this._routes = []
    this.smart = smart

    if (routes) {
      if (!isArray(routes)) {
        throw new Error('store: invalid routes')
      }

      this.setRoutes(routes)
    }
  }

  setRoutes(routes) {
    this._routes = routes.map(r => ({
      path: r.path,
      name: r.name
    }))
  }

  getNameByPath(path) {
    const r = this._routes
      .filter(r => r.path === path)

    if (r.length) {
      return r[0].name
    }

    return path.replace(/\//g, '.').replace(/\:/g, '')
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
