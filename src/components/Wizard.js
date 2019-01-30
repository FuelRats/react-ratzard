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
    currentStep: this.props.defaultStep || null,
    hasNextStep: false,
    hasPreviousStep: false,
    steps: {},
    stepIDs: [],
    wizardState: {},
  }
  /* eslint-enable react/no-unused-state */





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _getStepOrder (state = this.state) {
    const {
      stepIDs,
      steps,
    } = state

    const stepOrder = [...stepIDs]

    stepOrder.sort((stepAID, stepBID) => {
      const stepA = steps[stepAID]
      const stepB = steps[stepBID]

      if (stepA.props.nextStep === stepB.props.id) {
        return 1
      }

      return -1
    })

    return stepOrder
  }

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

  addStep = (stepID, step) => {
    if (this.state.stepIDs[stepID]) {
      throw new Error(`Attempting to add duplicate step ID: ${stepID}`)
    }

    this.setState(state => {
      const {
        currentStep,
        stepIDs,
        steps,
      } = state

      const newState = {
        ...state,
        stepIDs: [...stepIDs, stepID],
        steps: {
          ...steps,
          [stepID]: step,
        }
      }

      const stepOrder = this._getStepOrder(newState)
      const wizardHasMoreThanOneStep = newState.stepIDs.length > 1

      const currentStepIsFirstStep = currentStep === stepOrder[0]
      const currentStepIsLastStep = currentStep === stepOrder[stepOrder.length - 1]

      newState.hasNextStep = wizardHasMoreThanOneStep && !currentStepIsLastStep
      newState.hasPreviousStep = wizardHasMoreThanOneStep && !currentStepIsFirstStep

      return newState
    })
  }

  goToNextStep = () => {
    const {
      currentStep: currentStepID,
      steps,
    } = this.state

    const currentStep = steps[currentStepID]

    if (currentStep.props.nextStep) {
      this.goToStep(currentStep.props.nextStep)
    } else {
      const stepOrder = this._getStepOrder()
      const currentStepIndex = stepOrder.indexOf(currentStep)

      this.goToStep(stepOrder[currentStepIndex + 1])
    }
  }

  goToPreviousStep = () => {
    const { currentStep } = this.state

    const stepOrder = this._getStepOrder()
    const currentStepIndex = stepOrder.indexOf(currentStep)

    this.goToStep(stepOrder[currentStepIndex - 1])
  }

  goToStep = (stepID, newState = {}) => {
    const {
      onStepChange,
    } = this.props
    const {
      stepIDs,
    } = this.state

    const stepOrder = this._getStepOrder()
    const wizardHasMoreThanOneStep = stepOrder.length > 1

    const currentStepIsFirstStep = stepID === stepOrder[0]
    const currentStepIsLastStep = stepID === stepOrder[stepOrder.length - 1]

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

  render () {
    return (
      <Provider value={this.passthroughState}>
        {this._renderChildren()}
      </Provider>
    )
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
