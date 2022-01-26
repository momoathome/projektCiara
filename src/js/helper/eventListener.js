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
import {formSubmitFleet} from '../pages/farm/farmUpdate.js'
import {asteroidSelectionUpdater} from '../pages/farm/asteroidUpdate.js'
import {
  InputListenerFleet,
  clickEventListenerFleet,
} from '../pages/farm/fleetUpdate.js'

function addEventlistenerUnits() {
  const form = document.querySelector('.form__unit')

  clickListener(clickEventListenerUnit, '.clickableValue')
  inputListener(inputListenerUnit, '.inputField')
  form.addEventListener('submit', (event) => {
    formSubmit(event)
  })
}

function addEventlistenerStructure() {
  clickListener(upgradeFunction, '.td__btn-holder')
}

function addEventlistenerMarket() {
  const marktForm = document.querySelector('.form__market')

  clickListener(clickEventListenerMarket, '.clickableValue')
  inputListener(inputListenerMarket, '.inputField')

  marktForm.addEventListener('submit', (event) => {
    if (event.submitter.id === 'buyButton') {
      marktFormSubmit(event, 'buy')
    } else marktFormSubmit(event, 'sell')
  })
}

function addEventListenerFleet() {
  const form = document.querySelector('.form__farm')

  clickListener(clickEventListenerFleet, '.clickableValue')
  inputListener(InputListenerFleet, '.inputField')
  form.addEventListener('submit', (event) => {
    formSubmitFleet(event)
  })
}

function addEventListenerAsteroid() {
  const asteroidListBody = document.querySelectorAll('.table__body--asteroid')
  const asteroidDomList = asteroidListBody[0].childNodes

  asteroidDomList.forEach((asteroid, index) => {
    asteroid.addEventListener('click', () => {
      asteroidSelectionUpdater(asteroid, index, asteroidDomList)
    })
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
  addEventListenerFleet,
  addEventListenerAsteroid,
}
