import {rohSave, classList, asteroidList} from './tableCreatorFarm.js'
import {errorMessage, succesMessage} from './alertMessage.js'
import config from '../config.js'
import dbData from './getData.js'

let selectedAsteroid
let selectedAsteroidID
let atkVergleichWert
const inputArray = []
let state = false

const atkWertGesamtSpan = document.querySelector('#atkUnitfarmGesamt')
const riskInfoText = document.querySelector('.riskInfoText')

function asteroidSelectionUpdater(asteroid, ID) {
  state = true
  if (asteroid.className == classList[ID] + ' gewählt') {
    state = false
    unselectAsteroid()
  } else {
    selectAsteroid(asteroid, ID)
  }
}

function selectAsteroid(asteroid, ID) {
  asteroidList.forEach(target => {
    if (target.className == 'closed') {
      target.className = 'closed'
    } else {
      target.className = 'notElected'
    }
  })
  asteroid.className = classList[ID] + ' gewählt'
  state = true
  selectedAsteroid = rohSave[ID]
  selectedAsteroidID = ID

  gesamtAtkUpdater(classList[ID])
  mouseOverFunction()
}

function unselectAsteroid() {
  classReset()
  hideText(riskInfoText)
  // unselect asteroid
  selectedAsteroid = ''
  selectedAsteroidID = ''
  atkVergleichWert = 0
}

function classReset() {
  asteroidList.forEach((target, index) => {
    target.className = classList[index]
  })
}

function mouseOverFunction() {
  asteroidList.forEach((target, index) => {
    target.addEventListener(
      'mouseover',
      () => {
        if (target.className == 'notElected') {
          target.className = classList[index]
        }
      },
      false
    )
    target.addEventListener('mouseout', () => {
      if (state === true) {
        if (target.className == classList[index] && target.className !== 'abgeschlossen') {
          target.className = 'notElected'
        }
      }
    })
  })
}

// ------------------------------------------------------------------------------------------------------------------------------------

const anzahl = []
const storageAnzahl = []
const schiffAtkWert = [0]

const reducer = (accumulator, currentValue) => accumulator + currentValue

function gesamtAtkUpdater(risk) {
  targetAtkWert(risk)
  let prozent
  if (atkVergleichWert == undefined || atkVergleichWert == 0 || isNaN(atkVergleichWert)) {
    prozent = 0
  } else {
    prozent = (schiffAtkWert.reduce(reducer) / atkVergleichWert) * 100
  }
  if (prozent >= 100) {
    hideText(riskInfoText)
  } else if (prozent >= 90) {
    // gelb
    showText(riskInfoText)
    colorText(riskInfoText, '#f9c406')
  } else if (prozent >= 75) {
    // orange
    showText(riskInfoText)
    colorText(riskInfoText, '#e67919')
  } else if (prozent > 0) {
    // rot
    showText(riskInfoText)
    colorText(riskInfoText, '#b30000')
  } else {
    hideText(riskInfoText)
  }

  let atkUnitfarmInnerHtml = schiffAtkWert
    .reduce(reducer)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  atkWertGesamtSpan.innerHTML = atkUnitfarmInnerHtml
}

function showText(element) {
  if (element.style.visibility === 'visible') {
    return
  } else {
    element.style.visibility = 'visible'
    element.style.opacity = 1
  }
}
function hideText(element) {
  if (element.style.visibility === 'hidden') {
    return
  } else {
    element.style.visibility = 'hidden'
    element.style.opacity = 0
  }
}
function colorText(element, color) {
  element.style.color = color
}

function targetAtkWert(risk) {
  // holt sich Typ des Asteroid
  switch (risk) {
    case 'noRisk': // no risk
      atkVergleichWert = config.asteroidenAtkWerte[0]
      break
    case 'lowRisk': // low risk
      atkVergleichWert = config.asteroidenAtkWerte[1]
      break
    case 'medRisk': // med risk
      atkVergleichWert = config.asteroidenAtkWerte[2]
      break
    case 'highRisk': // high risk
      atkVergleichWert = config.asteroidenAtkWerte[3]
      break
    case 'exRisk': // extrem risk
      atkVergleichWert = config.asteroidenAtkWerte[4]
      break
  }
}

function maxUnitFarm() {
  anzahl.splice(0, anzahl.length)
  storageAnzahl.splice(0, anzahl.length)

  dbData.units.forEach((unit, i) => {
    let maxAnzahl = parseInt(localStorage.getItem(`anzahl_${i}`))
    anzahl.push(maxAnzahl)
    storageAnzahl.push(maxAnzahl)
    updater(i)
  })
}

function updater(i) {
  let anzahlString = anzahl[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector(`.maxUnitfarm_${i}`).innerText = `(${anzahlString})`
}

function atkUpdater(i) {
  // Attack werte der Schiffe
  const atkWert = []
  dbData.units.forEach((unit, i) => {
    atkWert[i] = unit.combat
  })
  let zwischenAtkWert = parseInt(document.querySelector(`#unit_${i}`).value) * atkWert[i]
  let zwischenAtkWertString = zwischenAtkWert.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector(`.atkUnitfarm_${i}`).innerText = zwischenAtkWertString
  schiffAtkWert[i] = zwischenAtkWert
  gesamtAtkUpdater()
}

function InputListenerValueUpdater(i) {
  let inputValue = parseInt(document.querySelector(`#unit_${i}`).value)
  if (inputValue < 0) {
    document.querySelector(`#unit_${i}`).value = 0
  } else if (inputValue > parseInt(anzahl[i] + inputArray[i])) {
    document.querySelector(`#unit_${i}`).value = parseInt(anzahl[i] + inputArray[i])
  }

  anzahl[i] = storageAnzahl[i] - parseInt(document.querySelector(`#unit_${i}`).value)
  updater(i)
  atkUpdater(i)
  inputArray[i] = parseInt(document.querySelector(`#unit_${i}`).value)
}

function clickEventListenerAnzahlUpdater(i) {
  let inputValue = parseInt(document.querySelector(`#unit_${i}`).value)

  if (inputValue == 0) {
    document.querySelector(`#unit_${i}`).value = anzahl[i]
    anzahl[i] = 0
    updater(i)
    atkUpdater(i)
  } else {
    let valueAnzahl = parseInt(document.querySelector(`#unit_${i}`).value)
    if (anzahl[i] !== 0) {
      let value = parseInt(anzahl[i] + valueAnzahl)
      document.querySelector(`#unit_${i}`).value = value
      anzahl[i] = 0
      updater(i)
      atkUpdater(i)
    } else {
      document.querySelector(`#unit_${i}`).value = 0
      anzahl[i] = valueAnzahl
      updater(i)
      atkUpdater(i)
    }
  }
}

function formSubmit(event) {
  event.preventDefault()
  console.log(selectedAsteroidID)

  if (selectedAsteroidID === '' || selectedAsteroidID === undefined || isNaN(selectedAsteroidID)) {
    return errorMessage('Bitte wähle einen Asteroiden aus')
  }
  if (atkVergleichWert === 0 || atkVergleichWert === '' || isNaN(atkVergleichWert)) {
    return errorMessage('Bitte wähle einen Asteroiden aus')
  }
  console.log('stage 2: ' + selectedAsteroidID)
  console.log('stage 2: ' + atkVergleichWert)

  // holt sich werte aus input field
  const InputUnitAtkWerte = []
  dbData.units.forEach((unit, i) => {
    let value = parseInt(document.querySelector(`#unit_${i}`).value)
    if (value <= 0 || isNaN(value) || value == null) {
      value = 0
    }
    InputUnitAtkWerte[i] = value * unit.combat
  })
  // berechnet atk wert
  let atkGesamt = InputUnitAtkWerte.reduce(reducer)
  if (atkGesamt <= 0) {
    return errorMessage('bitte wähle mindestens eine Einheit aus')
  } else {
    // vergleicht ob atk für Asteroid reicht
    if (atkGesamt < atkVergleichWert) {
      // wird entfernt und für verlust rechnung verwendet
      errorMessage('du hast nicht genug Einheiten dafür')
      return
    } else {
      // if succes
      const rohstoffArray = [0, 0, 0, 0]
      const selectedAsteroidRoh = []

      function rohEditFunction() {
        getSelectedAsteroidRoh()
        dbData.ressources.forEach((value, i) => {
          let res = localStorage.getItem(`roh_${i}`)
          res = parseInt(res, 10) + parseInt(selectedAsteroidRoh[i], 10)
          localStorage.setItem(`roh_${i}`, res)
          rohstoffArray[i] = res.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        })
        rohInDom()
      }
      rohEditFunction()

      function getSelectedAsteroidRoh() {
        Object.entries(selectedAsteroid).forEach(([key, value], index) => {
          selectedAsteroidRoh[index] = value
        })
      }

      function rohInDom() {
        const query = document.querySelectorAll('.rohValueSpan')
        query.forEach((e, i) => {
          e.innerText = rohstoffArray[i]
        })
      }

      farmAbschliesen()
      succesMessage('Great Success')
      selectedAsteroid = ''
      selectedAsteroidID = ''
      atkVergleichWert = 0
    }
  }
}

function farmAbschliesen() {
  classList.splice(selectedAsteroidID, 1, 'closed')
  classReset()
  state = false

  // cleart die inputfelder
  dbData.units.forEach((value, i) => {
    document.querySelector(`#unit_${i}`).value = ''
    atkUpdater(i)
  })
  maxUnitFarm()
}

export {asteroidSelectionUpdater, maxUnitFarm, formSubmit, InputListenerValueUpdater, clickEventListenerAnzahlUpdater}
