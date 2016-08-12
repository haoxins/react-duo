
import { Component, PropTypes } from 'react'
import clone from 'lodash.clonedeep'

function connect(store) {
  return function(InnerComponent) {
    class OuterComponent extends Component {
      static propTypes = {
      }

      constructor(props, context) {
        super(props, context)
      }

      state = {
        duoProps: {}
      }

      componentWillMount() {
      }

      componentDidMount() {
        this.setState({
          duoProps: clone(store.getAll())
        })

        store.onChange(newStore => {
          this.setState({
            duoProps: newStore
          })
        })
      }

      render() {
        const {
          duoProps
        } = this.state

        return (
          <InnerComponent {...duoProps} {...this.props} />
        )
      }
    }

    return OuterComponent
  }
}

export default connect
