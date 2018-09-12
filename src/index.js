// Module imports
import PropTypes from 'prop-types'
import React, { Component } from 'react'





// Component constants
const {
  Consumer,
  Provider,
} = React.createContext({
  step: 0,
  wizardState: {},
  setStep: () => {},
})





export class Wizard extends Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static defaultProps = {
    defaultStep: null,
    onStepChange: () => {},
  }

  static propTypes = {
    defaultStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onStepChange: PropTypes.func,
  }

  /* eslint-disable react/no-unused-state */
  state = {
    currentStep: 0,
    wizardState: {},
    setStep: this.setStep,
  }
  /* eslint-enable react/no-unused-state */





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    const { defaultStep } = this.props

    this.setStep(defaultStep || this.steps[0])
  }

  setStep = (stepId, newState = {}) => {
    const {
      onStepChange,
    } = this.props

    this.setState(state => ({
      currentStep: stepId,
      wizardState: {
        ...state.wizardState,
        ...newState,
      },
    }), () => {
      if (onStepChange) {
        onStepChange(this.state.wizardState)
      }
    })
  }

  render () {
    const { children } = this.props

    return (
      <Provider value={this.state}>
        {children}
      </Provider>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get steps () {
    const { children } = this.props

    return React.Children.map(children, ({ props: { id } }, index) => id || index)
  }
}





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
      render,
    } = this.props

    const renderChildProps = { ...childProps }
    delete renderChildProps.setStep
    delete renderChildProps.wizardState

    return React.Children.map(children, child => {
      if (typeof child === 'function') {
        return child(childProps)
      }

      if (render) {
        return render(childProps)
      }

      return React.cloneElement(child, renderChildProps)
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  render () {
    const { id } = this.props

    return (
      <Consumer>
        {({ currentStep, ...childProps }) => (
          <div hidden={currentStep !== id}>
            {this._renderChildren(childProps)}
          </div>
        )}
      </Consumer>
    )
  }
}