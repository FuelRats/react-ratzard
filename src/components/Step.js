// Module imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'





// Component imports
import { Consumer } from './Context'





export class InternalStep extends Component {
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

  _renderChildren () {
    const {
      children,
      render,
    } = this.props

    if (render) {
      return render(this.props)
    }

    if (typeof children === 'function') {
      return child(this.props)
    }

    return children
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    const {
      addStep,
      id,
    } = props

    addStep(id)
  }

  render () {
    const { id, currentStep } = this.props

    return (currentStep === id) ? this._renderChildren() : null
  }
}





export const Step = props => (
  <Consumer>
    {(WizardContext) => (
      <InternalStep
        {...props}
        {...WizardContext} />
    )}
  </Consumer>
)
