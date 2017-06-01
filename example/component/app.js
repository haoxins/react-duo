
import { Component } from 'react'

import { switchItem } from './action'
import { connect } from '../../'

import ItemInfo from './item-info'
import ItemList from './item-list'

import store from './store'

@connect(store)
class App extends Component {
  render() {
    const { currentItemId } = this.props

    return (
      <app>
        <ItemList onSwitchItem={id => switchItem(id)} />
        <ItemInfo id={currentItemId} />
      </app>
    )
  }
}

export default App
