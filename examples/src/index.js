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
            <span>Foo</span>
          </Step>

          <Step id="bar">
            <span>Bar</span>
          </Step>
        </div>

        {(hasPreviousStep) && (
          <button onClick={previousStep}>
            Previous
          </button>
        )}

        {(hasNextStep) && (
          <button onClick={nextStep}>
            Next
          </button>
        )}
      </React.Fragment>
    )}
  </Wizard>
)





render(<App />, document.getElementById('root'))
