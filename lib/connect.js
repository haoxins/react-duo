
import { Component } from 'react'

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
          return this.dispatch(updated)
        },
        duoProps: {}
      }

      componentWillMount() {
        const { route } = this.props

        this.setState({
          duoProps: store.getAll(route.path)
        })
      }

      componentWillUnmount() {
        store.removeListener(this.onChange)
      }

      componentDidMount() {
        store.addListener(this.onChange)
      }

      onChange = () => {
        const { route } = this.props

        this.setState({
          duoProps: store.getAll(route.path)
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
