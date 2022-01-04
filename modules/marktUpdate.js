import dbData from './getData.js'
import config from '../config.js'

const maxRoh = []
const totalValues = []
const values = {
  titanValue: (config.stock * config.titanFaktor) / config.varFaktor,
  carbonValue: (config.stock * config.carbonFaktor) / config.varFaktor,
  kristalValue: (config.stock * config.kristalFaktor) / config.varFaktor,
  hydroValue: (config.stock * config.hydrogeniumFaktor) / config.varFaktor,
}

function maxRessource() {
  dbData.ressources.forEach((res, i) => {
    maxRoh[i] = localStorage.getItem(`roh_${i}`)
    let maxValueSpan = document.querySelector(`#maxValue_${i}`)
    maxValueSpan.innerText = `(${maxRoh[i]})`
  })
  updateStock()
  updateValue()
}

function updateStock() {
  const stockTd = document.querySelectorAll('.stockTd')
  let stock = config.stock.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  stockTd.forEach(element => {
    element.innerText = stock + 't'
  })
}

function updateValue() {
  const valueTd = document.querySelectorAll('.valueTd')
  Object.entries(values).forEach(([key, value], index) => {
    value = value
      .toFixed(2)
      .toString()
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    valueTd[index].innerHTML = `${value}<span class="font">C</span>`
  })
}

function InputListenerValueUpdater(i) {
  let geld = parseInt(localStorage.getItem('credits'))
  let inputField = document.querySelector(`#input_value_${i}`)
  let maxValueSpan = document.querySelector(`#maxValue_${i}`)
  const tradeInfoText = document.querySelectorAll('.tradeInfoWarn')
  const value = Object.values(values)

  if (inputField.value <= 0 || inputField.value == '' || isNaN(inputField.value)) {
    inputField.value = ''
  } else if (inputField.value * value[i] > geld) {
    inputField.value = Math.floor(geld / value[i])
  }

  let roh = maxRoh[i] - inputField.value
  if (roh <= 0) {
    maxValueSpan.innerText = `(${maxRoh[i]})`
  } else maxValueSpan.innerText = `(${roh})`

  if (inputField.value == 0) {
    hideText(tradeInfoText[i])
  } else if (inputField.value < 100) {
    showText(tradeInfoText[i])
  } else hideText(tradeInfoText[i])

  totalAmountUpdate(i)
}

// klick auf max anzahl Units
function clickEventListenerValueUpdater(i) {
  let inputField = document.querySelector(`#input_value_${i}`)
  let maxValueSpan = document.querySelector(`#maxValue_${i}`)

  if (maxValueSpan.innerText == '(0)') {
    inputField.value = ''
    maxValueSpan.innerText = `(${maxRoh[i]})`
  } else {
    inputField.value = maxRoh[i]
    maxValueSpan.innerText = '(0)'
  }
  totalAmountUpdate(i)
}

function totalAmountUpdate(i) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  const inputField = document.querySelector(`#input_value_${i}`)

  let value = Object.values(values)
  totalValues[i] = Math.ceil(inputField.value * value[i])

  let totalValue = totalValues.reduce(reducer)
  document.querySelector('#marktKosten').innerHTML =
    totalValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '<span class="font">C</span>'
}

function showText(element) {
  if (element.style.visibility === 'visible') {
    return
  } else {
    element.style.visibility = 'visible'
    element.style.opacity = 1
  }
}

function hideText(element) {
  if (element.style.visibility === 'hidden') {
    return
  } else {
    element.style.visibility = 'hidden'
    element.style.opacity = 0
  }
}

function marktFormSubmit(event) {
  event.preventDefault()
}

export {InputListenerValueUpdater, clickEventListenerValueUpdater, maxRessource}
