import config from '../../config.js'
import {creditCheck} from '../../helper/money.js'
import {rohstoffCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import * as helper from '../../helper/updateHelper.js'
const data = JSON.parse(localStorage.getItem('ressources'))
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
      } else if (keys[i + 1] === 'cost') {
        element.innerHTML = `${string}<span class="font">C</span>`
      } else element.innerHTML = `(${string})`
    })
  }
  helper.totalValueUpdate(data)
}

function inputListenerMarket(inputField, i) {
  const credits = parseInt(localStorage.getItem('credits'))
  const maxValueSpan = document.querySelector(`.maxValue_${i}`)
  helper.inputValueNormNumber(inputField)

  let cap = Math.round(credits / data[i].cost)
  if (cap < data[i].quantity) {
    cap = data[i].quantity
  }

  if (inputField.valueAsNumber > cap) {
    inputField.value = cap
  }

  const roh = data[i].quantity - inputField.value
  if (roh <= 0) {
    maxValueSpan.innerText = `(${data[i].quantity})`
  } else maxValueSpan.innerText = `(${roh})`

  helper.totalValueUpdate(data)
}

// klick auf max anzahl Units
function clickEventListenerMarket(i) {
  const inputField = document.querySelector(`#input_value_${i}`)
  const maxValueSpan = document.querySelector(`.maxValue_${i}`)

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
  helper.totalValueUpdate(data)
}

function marktFormSubmit(event, eventName) {
  event.preventDefault()
  if (!submitCheck(eventName)) {
    return
  }
  buyOrSell(eventName)
}

function submitCheck(event) {
  const credits = parseInt(localStorage.getItem('credits'))
  const totalValue = helper.getInputValues().reduce(reducer)
  if (totalValue <= 0) {
    errorMessage('bitte wähle mindestens einen Rohstoff aus')
    return false
  }
  if (helper.inputValueCost(data) > credits && event === 'buy') {
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
  const tradeValues = helper.getInputValues()
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
  const tradeValues = helper.getInputValues()
  data.map((res, i) => {
    res.stock = boolean
      ? res.stock - tradeValues[i]
      : res.stock + tradeValues[i]
    res.quantity = boolean
      ? res.quantity + tradeValues[i]
      : res.quantity - tradeValues[i]
    tradeValues[i] /= 5000
    res.faktor = boolean
      ? res.faktor + tradeValues[i]
      : res.faktor - tradeValues[i]
    res.cost = Math.round(
      config.basePrice[i] + (res.faktor - config.baseFaktor)
    )
  })
  localStorage.setItem('ressources', JSON.stringify(data))
}

function setCredits(boolean) {
  const credits = parseInt(localStorage.getItem('credits'))
  const totalValue = helper.inputValueCost(data)
  const newCredits = boolean ? credits - totalValue : credits + totalValue
  localStorage.setItem('credits', newCredits)
}

function clearInputFields() {
  const inputFields = document.querySelectorAll(`.inputField`)
  const totalSpan = document.querySelector(`.span__total-value`)

  inputFields.forEach((inputField) => {
    inputField.value = ''
  })
  totalSpan.innerText = ''
}

export {
  inputListenerMarket,
  clickEventListenerMarket,
  marktFormSubmit,
  displayMarketValues,
}
