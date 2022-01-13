import dbData from '../helper/getData.js'
import {geldCheck} from '../helper/money.js'
import {errorMessage, succesMessage} from '../helper/alertMessage.js'
import {unitLimitCheck} from '../helper/checkFunction.js'
const kosten = []
const stufe = []
const maxKappa = []

dbData.maxKappa.forEach((cap) => {
  maxKappa.push(cap)
})

function upgradeFunction(i) {
  const stufeUpgraded = parseInt(localStorage.getItem(`stufe_${i}`)) + 1
  // nicht genug Geld
  if (!creditCheck(i)) {
    return
  } else {
    // Succesful Upgrade
    updater()
    creditUpdate(i)
    if (i !== 0) {
      setNewCost(i)
      writeValueToTable()
    } else {
      setNewCost(i)
      localStorage.setItem('maxUnitLimit', maxKappa[stufeUpgraded - 1])
      writeValueToTable()
      unitLimitCheck()
    }
    succesMessage('succesful upgrade!')
  }

  function setNewCost(i) {
    const newKost = Math.ceil((kosten[i] * 1.67) / 1000) * 1000
    localStorage.setItem(`stufe_${i}`, stufeUpgraded)
    localStorage.setItem(`kosten_${i}`, newKost)
  }
}

function creditCheck(kostenIndex) {
  // holt sich anzahl an credits
  const geld = parseInt(localStorage.getItem('credits'))
  // checkt ob Geld reicht
  if (kosten[kostenIndex] > geld) {
    errorMessage('Du hast nicht genug Credits dafür')
    return false
  } else {
    return true
  }
}

function creditUpdate(kostenIndex) {
  let geld = parseInt(localStorage.getItem('credits'))
  geld -= kosten[kostenIndex]
  localStorage.setItem('credits', geld)

  geldCheck()
}

function updater() {
  dbData.structures.forEach((value, i) => {
    if (value.type == 'consumer' || value.type == 'producer') {
      const cost = localStorage.getItem(`kosten_${i}`)
      const stage = localStorage.getItem(`stufe_${i}`)
      kosten[i] = cost
      stufe[i] = stage
    }
  })
}

const writeValueToTable = () => {
  updater()
  const kostenValueClass = document.querySelectorAll('.kostenValue')
  const stufenValueClass = document.querySelectorAll('.stufenValue')

  kosten.forEach((cost, i) => {
    cost = cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    kostenValueClass[i].innerHTML = `${cost}<span class="font">C</span>`
  })
  stufe.forEach((stage, i) => {
    stage = stage.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    stufenValueClass[i].innerText = stage
  })
}

export {upgradeFunction, writeValueToTable}
