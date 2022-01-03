const unitTable = document.querySelector('.unitTable')
import {geldCheck} from '../modules/money.js'
import {kampfwertCheck, unitLimitCheck, anzahlCheck} from '../modules/checkFunction.js'
import dbData from './getData.js'

let rekrKosten = [0]
let inputArray = [0]
let inputArrayMaxKappa = [0]
const anzahl = [0]
const kosten = []
const atk = []
const maxKappa = []

const reducer = (accumulator, currentValue) => accumulator + currentValue
dbData.units.forEach(unit => {
  kosten.push(unit.credits)
  atk.push(unit.combat)
})
dbData.maxKappa.forEach(cap => {
  maxKappa.push(cap)
})
// checks how many Units can be max build and shows them in the table
function maxUnit() {
  let maxAnzahlKappa = [0]
  let restGeld = 0
  const s = parseInt(localStorage.getItem('stufe_0') - 1)
  const geld = parseInt(localStorage.getItem('credits'))
  // needed for inputlistener
  const reducedRekrKosten = rekrKosten.reduce(reducer)
  restGeld = geld - reducedRekrKosten
  let inputArrayMaxKappaReduced = inputArrayMaxKappa.reduce(reducer)
  maxAnzahlKappa.splice(0, maxAnzahlKappa.length, 0)

  kosten.forEach((e, i) => {
    let anzahlKappa = localStorage.getItem(`anzahl_${i}`)
    maxAnzahlKappa.push(parseInt(anzahlKappa))
  })
  const maxAnzahlKappaReduced = maxAnzahlKappa.reduce(reducer)
  kosten.forEach((e, i) => {
    if (maxAnzahlKappaReduced >= maxKappa[s]) {
      anzahl[i] = 0
      document.querySelector(`#maxUnit_${i}`).innerHTML = `(${anzahl[i]})`
      return
    } else {
      anzahl[i] = Math.floor(restGeld / kosten[i])
      if (anzahl[i] >= maxKappa[s]) {
        anzahl[i] = maxKappa[s] - maxAnzahlKappaReduced
      }
      if (inputArrayMaxKappaReduced >= 0) {
        anzahl[i] = parseInt(maxKappa[s] - inputArrayMaxKappaReduced - maxAnzahlKappaReduced)
        if (anzahl[i] > Math.floor(restGeld / kosten[i])) {
          anzahl[i] = Math.floor(restGeld / kosten[i])
        }
      }
    }
    let anzahlString = anzahl[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    const maxUnit = unitTable.querySelector(`#maxUnit_${i}`)
    maxUnit.innerHTML = `(${anzahlString})`
  })
}

// listener für den Input
function InputListenerValueUpdater(i) {
  let geld = parseInt(localStorage.getItem('credits'))
  let inputField = document.querySelector(`#input_unit_${i}`)

  if (inputField.value < 0 || inputField.value == '00') {
    inputField.value = 0
  }
  if (inputField.value > geld / kosten[i]) {
    inputField.value = Math.floor(geld / kosten[i])
  }
  if (inputField.value > parseInt(anzahl[i] + inputArray[i])) {
    inputField.value = anzahl[i] + inputArray[i]
  }
  inputArrayMaxKappa[i] = parseInt(inputField.value)
  if (inputArrayMaxKappa[i] == '' || isNaN(inputArrayMaxKappa[i])) {
    inputArrayMaxKappa[i] = 0
  }

  rekrKosten[i] = inputField.value * kosten[i]
  inputArray[i] = parseInt(inputField.value)
  rKostenUpdate()
  maxUnit()
}

// klick auf max anzahl Units
function clickEventListenerValueUpdater(i) {
  let inputField = document.querySelector(`#input_unit_${i}`)

  if (inputField.value == 0) {
    inputField.value = anzahl[i]
    InputFieldUpdater(i)
  } else if (anzahl[i] == 0) {
    inputField.value = anzahl[i]
    InputFieldUpdater(i)
  } else {
    anzahl[i] = parseInt(inputField.value) + parseInt(anzahl[i])
    inputField.value = anzahl[i]
    InputFieldUpdater(i)
  }
}
// updated das Inputfield nach click auf Max unit (clickEventListenerValueUpdater)
function InputFieldUpdater(i) {
  let inputField = document.querySelector(`#input_unit_${i}`)
  rekrKosten[i] = anzahl[i] * kosten[i]
  inputArrayMaxKappa[i] = parseInt(anzahl[i])
  inputArray[i] = parseInt(inputField.value)
  rKostenUpdate()
  maxUnit()
}
function inputFieldClear() {
  dbData.units.forEach((unit, i) => {
    document.querySelector(`#input_unit_${i}`).value = ''
  })
}

function rKostenUpdate() {
  // text update für Rekrutierungskosten Text
  let rekrKostenInnerText =
    rekrKosten
      .reduce(reducer)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '<span class="font">C</span>'
  document.querySelector('#rekrutierungsKosten').innerHTML = rekrKostenInnerText
}

const input = document.querySelector('#form-unit').addEventListener('submit', e => {
  // Prevent actual submit
  e.preventDefault()
  let inputUnitValue = []
  // holt sich werte aus input field
  kosten.forEach((value, i) => {
    let inputValue = parseInt(document.querySelector(`#input_unit_${i}`).value)
    if (inputValue <= 0 || isNaN(inputValue) || inputValue == null) {
      inputValue = 0
    }
    inputUnitValue[i] = inputValue
  })
  const inputUnitValueEnd = inputUnitValue.reduce(reducer)

  if (inputUnitValueEnd <= 0) {
    document.getElementById('output').innerHTML =
      '<p style="background:darkred;" class="alert"; >' + 'Bitte wähle mindestens eine Einheit zum rekrutieren aus' + '</p>'
    setTimeout(() => document.querySelector('.alert').remove(), 5000)
    // cleart die input felder
    inputFieldClear()
    return
  } else {
    // errechnet gesamt Kosten für Units
    const unitKosten = []
    kosten.forEach((e, i) => {
      unitKosten[i] = inputUnitValue[i] * kosten[i]
    })
    let kostenGesamt = parseInt(unitKosten.reduce(reducer))
    // holt sich anzahl an credits
    let geld = localStorage.getItem('credits')
    // check ob Geld reicht
    if (kostenGesamt > geld) {
      // wenn geld nicht reicht, fehlermeldung und function wird nicht ausgeführt
      document.getElementById('output').innerHTML =
        '<p style="background:darkred;" class="alert"; >' + 'du hast nicht genug Credits dafür' + '</p>'
      setTimeout(() => document.querySelector('.alert').remove(), 5000)
      // cleart die input felder
      inputFieldClear()
      document.querySelector('#rekrutierungsKosten').innerHTML = '0' + '<span class="font">C</span>'
      return
    } else {
      // wenn geld reicht
      // hol sich aktuelle Zahl aus dem array(Speicher/datenbank)
      // und rechnet sie mit den rekrutierten zusammen
      const atkArray = []
      kosten.forEach((item, i) => {
        let currentAnzahl = parseInt(localStorage.getItem(`anzahl_${i}`))
        if (currentAnzahl <= 0 || isNaN(currentAnzahl) || currentAnzahl == null) {
          currentAnzahl = 0
        }
        let newAnzahl = parseInt(inputUnitValue[i]) + parseInt(currentAnzahl)
        localStorage.setItem(`anzahl_${i}`, newAnzahl)

        //berechnet die neuen gesamt akt / Kampfwert
        let newAtk = newAnzahl * atk[i]
        atkArray.push(newAtk)

        // cleart die input felder
        inputFieldClear()
      })

      // speichert neuen kampfwert im localstorage
      let atkWert = atkArray.reduce(reducer)
      localStorage.setItem('attack', atkWert)

      // neues Guthaben berechnen und in den Localstorage schreiben
      geld = geld - kostenGesamt
      localStorage.setItem('credits', geld)

      // Reset der Arrays
      inputArray = [0]
      inputArrayMaxKappa = [0]
      rekrKosten = [0]
      anzahlCheck()
      maxUnit()
      geldCheck()
      kampfwertCheck()
      unitLimitCheck()
      document.querySelector('#rekrutierungsKosten').innerHTML = ''
    }
  }
})

export {maxUnit, InputListenerValueUpdater, clickEventListenerValueUpdater}
