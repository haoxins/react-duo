
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from '../../../'

import Flag from './widget/flag'
import store from '../store'

import {
  getItems,
  addItem
} from '../action/item-list'

@connect(store)
class ItemList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getItems())
  }

  state = {
    name: ''
  }

  render() {
    const {
      dispatch,

      items,
      flag
    } = this.props

    const {
      name
    } = this.state

    return (
      <item-list>
        <h3>List</h3>
        {
          items.map(item => (
            <div key={item.id}>
              <Link to={`/items/${item.id}`}>{item.name}</Link>
            </div>
          ))
        }

        <section>
          <input placeholder='new item name' onChange={
            e => this.setState({name: e.target.value})
          } />
          <button onClick={() => dispatch(addItem({name}))}>Add</button>
        </section>

        <Flag dispatch={dispatch} flag={flag} />
      </item-list>
    )
  }
}

export default ItemList
