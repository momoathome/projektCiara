const reduced = (accumulator, currentValue) => accumulator + currentValue
import dbData from './getData.js'

function kampfwertCheck() {
  let a = localStorage.getItem('attack')
  let b = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector('#kampfwert').innerHTML = b
}

function RohstoffCheck() {
  const rohSpan = document.querySelectorAll('.rohValueSpan')

  dbData.ressources.forEach((roh, i) => {
    let rohstoff = localStorage.getItem(`roh_${i}`)
    rohSpan[i].innerText = rohstoff.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  })
}

function unitLimitCheck() {
  const gesamtCurrentAnzahl = []
  dbData.units.forEach((unit, i) => {
    let currentAnzahl = localStorage.getItem(`anzahl_${i}`)
    gesamtCurrentAnzahl.push(parseInt(currentAnzahl))
  })
  let currentUnits = gesamtCurrentAnzahl.reduce(reduced)
  document.querySelector('#currentUnits').innerText = currentUnits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  let unitLimit = localStorage.getItem('maxUnitLimit')
  unitLimit = unitLimit.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector('#unitLimit').innerText = unitLimit
}

function anzahlCheck() {
  dbData.units.forEach((unit, i) => {
    let count = parseInt(localStorage.getItem(`anzahl_${i}`))
    document.querySelector(`#unit_${i}`).innerHTML = count
  })
}

export {kampfwertCheck, RohstoffCheck, unitLimitCheck, anzahlCheck}
