import dbData from '../modules/getData.js'
import {geldCheck} from './money.js'
import {errorMessage, succesMessage} from './alertMessage.js'
const kosten = []
const stufe = []
const maxKappa = []

dbData.maxKappa.forEach(cap => {
  maxKappa.push(cap)
})

function upgradeFunction(i) {
  // nicht genug Geld
  if (!creditCheck(i)) {
    return
  } else {
    // Succesful Upgrade
    updater()
    let stufeUpgraded = parseInt(localStorage.getItem(`stufe_${i}`)) + 1
    creditUpdate(i)
    if (i !== 0) {
      let newKost = Math.ceil((kosten[i] * 1.43) / 1000) * 1000
      localStorage.setItem(`stufe_${i}`, stufeUpgraded)
      localStorage.setItem(`kosten_${i}`, newKost)
      writeValueToTable()
    } else {
      let newKost = Math.ceil((kosten[i] * 1.43) / 1000) * 1000
      localStorage.setItem(`stufe_${i}`, stufeUpgraded)
      localStorage.setItem(`kosten_${i}`, newKost)
      localStorage.setItem('maxUnitLimit', maxKappa[stufeUpgraded - 1])
      writeValueToTable()

      let MaxKappaString = maxKappa[stufeUpgraded - 1]
      let x = MaxKappaString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      document.getElementById('unitLimit').innerText = x
    }
    succesMessage('succesful upgrade!')
  }
}

function creditCheck(kostenIndex) {
  // holt sich anzahl an credits
  let geld = parseInt(localStorage.getItem('credits'))
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
  geld = geld - kosten[kostenIndex]
  localStorage.setItem('credits', geld)

  geldCheck()
}

function updater() {
  dbData.structure.forEach((value, i) => {
    if (value.type == 'consumer' || value.type == 'producer') {
      let cost = localStorage.getItem(`kosten_${i}`)
      let stage = localStorage.getItem(`stufe_${i}`)
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
    kostenValueClass[i].innerHTML = cost + '<span class="font">C</span>'
  })
  stufe.forEach((stage, i) => {
    stage = stage.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    stufenValueClass[i].innerText = stage
  })
}

export {upgradeFunction, writeValueToTable}
