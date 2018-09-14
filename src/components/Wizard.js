// Module imports
import PropTypes from 'prop-types'
import React, { Component } from 'react'





// Component imports
import { Provider } from './Context'





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
    currentStep: this.props.defaultStep || this.steps[0],
    hasNextStep: false,
    hasPreviousStep: false,
    steps: [],
    wizardState: {},
  }
  /* eslint-enable react/no-unused-state */





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderChildren () {
    const {
      children,
      render,
    } = this.props

    if (render) {
      return render(this.passthroughState)
    }

    if (typeof children === 'function') {
      return children(this.passthroughState)
    }

    return children
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  addStep = stepID => {
    if (this.state.steps[stepID]) {
      throw new Error(`Attempting to add duplicate step ID: ${stepID}`)
    }

    this.setState(state => {
      const {
        currentStep,
        steps,
      } = state

      const newSteps = [...steps, stepID]

      const wizardHasMoreThanOneStep = newSteps.length > 1
      const currentStepIsFirstStep = currentStep === newSteps[0]
      const currentStepIsLastStep = currentStep === newSteps[newSteps.length - 1]

      return {
        hasNextStep: wizardHasMoreThanOneStep && !currentStepIsLastStep,
        hasPreviousStep: wizardHasMoreThanOneStep && !currentStepIsFirstStep,
        steps: newSteps,
      }
    })
  }

  goToNextStep = () => {
    const {
      steps,
      currentStep,
    } = this.state

    const currentStepIndex = steps.indexOf(currentStep)

    this.goToStep(steps[currentStepIndex + 1])
  }

  goToPreviousStep = () => {
    const {
      steps,
      currentStep,
    } = this.state

    const currentStepIndex = steps.indexOf(currentStep)

    this.goToStep(steps[currentStepIndex - 1])
  }

  render () {
    return (
      <Provider value={this.passthroughState}>
        {this._renderChildren()}
      </Provider>
    )
  }

  goToStep = (stepID, newState = {}) => {
    const {
      onStepChange,
    } = this.props
    const {
      steps,
    } = this.state

    const wizardHasMoreThanOneStep = steps.length > 1
    const currentStepIsFirstStep = stepID === steps[0]
    const currentStepIsLastStep = stepID === steps[steps.length - 1]

    this.setState(state => ({
      currentStep: stepID,
      hasNextStep: wizardHasMoreThanOneStep && !currentStepIsLastStep,
      hasPreviousStep: wizardHasMoreThanOneStep && !currentStepIsFirstStep,
      wizardState: {
        ...state.wizardState,
        ...newState,
      },
    }), () => {
      onStepChange(this.state.wizardState)
    })
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get passthroughState () {
    return {
      ...this.state,
      addStep: this.addStep,
      goToNextStep: this.goToNextStep,
      goToPreviousStep: this.goToPreviousStep,
      goToStep: this.goToStep,
    }
  }
}
