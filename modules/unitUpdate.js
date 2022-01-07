const unitTable = document.querySelector('.unitTable')
import {geldCheck} from '../modules/money.js'
import {combatCheck, unitLimitCheck, anzahlCheck} from '../modules/checkFunction.js'
import dbData from './getData.js'
import {errorMessage, succesMessage} from './alertMessage.js'

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
dbData.maxKappa.forEach(cargo => {
  maxKappa.push(cargo)
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
  let inputField = document.querySelector(`#unit_${i}`)

  inputField.value = Math.round(parseInt(inputField.value))
  if (inputField.value <= 0 || inputField.value == '' || isNaN(inputField.value)) {
    inputField.value = ''
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
  let inputField = document.querySelector(`#unit_${i}`)

  if (inputField.value == 0) {
    inputField.value = anzahl[i]
  } else if (anzahl[i] == 0) {
    inputField.value = anzahl[i]
  } else {
    anzahl[i] = parseInt(inputField.value) + parseInt(anzahl[i])
    inputField.value = anzahl[i]
  }
  InputFieldUpdater(i)
}
// updated die nötigen Arrays nach click auf Max unit (clickEventListenerValueUpdater)
function InputFieldUpdater(i) {
  let inputField = document.querySelector(`#unit_${i}`)
  rekrKosten[i] = anzahl[i] * kosten[i]
  inputArrayMaxKappa[i] = parseInt(anzahl[i])
  inputArray[i] = inputField.value
  rKostenUpdate()
  maxUnit()
}
function inputFieldClear() {
  dbData.units.forEach((unit, i) => {
    document.querySelector(`#unit_${i}`).value = ''
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

function formSubmit(event) {
  event.preventDefault()
  const inputUnitValue = []
  // holt sich werte aus input field
  dbData.units.forEach((e, i) => {
    let unit = document.querySelector(`#unit_${i}`)
    if (unit.value <= 0 || isNaN(unit.value) || unit.value == null) {
      unit.value = 0
    }
    inputUnitValue[i] = unit.value
  })
  const inputUnitValueEnd = inputUnitValue.reduce(reducer)

  if (inputUnitValueEnd <= 0) {
    errorMessage('bitte wähle mindestens eine Einheit aus')
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
      errorMessage('du hast nicht genug Credits dafür')
      // cleart die input felder
      inputFieldClear()
      document.querySelector('#rekrutierungsKosten').innerHTML = ''
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
        succesMessage('Great Success')
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
      combatCheck()
      unitLimitCheck()
      document.querySelector('#rekrutierungsKosten').innerHTML = ''
    }
  }
}

export {maxUnit, InputListenerValueUpdater, clickEventListenerValueUpdater, formSubmit}
