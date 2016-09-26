
import { Component } from 'react'

function connect(store, extra = {}) {
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
          return this.dispatch(updated)
        },
        duoProps: {}
      }

      componentWillMount() {
        this.setState({
          duoProps: this.getDuoProps()
        })
      }

      componentWillUnmount() {
        store.removeListener(this.onChange)
      }

      componentDidMount() {
        store.addListener(this.onChange)
      }

      getDuoProps() {
        const { route } = this.props
        const props = store.getAll(route.path)

        Object.keys(extra).forEach(k => {
          props[k] = store.get(extra[k])
        })

        return props
      }

      onChange = () => {
        this.setState({
          duoProps: this.getDuoProps()
        })
      }

      dispatch = (updated) => {
        const { route } = this.props

        if (route && route.path) {
          return _dispatch(updated, {
            path: route.path
          })
        } else {
          return _dispatch(updated)
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
