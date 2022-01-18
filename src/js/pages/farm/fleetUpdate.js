import * as helper from '../../helper/updateHelper.js'
const reducer = (accumulator, currentValue) => accumulator + currentValue
const data = JSON.parse(localStorage.getItem('units'))

function maxUnit(data) {
  data.forEach((unit, i) => {
    const string = unit.quantity
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    document.querySelector(`.maxUnitfarm_${i}`).innerText = `(${string})`
  })
  maxCargo()
}

function maxCargo() {
  //prettier-ignore
  const totalMaxUnitCargoSpan = document.querySelector('.span__total-cargo--max')

  const maxCargo = []
  data.forEach((unit) => {
    const singleMaxCargo = unit.quantity * unit.cargo
    maxCargo.push(singleMaxCargo)
  })

  const string = maxCargo
    .reduce(reducer)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  totalMaxUnitCargoSpan.innerText = string
}

function singleCargo(i) {
  const inputField = helper.getInputValues()
  const cargo = inputField[i] * data[i].cargo
  if (isNaN(cargo)) {
    return 0
  }
  return cargo
}

function totalCargo() {
  const inputField = helper.getInputValues()
  const total = inputField.map((value, i) => value * data[i].cargo)
  return total
}

function cargoUpdater(i) {
  document.querySelector(`.unitCargo_${i}`).innerText = singleCargo(i)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  function totalCargoUpdater() {
    const totalUnitCargoSpan = document.querySelector('.span__total-cargo')
    const string = totalCargo()
      .reduce(reducer)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    totalUnitCargoSpan.innerText = string
  }

  totalCargoUpdater()
}

// needs to be outside to store the value till reload
function InputListenerFleet(inputField, i) {
  const maxValueSpan = document.querySelector(`.maxUnitfarm_${i}`)
  helper.inputValueNormNumber(inputField)
  if (inputField.valueAsNumber > data[i].quantity) {
    inputField.value = data[i].quantity
  }
  const unit = data[i].quantity - inputField.value
  maxValueSpan.innerText = `(${unit})`

  cargoUpdater(i)
}

function clickEventListenerFleet(i) {
  const inputField = document.querySelector(`#unit_${i}`)
  const maxValueSpan = document.querySelector(`.maxUnitfarm_${i}`)

  if (maxValueSpan.innerText == '(0)') {
    inputField.value = ''
    const string = data[i].quantity
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    maxValueSpan.innerText = `(${string})`
  } else {
    inputField.value = data[i].quantity
    maxValueSpan.innerText = '(0)'
  }

  cargoUpdater(i)
}

export {InputListenerFleet, clickEventListenerFleet, maxUnit, totalCargo}
