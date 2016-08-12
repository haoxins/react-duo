
import * as api from '../api'
import store from '../store'

export function getItem(id) {
  return api
    .getItem(id)
    .then(({item}) => {
      store.set({item})
    })
}
