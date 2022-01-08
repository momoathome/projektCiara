import dbData from '../helper/getData.js'
import config from '../config.js'
import {geldCheck} from '../helper/money.js'
import {rohstoffCheck} from '../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../helper/alertMessage.js'

const maxRoh = []
const totalValues = []
const currentStock = []
const varFaktor = []
const price = []

function getMarketData() {
  dbData.ressources.forEach((res, i) => {
    currentStock[i] = parseInt(localStorage.getItem(`stock_${i}`))
    varFaktor[i] = parseFloat(localStorage.getItem(`varFaktor_${i}`))
    price[i] = Math.round(config.basePrice[i] + (varFaktor[i] - config.varFaktor))
  })
}

function setMarketData(boolean) {
  let tradeValues = getInputValues()
  tradeValues.forEach((value, i) => {
    if (isNaN(value) || value == '' || value == undefined) {
      value = 0
    }
    currentStock[i] = boolean ? currentStock[i] - value : currentStock[i] + value
    value = value / 2000

    varFaktor[i] = boolean ? varFaktor[i] + value : varFaktor[i] - value
    localStorage.setItem(`stock_${i}`, currentStock[i])
    localStorage.setItem(`varFaktor_${i}`, varFaktor[i])
  })
  maxRessource()
}

function maxRessource() {
  dbData.ressources.forEach((res, i) => {
    maxRoh[i] = localStorage.getItem(`roh_${i}`)
    let maxValueSpan = document.querySelector(`#maxValue_${i}`)
    maxValueSpan.innerText = `(${maxRoh[i]})`
  })
  getMarketData()
  updateStock()
  updateValue()
}

function updateStock() {
  const stockTd = document.querySelectorAll('.stockTd')
  stockTd.forEach((element, i) => {
    let stock = currentStock[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    element.innerText = stock + 't'
  })
}

function updateValue() {
  const valueTd = document.querySelectorAll('.valueTd')
  valueTd.forEach((element, i) => {
    let value = price[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    element.innerHTML = `${value}<span class="font">C</span>`
  })
}

function InputListenerValueUpdater(i) {
  let geld = parseInt(localStorage.getItem('credits'))
  let cap = Math.round(geld / price[i])
  if (cap < maxRoh[i]) {
    cap = parseInt(maxRoh[i])
  }
  let inputField = document.querySelector(`#input_value_${i}`)
  let maxValueSpan = document.querySelector(`#maxValue_${i}`)

  inputField.value = Math.round(parseInt(inputField.value))
  if (inputField.value <= 0 || inputField.value == '' || isNaN(inputField.value)) {
    inputField.value = ''
  } else if (parseInt(inputField.value) > cap) {
    inputField.value = cap
  }

  let roh = maxRoh[i] - inputField.value
  if (roh <= 0) {
    maxValueSpan.innerText = `(${maxRoh[i]})`
  } else maxValueSpan.innerText = `(${roh})`

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
  let totalValue = getTotalValue(i)

  document.querySelector('#marktKosten').innerHTML =
    totalValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '<span class="font">C</span>'
}

const reducer = (accumulator, currentValue) => accumulator + currentValue
function getTotalValue(i) {
  let inputField = document.querySelector(`#input_value_${i}`)
  totalValues[i] = Math.round(inputField.value * price[i])
  let totalValue = totalValues.reduce(reducer)
  return totalValue
}

function getInputValues() {
  const tradeValues = []
  dbData.ressources.forEach((res, i) => {
    let inputField = document.querySelector(`#input_value_${i}`)
    tradeValues[i] = parseInt(inputField.value)
  })
  return tradeValues
}

function creditCheck() {
  // holt sich anzahl an credits
  let geld = parseInt(localStorage.getItem('credits'))
  // berechnet totalValue der Rohstoffe
  let totalValue = totalValues.reduce(reducer)
  if (totalValue > geld) {
    errorMessage('Du hast nicht genug Credits dafür')
    return false
  } else {
    return true
  }
}

function setCredits(boolean) {
  let geld = parseInt(localStorage.getItem('credits'))
  let totalValue = totalValues.reduce(reducer)

  if (boolean) {
    geld = geld - totalValue
  } else {
    geld = geld + totalValue
  }
  localStorage.setItem('credits', geld)
}

function setRessource(boolean) {
  if (boolean) {
    ressourceMath(true)
  } else {
    ressourceMath(false)
  }
}
function ressourceMath(type) {
  let newVal
  let tradeValues = getInputValues()
  tradeValues.forEach((value, i) => {
    let currentRoh = parseInt(localStorage.getItem(`roh_${i}`))
    if (isNaN(value) || value == '' || value == undefined) {
      value = 0
    }
    if (type) {
      newVal = currentRoh + value
    } else newVal = currentRoh - value
    localStorage.setItem(`roh_${i}`, newVal)
  })
}
function clearInputFields() {
  let inputFields = document.querySelectorAll(`.tradeInputField`)
  let totalSpan = document.querySelector(`#marktKosten`)

  inputFields.forEach(inputField => {
    inputField.value = ''
  })
  totalSpan.innerText = ''
}

function sellRohstoffCheck() {
  let sell = true
  let tradeValues = getInputValues()
  for (let i = 0; i < tradeValues.length; i++) {
    let element = tradeValues[i]
    if (isNaN(element)) {
      element = 0
    }
    if (element > maxRoh[i]) {
      sell = false
      break
    }
  }
  return sell
}

function formSubmit(event, eventName) {
  event.preventDefault()
  if (eventName === 'buy') {
    if (!creditCheck()) {
      return
    } else {
      endForm(true)
    }
  } else {
    let sell = sellRohstoffCheck()
    if (sell) {
      endForm(false)
    } else return errorMessage('du hast nicht genug Rohstoffe')
  }
}

function endForm(type) {
  setRessource(type)
  setMarketData(type)
  setCredits(type)
  clearInputFields()
  rohstoffCheck()
  geldCheck()
  succesMessage('Great Success')
}

export {InputListenerValueUpdater, clickEventListenerValueUpdater, maxRessource, formSubmit}