import {creditCheck} from '../../helper/money.js'
import {combatCheck, unitLimitCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
const data = JSON.parse(localStorage.getItem('units'))
const credits = parseInt(localStorage.getItem('credits'))
const unitLimit = parseInt(localStorage.getItem('unitLimit'))
const reducer = (accumulator, currentValue) => accumulator + currentValue
const MAX__UNIT = []

function maxUnit() {
  // const inputFields = document.querySelectorAll('.recrutUnit')
  const playerUnits = getPlayerUnits()
  const inputUnits = inputUnitArray().reduce(reducer)
  const reducedCredits = credits - inputUnitCost()

  data.forEach((unit, i) => {
    if (inputUnits > 0) {
      MAX__UNIT[i] = parseInt(unitLimit - playerUnits - inputUnits)
      if (MAX__UNIT[i] > Math.floor(reducedCredits / unit.cost)) {
        MAX__UNIT[i] = Math.floor(reducedCredits / unit.cost)
      }
      return
    }
    MAX__UNIT[i] = Math.floor(credits / unit.cost)
    if (MAX__UNIT[i] >= unitLimit - playerUnits) {
      MAX__UNIT[i] = unitLimit - playerUnits
    }
  })
  showQuantity()
  displayMaxUnit()
  showCost(inputUnitCost())
}

function getPlayerUnits() {
  const currentTotalUnits = data.reduce((acc, unit) => acc + unit.quantity, 0)
  return currentTotalUnits
}

function inputUnitArray() {
  const inputFields = document.querySelectorAll('.recrutUnit')
  const inputArray = []
  inputFields.forEach((input) => {
    input = input.valueAsNumber
    if (isNaN(input)) {
      input = 0
    }
    inputArray.push(input)
  })
  return inputArray
}

function inputUnitCost() {
  const cost = inputUnitArray()
    .map((unit, i) => unit * data[i].cost)
    .reduce(reducer)
  return cost
}

function showQuantity() {
  data.forEach((unit, i) => {
    document.querySelector(`#unit_cargo_${i}`).innerHTML = unit.quantity
  })
}

function displayMaxUnit() {
  const clickableValue = document.querySelectorAll('.clickableValue')

  clickableValue.forEach((node, i) => {
    const unitString = MAX__UNIT[i]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    node.innerHTML = `(${unitString})`
  })
}

function showCost(costs) {
  // text update für Rekrutierungskosten Text
  const costString =
    costs.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C</span>'
  document.querySelector('.span__total-cost').innerHTML = costString
}

// listener für den Input
function inputFieldListener(inputField, i) {
  inputField.value = Math.round(inputField.valueAsNumber)
  if (
    inputField.value < 0 ||
    inputField.value == '' ||
    isNaN(inputField.value)
  ) {
    inputField.value = ''
  }
  maxUnit()

  if (MAX__UNIT[i] < 0) {
    inputField.value = inputField.valueAsNumber + MAX__UNIT[i]
  }
  maxUnit()
}

// klick auf max MAX__UNIT Units
function clickEventListener(i) {
  const inputFields = document.querySelectorAll('.recrutUnit')
  if (inputFields[i].value == 0) {
    inputFields[i].value = MAX__UNIT[i]
    MAX__UNIT[i] = 0
  } else if (MAX__UNIT[i] === 0) {
    inputFields[i].value = MAX__UNIT[i]
    MAX__UNIT[i] = inputFields[i].value
  } else {
    MAX__UNIT[i] = inputFields[i].valueAsNumber + parseInt(MAX__UNIT[i])
    inputFields[i].value = MAX__UNIT[i]
  }
  maxUnit()
}

function inputFieldClear() {
  const inputFields = document.querySelectorAll('.recrutUnit')
  inputFields.forEach((input) => {
    input.value = ''
  })
}

function formCheck() {
  const inputUnits = inputUnitArray().reduce(reducer)
  const unitCost = inputUnitCost()

  if (inputUnits <= 0) {
    errorMessage('bitte wähle mindestens eine Einheit aus')
    inputFieldClear()
    return false
  }
  if (unitCost > credits) {
    // wenn geld nicht reicht, fehlermeldung und function wird nicht ausgeführt
    errorMessage('du hast nicht genug Credits dafür')
    return false
  }
  return true
}

function formSubmit(event) {
  event.preventDefault()
  if (!formCheck()) return

  // SUCCESS
  const newCredits = credits - inputUnitCost()
  data.map((unit, i) => {
    unit.quantity += inputUnitArray()[i]
  })
  const combat = inputUnitArray()
    .map((unit, i) => unit * data[i].combat)
    .reduce(reducer)

  inputFieldClear()
  succesMessage('Great Success')
  localStorage.setItem('credits', newCredits)
  localStorage.setItem('combat', combat)
  localStorage.setItem('units', JSON.stringify(data))
  maxUnit()
  combatCheck()
  creditCheck()
  unitLimitCheck()
  document.querySelector('.span__total-cost').innerHTML = ''
}
export {maxUnit, inputFieldListener, clickEventListener, formSubmit}
