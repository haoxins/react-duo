
import { Component } from 'react'

import { add, del } from './action'
import store from './store'

import { connect } from '../../../'

function noop() {}

const Items = ({items = [], onSwitchItem}) => (
  <div>
    {
      items.map(i => (
        <section key={i.id} onClick={() => onSwitchItem(i.id)}>
          <label>{i.title}</label>
          <span>{i.price}</span>
          <button onClick={() => del(i.id)}>del</button>
        </section>
      ))
    }
  </div>
)

@connect(store)
class ItemList extends Component {
  static defaultProps = {
    onSwitchItem: noop
  }

  state = {}

  render() {
    const { items, onSwitchItem} = this.props
    const { title, price } = this.state

    return (
      <list>
        <Items items={items} onSwitchItem={onSwitchItem} />
        <div>
          <input value={title} placeholder='title' onChange={
            e => this.setState({title: e.target.value})
          } />
          <input value={price} placeholder='price' onChange={
            e => this.setState({price: e.target.value})
          } />
          <button onClick={() => {
            add({title, price})
            this.setState({title: '', price: ''})
          }}>add</button>
        </div>
      </list>
    )
  }
}

export default ItemList
