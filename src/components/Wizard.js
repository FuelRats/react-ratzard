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
      return render(this.state)
    }

    if (typeof children === 'function') {
      return children(this.state)
    }

    return children
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  addStep = stepID => {
    const { steps } = this.state
    const { currentStep } = this.props

    if (steps[stepID]) {
      throw new Error(`Attempting to add duplicate step ID: ${stepID}`)
    }

    const newSteps = [...steps, stepID]

    const wizardHasMoreThanOneStep = newSteps.length > 1
    const currentStepIsFirstStep = currentStep === newSteps[0]
    const currentStepIsLastStep = currentStep === newSteps[newSteps.length - 1]

    console.group('Adding step...', stepID)
    console.log('newSteps', newSteps)
    console.log('wizardHasMoreThanOneStep', wizardHasMoreThanOneStep)
    console.log('currentStepIsFirstStep', currentStepIsFirstStep)
    console.log('currentStepIsLastStep', currentStepIsLastStep)
    console.groupEnd()

    this.setState({
      hasNextStep: wizardHasMoreThanOneStep && !currentStepIsLastStep,
      hasPreviousStep: wizardHasMoreThanOneStep && currentStepIsFirstStep,
      steps: newSteps,
    })
  }

  nextStep = () => {
    const { steps } = this
    const { currentStep } = this.props

    const currentStepIndex = steps.indexOf(currentStep)

    this.setStep(steps[currentStepIndex + 1])
  }

  previousStep = () => {
    const { steps } = this
    const { currentStep } = this.props

    const currentStepIndex = steps.indexOf(currentStep)

    this.setStep(steps[currentStepIndex - 1])
  }

  render () {
    const providerValue = {
      ...this.state,
      addStep: this.addStep,
      nextStep: this.nextStep,
      previousStep: this.previousStep,
      setStep: this.setStep,
    }

    return (
      <Provider value={providerValue}>
        {this._renderChildren()}
      </Provider>
    )
  }

  setStep = (stepID, newState = {}) => {
    const {
      onStepChange,
    } = this.props

    this.setState(state => ({
      currentStep: stepID,
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
}
