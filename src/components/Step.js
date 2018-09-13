// Module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'





// Component imports
import { Consumer } from './Context'





export class Step extends Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static defaultProps = {
    render: null,
  }

  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    render: PropTypes.func,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderChildren (childProps) {
    const {
      children,
      id,
      render,
    } = this.props

    if (render) {
      return render(childProps)
    }

    if (typeof children === 'function') {
      return child(childProps)
    }

    return children
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { id } = this.props

    return (
      <Consumer>
        {({ currentStep, ...childProps }) => (currentStep === id) ? this._renderChildren(childProps) : null}
      </Consumer>
    )
  }
}