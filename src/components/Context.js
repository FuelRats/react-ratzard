import React from 'react'





export const {
  Consumer,
  Provider,
} = React.createContext({
  currentStep: 0,
  wizardState: {},
  goToStep: () => {},
})
