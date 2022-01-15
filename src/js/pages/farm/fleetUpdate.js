import * as helper from '../../helper/updateHelper.js'
const reducer = (accumulator, currentValue) => accumulator + currentValue
const data = JSON.parse(localStorage.getItem('units'))

function maxUnit(data) {
  data.forEach((unit, i) => {
    updater(i)
  })

  maxCargo()
}

function updater(i) {
  const string = data[i].quantity
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector(`.maxUnitfarm_${i}`).innerText = `(${string})`
}

function maxCargo() {
  const totalMaxUnitCargoSpan = document.querySelector(
    '.span__total-cargo--max'
  )
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

function cargoUpdater(i) {
  // capacity der Schiffe
  const inputField = helper.getInputValues()
  let cargo = inputField[i] * data[i].cargo
  if (isNaN(cargo)) {
    cargo = 0
  }

  document.querySelector(`.unitCargo_${i}`).innerText = cargo
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  function totalCargoUpdater() {
    const totalUnitCargoSpan = document.querySelector('.span__total-cargo')
    const current = inputField.map((value, i) => value * data[i].cargo)
    console.log(current)
    const string = current
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
  console.log(inputField)
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

export {InputListenerFleet, clickEventListenerFleet, maxUnit}
