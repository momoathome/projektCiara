import {creditCheck} from '../../helper/money.js'
import {unitLimitCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import config from '../../config.js'
import {valToString} from '../../helper/updateHelper.js'
const data = JSON.parse(localStorage.getItem('structures'))

function upgradeFunction(i) {
  // nicht genug Geld
  if (!credCheck(i)) {
    return errorMessage('Du hast nicht genug Credits dafür')
  }
  // Succesful Upgrade
  creditUpdate(i)
  if (i === 0) {
    localStorage.setItem('unitLimit', config.unitLimit[data[i].level])
    unitLimitCheck()
  }
  setNewCost(i)
  structureUpdate()
  succesMessage('succesful upgrade!')
}

function credCheck(index) {
  // holt sich anzahl an credits
  const credits = parseInt(localStorage.getItem('credits'))
  // checkt ob Geld reicht
  if (data[index].cost.credits > credits) {
    return false
  }
  return true
}

function setNewCost(i) {
  data[i].cost.credits = Math.ceil((data[i].cost.credits * 1.67) / 1000) * 1000
  data[i].level = data[i].level + 1
  localStorage.setItem('structures', JSON.stringify(data))
}

function creditUpdate(index) {
  let credits = parseInt(localStorage.getItem('credits'))
  credits -= data[index].cost.credits
  localStorage.setItem('credits', credits)

  creditCheck()
}

const structureUpdate = () => {
  const costNodes = document.querySelectorAll('.structure__cost')
  const levelNodes = document.querySelectorAll('.structure__level')

  data.forEach((modul, i) => {
    // prettier-ignore
    costNodes[i].innerHTML = `${valToString(modul.cost.credits)}<span class="font">C</span>`
    levelNodes[i].innerHTML = valToString(modul.level)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const clrdBtn = () => {
    const buttons = document.querySelectorAll('.td__btn-holder')
    buttons.forEach((button, i) => {
      if (credCheck(i)) {
        button.classList.add('td__btn-holder--active')
        // dann button border color = blue
      }
    })
  }
  clrdBtn()
})

export {upgradeFunction, structureUpdate}
