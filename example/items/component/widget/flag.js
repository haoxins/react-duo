
import { Component, PropTypes } from 'react'

import {
  setFlag
} from '../../action/common'

class Flag extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    flag: PropTypes.string.isRequired
  }

  render() {
    const {
      dispatch,
      flag
    } = this.props

    return (
      <div>
        <header>
          {flag}
        </header>
        <main>
          <input placeholder='new flag' onChange={
            e => dispatch(setFlag(e.target.value))
          } />
        </main>
      </div>
    )
  }
}

export default Flag
