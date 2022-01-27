import {valToString} from '../helper/updateHelper.js'

function combatCheck() {
  const combat = localStorage.getItem('combat')
  document.querySelector('#combat').innerHTML = valToString(combat)
}

function rohstoffCheck() {
  const res = JSON.parse(localStorage.getItem('ressources'))
  const rohSpan = document.querySelectorAll('.rohValueSpan')

  rohSpan.forEach((span, i) => {
    span.innerText = valToString(res[i].quantity)
  })
}

function unitLimitCheck() {
  const units = JSON.parse(localStorage.getItem('units'))

  const currentUnits = units.reduce((acc, unit) => acc + unit.quantity, 0)
  document.querySelector('#currentUnits').innerText = valToString(currentUnits)

  const unitLimit = localStorage.getItem('unitLimit')
  document.querySelector('#unitLimit').innerText = valToString(unitLimit)
}

export {combatCheck, rohstoffCheck, unitLimitCheck}
