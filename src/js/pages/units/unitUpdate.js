import {creditCheck} from '../../helper/money.js'
import {combatCheck, unitLimitCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import * as helper from '../../helper/updateHelper.js'
const data = JSON.parse(localStorage.getItem('units'))
const unitLimit = parseInt(localStorage.getItem('unitLimit'))
const reducer = (accumulator, currentValue) => accumulator + currentValue
const MAX__UNIT = []

function maxUnit() {
  const credits = parseInt(localStorage.getItem('credits'))
  const playerUnits = getPlayerUnits()
  const inputUnits = helper.getInputValues().reduce(reducer)
  const reducedCredits = credits - helper.inputValueCost(data)

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
  displayValues()
  helper.totalValueUpdate(data)
}

function getPlayerUnits() {
  const currentTotalUnits = data.reduce((acc, unit) => acc + unit.quantity, 0)
  return currentTotalUnits
}

function displayValues() {
  const clickableValue = document.querySelectorAll('.clickableValue')

  clickableValue.forEach((node, i) => {
    const string = MAX__UNIT[i]
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    node.innerText = `(${string})`
  })

  function showQuantity() {
    data.forEach((unit, i) => {
      document.querySelector(`#unit_cargo_${i}`).innerText = unit.quantity
    })
  }
  showQuantity()
}

// listener für den Input
function inputListenerUnit(inputField, i) {
  helper.inputValueNormNumber(inputField)
  maxUnit()

  if (MAX__UNIT[i] < 0) {
    inputField.value = inputField.valueAsNumber + MAX__UNIT[i]
  }
  maxUnit()
}

// klick auf max MAX__UNIT Units
function clickEventListenerUnit(i) {
  const inputField = document.querySelector(`#unit_${i}`)

  if (inputField.value == 0) {
    inputField.value = MAX__UNIT[i]
    MAX__UNIT[i] = 0
  } else if (MAX__UNIT[i] === 0) {
    inputField.value = MAX__UNIT[i]
    MAX__UNIT[i] = inputField.value
  } else {
    MAX__UNIT[i] = inputField.valueAsNumber + parseInt(MAX__UNIT[i])
    inputField.value = MAX__UNIT[i]
  }
  maxUnit()
}

function formCheck() {
  const inputUnits = helper.getInputValues().reduce(reducer)
  const unitCost = helper.inputValueCost(data)
  const credits = parseInt(localStorage.getItem('credits'))

  if (inputUnits <= 0) {
    errorMessage('bitte wähle mindestens eine Einheit aus')
    helper.inputFieldClear()
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
  const credits = parseInt(localStorage.getItem('credits'))
  const currentCombat = parseInt(localStorage.getItem('combat'))
  const newCredits = credits - helper.inputValueCost(data)
  data.map((unit, i) => {
    unit.quantity += helper.getInputValues()[i]
  })
  const combat =
    currentCombat +
    helper
      .getInputValues()
      .map((unit, i) => unit * data[i].combat)
      .reduce(reducer)

  localStorage.setItem('credits', newCredits)
  localStorage.setItem('combat', combat)
  localStorage.setItem('units', JSON.stringify(data))
  succesMessage('Great Success')
  helper.inputFieldClear()
  maxUnit()
  combatCheck()
  creditCheck()
  unitLimitCheck()
}
export {maxUnit, inputListenerUnit, clickEventListenerUnit, formSubmit}
