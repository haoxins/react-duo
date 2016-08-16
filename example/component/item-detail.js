
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Flag from './widget/flag'
import { connect } from '../../'
import store from '../store'

import {
  getItem
} from '../action/item-detail'

@connect(store)
class ItemDetail extends Component {
  componentDidMount() {
    const { id } = this.props.params
    const { dispatch } = this.props
    dispatch(getItem(id))
  }

  render() {
    const { id } = this.props.params
    const {
      dispatch,

      item,
      flag
    } = this.props

    return (
      <item-detail>
        <h3>{`item id: ${item.id}`}</h3>

        <span>{`item name: ${item.name}`}</span>

        <Flag dispatch={dispatch} flag={flag} />
        <Link to='/items'>Back</Link>
      </item-detail>
    )
  }
}

export default ItemDetail
