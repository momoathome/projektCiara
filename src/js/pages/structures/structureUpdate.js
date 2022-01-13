import {creditCheck} from '../../helper/money.js'
import {unitLimitCheck} from '../../helper/checkFunction.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import config from '../../config.js'
const data = JSON.parse(localStorage.getItem('structures'))

function upgradeFunction(i) {
  // nicht genug Geld
  if (!credCheck(i)) {
    return
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

function setNewCost(i) {
  data[i].cost.credits = Math.ceil((data[i].cost.credits * 1.67) / 1000) * 1000
  data[i].level = data[i].level + 1
  localStorage.setItem('structures', JSON.stringify(data))
}

function credCheck(index) {
  // holt sich anzahl an credits
  const credits = parseInt(localStorage.getItem('credits'))
  // checkt ob Geld reicht
  if (data[index].cost.credits > credits) {
    errorMessage('Du hast nicht genug Credits dafür')
    return false
  }
  return true
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
    const cost = modul.cost.credits
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    costNodes[i].innerHTML = `${cost}<span class="font">C</span>`
    const level = modul.level
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    levelNodes[i].innerHTML = level
  })
}

export {upgradeFunction, structureUpdate}
