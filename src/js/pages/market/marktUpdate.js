import config from '../../config.js'
import {creditCheck} from '../../helper/money.js'
import {rohstoffCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'

const data = JSON.parse(localStorage.getItem('ressources'))
const credits = parseInt(localStorage.getItem('credits'))
const reducer = (accumulator, currentValue) => accumulator + currentValue

function displayMarketValues() {
  const stockTd = document.querySelectorAll('.stockTd')
  const valueTd = document.querySelectorAll('.valueTd')
  const clickableValue = document.querySelectorAll('.clickableValue')
  const arr = [stockTd, valueTd, clickableValue]
  const keys = Object.keys(...data)

  arr.forEach((val, i) => displayValues(val, i))

  function displayValues(node, i) {
    node.forEach((element, index) => {
      const string = data[index][keys[i + 1]]
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      if (keys[i + 1] === 'stock') {
        element.innerHTML = `${string}t`
      } else if (keys[i + 1] === 'price') {
        element.innerHTML = `${string}<span class="font">C</span>`
      } else element.innerHTML = `(${string})`
    })
  }
}

function inputListenerValueUpdater(i) {
  const inputField = document.querySelector(`#input_value_${i}`)
  const maxValueSpan = document.querySelector(`.maxValue_${i}`)
  inputField.value = Math.round(inputField.valueAsNumber)

  let cap = Math.round(credits / data[i].price)
  if (cap < data[i].quantity) {
    cap = data[i].quantity
  }

  if (
    inputField.value <= 0 ||
    inputField.value == '' ||
    isNaN(inputField.value)
  ) {
    inputField.value = ''
  } else if (inputField.valueAsNumber > cap) {
    inputField.value = cap
  }

  const roh = data[i].quantity - inputField.value
  if (roh <= 0) {
    maxValueSpan.innerText = `(${data[i].quantity})`
  } else maxValueSpan.innerText = `(${roh})`

  totalAmountUpdate()
}

// klick auf max anzahl Units
function clickEventListenerValueUpdater(i) {
  const inputField = document.querySelector(`#input_value_${i}`)
  const maxValueSpan = document.querySelector(`.maxValue_${i}`)

  if (maxValueSpan.innerText == '(0)') {
    inputField.value = ''
    maxValueSpan.innerText = `(${data[i].quantity})`
  } else {
    inputField.value = data[i].quantity
    maxValueSpan.innerText = '(0)'
  }
  totalAmountUpdate()
}

function totalAmountUpdate() {
  const totalValue = inputValueCost()
  document.querySelector('.span__total-cost').innerHTML =
    totalValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C</span>'
}

function getInputValues() {
  const inputFields = document.querySelectorAll(`.tradeInputField`)
  const totalValues = []
  inputFields.forEach((input) => {
    input = input.valueAsNumber
    if (isNaN(input)) {
      input = 0
    }
    totalValues.push(input)
  })
  return totalValues
}

function inputValueCost() {
  const cost = getInputValues()
    .map((res, i) => res * data[i].price)
    .reduce(reducer)
  return cost
}

function marktFormSubmit(event, eventName) {
  event.preventDefault()
  if (!submitCheck(eventName)) {
    return
  }
  buyOrSell(eventName)
}

function submitCheck(event) {
  const totalValue = getInputValues().reduce(reducer)
  if (totalValue <= 0) {
    errorMessage('bitte wähle mindestens einen Rohstoff aus')
    return false
  }
  if (inputValueCost() > credits && event === 'buy') {
    errorMessage('Du hast nicht genug Credits dafür')
    return false
  }
  if (!sellRohstoffCheck() && event === 'sell') {
    errorMessage('Du hast nicht genug Rohstoffe dafür')
    return false
  }
  return true
}

function sellRohstoffCheck() {
  let sell = true
  const tradeValues = getInputValues()
  for (let i = 0; i < tradeValues.length; i++) {
    if (tradeValues[i] > data[i].quantity) {
      sell = false
      break
    }
  }
  return sell
}

function buyOrSell(eventName) {
  if (eventName === 'buy') {
    endForm(true)
  } else {
    endForm(false)
  }
}

function endForm(type) {
  setMarketData(type)
  setCredits(type)
  clearInputFields()
  rohstoffCheck()
  creditCheck()
  displayMarketValues()
  succesMessage('Great Success')
}

function setMarketData(boolean) {
  const tradeValues = getInputValues()
  data.map((res, i) => {
    res.stock = boolean
      ? res.stock - tradeValues[i]
      : res.stock + tradeValues[i]
    res.quantity = boolean
      ? res.quantity + tradeValues[i]
      : res.quantity - tradeValues[i]
    tradeValues[i] /= 2000
    res.faktor = boolean
      ? res.faktor + tradeValues[i]
      : res.faktor - tradeValues[i]
    res.price = Math.round(
      config.basePrice[i] + (res.faktor - config.baseFaktor)
    )
  })
  localStorage.setItem('ressources', JSON.stringify(data))
}

function setCredits(boolean) {
  const totalValue = inputValueCost()
  const newCredits = boolean ? credits - totalValue : credits + totalValue
  localStorage.setItem('credits', newCredits)
}

function clearInputFields() {
  const inputFields = document.querySelectorAll(`.tradeInputField`)
  const totalSpan = document.querySelector(`.span__total-cost`)

  inputFields.forEach((inputField) => {
    inputField.value = ''
  })
  totalSpan.innerText = ''
}

export {
  inputListenerValueUpdater,
  clickEventListenerValueUpdater,
  marktFormSubmit,
  displayMarketValues,
}
