
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from '../../'
import store from '../store'

import {
  getItems,
  addItem
} from '../action/item-list'

@connect(store)
class ItemList extends Component {
  componentDidMount() {
    getItems()
  }

  render() {
    const {
      items = []
    } = this.props

    return (
      <item-list>
        <h3></h3>
        {
          items.map(item => (
            <div key={item.id}>
              <Link to={`/items/${item.id}`}>{item.name}</Link>
            </div>
          ))
        }
      </item-list>
    )
  }
}

export default ItemList
