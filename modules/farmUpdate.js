import {
  asteroidList,
  classList,
  asteroidDomList,
  createAsteroidListInDom,
  addEventlistenerSelectAsteroid,
} from './tableCreatorFarm.js'
import {errorMessage, succesMessage} from './alertMessage.js'
import {rohstoffCheck} from './checkFunction.js'
import dbData from './getData.js'

let selectedAsteroid
let selectedAsteroidID
let atkVergleichWert
let state = false

function asteroidSelectionUpdater(asteroid, ID) {
  state = true
  if (asteroid.className == classList[ID] + ' gewählt' || asteroid.className == 'closed') {
    state = false
    unselectAsteroid()
  } else {
    selectAsteroid(asteroid, ID)
  }
}

function selectAsteroid(asteroid, ID) {
  asteroidDomList.forEach(target => {
    if (target.className == 'closed') {
      target.className = 'closed'
    } else {
      target.className = 'notElected'
    }
  })
  asteroid.className = classList[ID] + ' gewählt'
  state = true
  selectedAsteroid = asteroidList[ID]
  selectedAsteroidID = ID
  //gesamtAtkUpdater(classList[ID])
  mouseOverFunction()
}

function unselectAsteroid() {
  classReset()
  //hideText(riskInfoText)
  // unselect asteroid
  selectedAsteroid = ''
  selectedAsteroidID = ''
  atkVergleichWert = 0
}

function classReset() {
  asteroidDomList.forEach((target, index) => {
    target.className = classList[index]
  })
}

function mouseOverFunction() {
  asteroidDomList.forEach((target, index) => {
    target.addEventListener('mouseover', () => {
      if (target.className == 'notElected') {
        target.className = classList[index]
      }
    })
    target.addEventListener('mouseout', () => {
      if (state === true) {
        if (target.className == classList[index] && target.className !== 'abgeschlossen' && target.className !== 'closed') {
          target.className = 'notElected'
        }
      }
    })
  })
}

// ------------------------------------------------------------------------------------------------------------------------------------

const reducer = (accumulator, currentValue) => accumulator + currentValue

/*
const atkWertGesamtSpan = document.querySelector('#atkUnitfarmGesamt')
const riskInfoText = document.querySelector('.riskInfoText')

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

const InputUnitAtkWerte = []
function getInputUnitAtk() {
  // holt sich werte aus input field
  dbData.units.forEach((dbunit, i) => {
    let unit = document.querySelector(`#unit_${i}`)
    if (unit.value <= 0 || isNaN(unit.value) || unit.value == null) {
      unit.value = 0
    }
    InputUnitAtkWerte[i] = unit.value * dbunit.combat
  })
} */
const anzahl = []
const storageAnzahl = []
const unitCap = [0]

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

function gesamtCapUpdater() {
  const totalUnitCapSpan = document.querySelector('.totalUnitCap')
  let totalUnitCapInnerText = unitCap
    .reduce(reducer)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  totalUnitCapSpan.innerText = totalUnitCapInnerText
}

function capUpdater(i) {
  // capacity der Schiffe
  const capWert = []
  dbData.units.forEach((unit, i) => {
    capWert[i] = unit.cargo
  })
  let input = document.querySelector(`#unit_${i}`)
  let cap = parseInt(input.value) * capWert[i]
  if (isNaN(cap)) {
    cap = 0
  }
  document.querySelector(`.unitCapa_${i}`).innerText = cap.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  unitCap[i] = cap
  gesamtCapUpdater()
}

const inputArray = []
function InputListenerValueUpdater(i) {
  let inputField = document.querySelector(`#unit_${i}`)
  inputField.value = Math.round(parseInt(inputField.value))
  if (parseInt(inputField.value) < 0 || inputField.value == '') {
    inputField.value = ''
  } else if (inputField.value > parseInt(anzahl[i] + inputArray[i])) {
    inputField.value = parseInt(anzahl[i] + inputArray[i])
  }

  anzahl[i] = storageAnzahl[i] - inputField.value
  inputArray[i] = parseInt(inputField.value)
  updater(i)
  capUpdater(i)
}

function clickEventListenerAnzahlUpdater(i) {
  let input = document.querySelector(`#unit_${i}`)

  if (input.value == 0) {
    input.value = anzahl[i]
    anzahl[i] = 0
    updater(i)
    capUpdater(i)
  } else {
    if (anzahl[i] !== 0) {
      let value = anzahl[i] + parseInt(input.value)
      input.value = value
      anzahl[i] = 0
      updater(i)
      capUpdater(i)
    } else {
      anzahl[i] = parseInt(input.value)
      input.value = 0
      updater(i)
      capUpdater(i)
    }
  }
}

const selectedAsteroidRoh = []
const myRessources = []

function calcNewAsteroidRoh(enoughUnits) {
  const rohstoffArray = []

  if (enoughUnits) {
    rohstoffArray.push(0, 0, 0, 0)
  } else {
    let cap = unitCap.reduce(reducer)
    let subtract = Math.floor(cap / 4)
    let rest = cap % 4
    let val = selectedAsteroidRoh.map(value => value - subtract)
    val.forEach((element, i) => {
      if (element < 0) {
        val[i] = 0
        rest += 0 - element
      }
    })
    let largest = Math.max(...val)

    val.forEach((element, i) => {
      if (element == largest) {
        val[i] = val[i] - rest
      }
    })
    rohstoffArray.push(...val)

    rohstoffArray.forEach((element, i) => {
      myRessources[i] = selectedAsteroidRoh[i] - element
    })
  }
  setNewAsteroidRoh(rohstoffArray)
}

function setNewAsteroidRoh(array) {
  let asteroid = asteroidList[selectedAsteroidID]
  asteroidList.splice(selectedAsteroidID, 1, {
    Titanium: array[0],
    Carbon: array[1],
    Kyberkristall: array[2],
    Hydrogenium: array[3],
    mainRohIndex: asteroid.mainRohIndex,
    size: asteroid.size,
  })

  const list = document.querySelector('#asteroid')
  list.innerHTML = ''
  createAsteroidListInDom()
}

function getSelectedAsteroidRoh() {
  const arr = []
  Object.entries(selectedAsteroid).forEach(([key, value], index) => {
    arr[index] = value
  })
  arr.splice(4, 2)
  arr.forEach((value, i) => {
    selectedAsteroidRoh[i] = value
  })
}

function setRohLocalstorage(array) {
  array.forEach((value, i) => {
    let res = localStorage.getItem(`roh_${i}`)
    res = parseInt(res) + parseInt(value)
    localStorage.setItem(`roh_${i}`, res)
  })
}

function unitCheck() {
  let cap = unitCap.reduce(reducer)
  if (cap <= 0) {
    return errorMessage('bitte wähle mindestens eine Einheit aus')
  }
}

function rohEditFunction() {
  getSelectedAsteroidRoh()
  let cap = unitCap.reduce(reducer)
  let asteroidRoh = selectedAsteroidRoh.reduce(reducer)
  let enoughUnits

  if (asteroidRoh < cap) {
    // alle Rohstoffe aufs Konto
    enoughUnits = true
    calcNewAsteroidRoh(enoughUnits)
    setRohLocalstorage(selectedAsteroidRoh)
  } else {
    // nur ein teil der Rohstoffe aufs Konto
    enoughUnits = false
    calcNewAsteroidRoh(enoughUnits)
    setRohLocalstorage(myRessources)
  }

  farmAbschliesen(enoughUnits)
  rohstoffCheck()
}

function formSubmit(event) {
  event.preventDefault()
  // checkt ob ein Asteroid angeklickt ist
  if (selectedAsteroidID === '' || selectedAsteroidID === undefined || isNaN(selectedAsteroidID)) {
    return errorMessage('Bitte wähle einen Asteroiden aus')
  }
  /*  if (atkVergleichWert === 0 || atkVergleichWert === '' || isNaN(atkVergleichWert)) {
    return errorMessage('Bitte wähle einen Asteroiden aus')
  }  */

  let cap = unitCap.reduce(reducer)
  if (cap <= 0) {
    return errorMessage('bitte wähle mindestens eine Einheit aus')
  } else {
    rohEditFunction()
    succesMessage('Great Success')
  }

  // berechnet atk wert
  //getInputUnitAtk()
  //let atkGesamt = InputUnitAtkWerte.reduce(reducer)
  /* if (atkGesamt <= 0) {
    return errorMessage('bitte wähle mindestens eine Einheit aus')
  } else {
    // vergleicht ob atk für Asteroid reicht
    if (atkGesamt < atkVergleichWert) {
      // wird entfernt und für verlust rechnung verwendet
      errorMessage('du hast nicht genug Einheiten dafür')
      return 
    } */
  //else {
  // if succes
  //rohEditFunction()
  //farmAbschliesen()
  //succesMessage('Great Success')
  //}
  //}
}

function farmAbschliesen(enoughUnits) {
  if (enoughUnits) {
    classList.splice(selectedAsteroidID, 1, 'closed')
  }
  classReset()
  state = false

  // cleart die inputfelder
  dbData.units.forEach((value, i) => {
    document.querySelector(`#unit_${i}`).value = ''
    capUpdater(i)
  })
  selectedAsteroid = ''
  selectedAsteroidID = ''
  atkVergleichWert = 0

  maxUnitFarm()
}

export {asteroidSelectionUpdater, maxUnitFarm, formSubmit, InputListenerValueUpdater, clickEventListenerAnzahlUpdater}
