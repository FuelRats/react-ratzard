import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  Step,
  Wizard,
} from '../../src'





const App = () => (
  <Wizard defaultStep="foo">
    {({
      hasNextStep,
      hasPreviousStep,
      nextStep,
      previousStep,
    }) => (
      <React.Fragment>
        <div>
          <Step id="foo">
            <span>Step 1: Foo</span>
          </Step>

          <Step id="bar">
            <span>Step 2: Bar</span>
          </Step>

          <Step id="baz">
            <span>Step 3: Baz</span>
          </Step>
        </div>

        {(hasPreviousStep) && (
          <button
            onClick={previousStep}
            type="button">
            Previous
          </button>
        )}

        {(hasNextStep) && (
          <button
            onClick={nextStep}
            type="button">
            Next
          </button>
        )}
      </React.Fragment>
    )}
  </Wizard>
)





render(<App />, document.getElementById('root'))
