
import { Component, PropTypes } from 'react'

class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <article>
        <header>
          <h1>hello, react-duo!</h1>
        </header>
        {children}
      </article>
    )
  }
}

export default App
