
import { createStore } from '../../'

import { switchItem } from './action'

const store = createStore({
  currentItemId: 0
})

store.subscribeActions({
  [switchItem]: (id) => ({
    currentItemId: id
  })
})

export default store
