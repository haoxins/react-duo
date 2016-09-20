
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from '../../../'

import Flag from './widget/flag'
import store from '../store'

import {
  getItem
} from '../action/item-detail'

@connect(store)
class ItemDetail extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  static defaultProps = {
    item: {},
    flag: ''
  }

  componentDidMount() {
    const { id } = this.props.params
    const { dispatch } = this.props
    dispatch(getItem(id))
  }

  render() {
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
