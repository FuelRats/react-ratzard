import React from 'react'
import { render } from 'react-dom'
import {
  Step,
  Wizard,
} from '../../src'





const App = () => (
  <Wizard defaultStep="foo">
    <Step id="foo">
      <span>Foo</span>
    </Step>

    <Step id="bar">
      <span>Bar</span>
    </Step>
  </Wizard>
)





render(<App />, document.getElementById('root'))
