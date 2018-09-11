// Module imports
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

  /* eslint-disable react/no-unused-state */
  state = {
    step: 0,
    wizardState: {},
    setStep: this.setStep,
  }
  /* eslint-enable react/no-unused-state */





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  setStep = (stepId, newState) => {
    const {
      onStepChange,
    } = this.props

    this.setState(state => ({
      step: stepId,
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
    return (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}





export const Step = ({ stepId, children }) => (
  <Consumer>
    {({ step, ...childProps }) => {
      if (step === stepId) {
        return children(childProps)
      }
      return null
    }}
  </Consumer>
)