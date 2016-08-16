
import { Route, IndexRedirect } from 'react-router'

import ItemDetail from '../component/item-detail'
import ItemList from '../component/item-list'
import App from '../component/app'

const routes = (
  <Route path='/' component={App}>
    <IndexRedirect to='items' />
    <Route path='items/:id' component={ItemDetail} />
    <Route path='items' component={ItemList} />
  </Route>
)

export default routes
