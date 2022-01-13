import {creditCheck} from '../../helper/money.js'
import {combatCheck, unitLimitCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
const data = JSON.parse(localStorage.getItem('units'))
const credits = parseInt(localStorage.getItem('credits'))
const unitLimit = parseInt(localStorage.getItem('unitLimit'))
const reducer = (accumulator, currentValue) => accumulator + currentValue
const MAX__UNIT = []
// checks how many Units can be max build and shows them in the table

const getPlayerUnits = () => {
  const currentTotalUnits = data.reduce((acc, unit) => acc + unit.quantity, 0)
  return currentTotalUnits
}

function showMaxUnit() {
  const clickableValue = document.querySelectorAll('.clickableValue')

  clickableValue.forEach((node, i) => {
    const unitString = MAX__UNIT[i]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    node.innerHTML = `(${unitString})`
  })
}
function showQuantity() {
  data.forEach((unit, i) => {
    document.querySelector(`#unit_cargo_${i}`).innerHTML = unit.quantity
  })
}
function inputUnitCost() {
  const cost = inputUnitArray()
    .map((unit, i) => unit * data[i].cost)
    .reduce(reducer)
  return cost
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

function showCost(kosten) {
  // text update für Rekrutierungskosten Text
  const kostenText =
    kosten.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C</span>'
  document.querySelector('.span__total-cost').innerHTML = kostenText
}

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
  showMaxUnit()
  showCost(inputUnitCost())
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
/* if (inputField.value > parseInt(MAX__UNIT[i] + inputField.value)) {
    console.log(`${MAX__UNIT} inputField: ${inputField.value}`)
    inputField.value = MAX__UNIT[i] + inputField.value
  } */
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

function formSubmit(event) {
  event.preventDefault()
  const inputUnits = inputUnitArray().reduce(reducer)
  // wenn keine Einheit ausgewählt ist
  if (inputUnits <= 0) {
    errorMessage('bitte wähle mindestens eine Einheit aus')
    inputFieldClear()
    return
  }
  // errechnet gesamt Kosten für Units
  const unitCost = inputUnitCost()
  if (unitCost > credits) {
    // wenn geld nicht reicht, fehlermeldung und function wird nicht ausgeführt
    errorMessage('du hast nicht genug Credits dafür')
    return
  }
  // SUCCESS
  const newCredits = credits - unitCost
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
  unitLimitCheck()
  combatCheck()
  creditCheck()
  unitLimitCheck()
  document.querySelector('.span__total-cost').innerHTML = ''
}
export {maxUnit, inputFieldListener, clickEventListener, formSubmit}
