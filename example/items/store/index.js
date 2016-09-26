
import { createStore } from '../../../'

export default createStore({
  smart: true,
  routes: [{
    name: 'itemDetail',
    path: 'items/:id'
  }]
})
