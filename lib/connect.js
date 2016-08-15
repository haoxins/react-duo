
import { Component, PropTypes } from 'react'
import clone from 'lodash.clonedeep'

function connect(store) {
  const _dispatch = store.dispatch

  return function(InnerComponent) {
    class OuterComponent extends Component {
      static propTypes = {
      }

      constructor(props, context) {
        super(props, context)
      }

      state = {
        dispatch: (updated) => {
          this.dispatch(updated)
        },
        duoProps: {}
      }

      componentWillMount() {
      }

      componentDidMount() {
        const { route } = this.props

        this.setState({
          duoProps: clone(store.getAll())
        })

        store.onChange(() => {
          this.setState({
            duoProps: store.getAll(route.path)
          })
        })
      }

      dispatch = (updated) => {
        const { route } = this.props

        if (route && route.path) {
          _dispatch(updated, {
            path: route.path
          })
        } else {
          _dispatch(updated)
        }
      }

      render() {
        const {
          dispatch,
          duoProps
        } = this.state

        return (
          <InnerComponent dispatch={dispatch}
            {...duoProps} {...this.props} />
        )
      }
    }

    return OuterComponent
  }
}

export default connect
