import {
  inputFieldListener,
  clickEventListener,
  formSubmit,
} from '../pages/units/unitUpdate.js'
import {upgradeFunction} from '../pages/structures/structureUpdate.js'
import {
  inputListenerValueUpdater,
  clickEventListenerValueUpdater,
  marktFormSubmit,
} from '../pages/market/marktUpdate.js'

function addEventlistenerUnits() {
  const inputFields = document.querySelectorAll('.recrutUnit')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')
  const UnitForm = document.querySelector('.form__unit')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      inputFieldListener(inputField, i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      clickEventListener(i)
    })
  })
  UnitForm.addEventListener('submit', (event) => {
    formSubmit(event)
  })
}

function addEventlistenerStructure() {
  const upgradeButton = document.querySelectorAll('.btn__upgrade')
  upgradeButton.forEach((button, i) => {
    button.addEventListener('click', () => {
      upgradeFunction(i)
    })
  })
}

const addEventlistenerMarket = () => {
  const inputFields = document.querySelectorAll('.tradeInputField')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')
  const marktForm = document.querySelector('.form__market')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      inputListenerValueUpdater(i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      clickEventListenerValueUpdater(i)
    })
  })
  marktForm.addEventListener('submit', (event) => {
    if (event.submitter.id === 'buyButton') {
      marktFormSubmit(event, 'buy')
    } else marktFormSubmit(event, 'sell')
  })
}

export {
  addEventlistenerUnits,
  addEventlistenerStructure,
  addEventlistenerMarket,
}
