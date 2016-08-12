
import { Component, PropTypes } from 'react'
import { connect } from '../../'
import store from '../store'

import {
  getItem
} from '../action/item-detail'

@connect(store)
class ItemDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params
    getItem(id)
  }

  render() {
    const { id } = this.props.params
    const { item = {} } = this.props

    return (
      <item-detail>
        <h3>{`item id: ${item.id}`}</h3>

        <span>{`item name: ${item.name}`}</span>
      </item-detail>
    )
  }
}

export default ItemDetail
