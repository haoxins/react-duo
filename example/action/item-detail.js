
import * as api from '../api'

export function getItem(id) {
  return api
    .getItem(id)
    .then(({item}) => ({item}))
}
