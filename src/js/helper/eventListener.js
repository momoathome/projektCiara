import {
  inputListenerUnit,
  clickEventListenerUnit,
  formSubmit,
} from '../pages/units/unitUpdate.js'
import {upgradeFunction} from '../pages/structures/structureUpdate.js'
import {
  inputListenerMarket,
  clickEventListenerMarket,
  marktFormSubmit,
} from '../pages/market/marktUpdate.js'

function addEventlistenerUnits() {
  const UnitForm = document.querySelector('.form__unit')

  clickListener(clickEventListenerUnit, '.clickableValue')
  inputListener(inputListenerUnit, '.inputField')
  UnitForm.addEventListener('submit', (event) => {
    formSubmit(event)
  })
}

function addEventlistenerStructure() {
  clickListener(upgradeFunction, '.btn__upgrade')
}

const addEventlistenerMarket = () => {
  const marktForm = document.querySelector('.form__market')

  clickListener(clickEventListenerMarket, '.clickableValue')
  inputListener(inputListenerMarket, '.inputField')

  marktForm.addEventListener('submit', (event) => {
    if (event.submitter.id === 'buyButton') {
      marktFormSubmit(event, 'buy')
    } else marktFormSubmit(event, 'sell')
  })
}

function clickListener(clickEvent, node) {
  const clicker = document.querySelectorAll(node)
  clicker.forEach((span, i) => {
    span.addEventListener('click', () => {
      clickEvent(i)
    })
  })
}

function inputListener(inputEvent, inputField) {
  const input = document.querySelectorAll(inputField)
  input.forEach((value, i) => {
    value.addEventListener('input', () => {
      inputEvent(value, i)
    })
  })
}

export {
  addEventlistenerUnits,
  addEventlistenerStructure,
  addEventlistenerMarket,
}
