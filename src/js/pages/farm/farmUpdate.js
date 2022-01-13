import {
  asteroidList,
  asteroidDomList,
  createAsteroidListInDom,
} from '../../modules/tableCreatorFarmAsteroid.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import {rohstoffCheck} from '../../helper/checkFunction.js'
import dbData from '../../helper/getData.js'
const reducer = (accumulator, currentValue) => accumulator + currentValue

let selectedAsteroid
let selectedAsteroidID
let mouseOverState = false
const anzahl = []
const storageAnzahl = []
const unitCargo = [0]

function asteroidSelectionUpdater(asteroid, ID) {
  mouseOverState = true
  if (
    asteroid.className == asteroidList[ID].class + ' gewählt' ||
    asteroid.className == 'closed'
  ) {
    mouseOverState = false
    unselectAsteroid()
  } else {
    selectAsteroid(asteroid, ID)
  }

  function selectAsteroid(asteroid, ID) {
    asteroidDomList.forEach((target) => {
      if (target.className == 'closed') {
        target.className = 'closed'
      } else {
        target.className = 'notElected'
      }
    })
    mouseOverState = true
    asteroid.className = asteroidList[ID].class + ' gewählt'
    selectedAsteroid = asteroidList[ID]
    selectedAsteroidID = ID
    mouseOverFunction()
  }

  function unselectAsteroid() {
    classReset()
    // unselect asteroid
    selectedAsteroid = ''
    selectedAsteroidID = ''
  }

  function mouseOverFunction() {
    asteroidDomList.forEach((target, index) => {
      target.addEventListener('mouseover', () => {
        if (target.className == 'notElected') {
          target.className = asteroidList[index].class
        }
      })
      target.addEventListener('mouseout', () => {
        if (mouseOverState === true) {
          if (
            target.className == asteroidList[index].class &&
            target.className !== 'abgeschlossen' &&
            target.className !== 'closed'
          ) {
            target.className = 'notElected'
          }
        }
      })
    })
  }
}

function classReset() {
  asteroidDomList.forEach((target, index) => {
    target.className = asteroidList[index].class
  })
  mouseOverState = false
}

function maxUnitCalc() {
  anzahl.splice(0, anzahl.length)
  storageAnzahl.splice(0, anzahl.length)

  dbData.units.forEach((unit, i) => {
    const maxAnzahl = parseInt(localStorage.getItem(`anzahl_${i}`))
    anzahl.push(maxAnzahl)
    storageAnzahl.push(maxAnzahl)
    updater(i)
  })

  function maxCargoCalc() {
    const totalMaxUnitCargoSpan = document.querySelector(
      '.span__total-cargo--max'
    )
    const maxCargo = []
    dbData.units.forEach((unit, i) => {
      const singleMaxCargo = storageAnzahl[i] * unit.cargo
      maxCargo.push(singleMaxCargo)
    })

    const maxCargoInnerText = maxCargo
      .reduce(reducer)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    totalMaxUnitCargoSpan.innerText = maxCargoInnerText
  }

  maxCargoCalc()
}

function updater(i) {
  const anzahlString = anzahl[i]
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector(`.maxUnitfarm_${i}`).innerText = `(${anzahlString})`
}

function cargoUpdater(i) {
  // capacity der Schiffe
  const cargoWert = []
  dbData.units.forEach((unit, i) => {
    cargoWert[i] = unit.cargo
  })
  const inputField = document.querySelector(`#unit_${i}`)
  let cargo = parseInt(inputField.value) * cargoWert[i]
  if (isNaN(cargo)) {
    cargo = 0
  }
  unitCargo[i] = cargo
  document.querySelector(`.unitCargo_${i}`).innerText = cargo
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  function totalCargoUpdater() {
    const totalUnitCargoSpan = document.querySelector('.span__total-cargo')
    const totalUnitCargoInnerText = unitCargo
      .reduce(reducer)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    totalUnitCargoSpan.innerText = totalUnitCargoInnerText
  }

  totalCargoUpdater()
}
// needs to be outside to store the value till reload
const inputArray = []
function InputListenerValueUpdater(i) {
  const inputField = document.querySelector(`#unit_${i}`)
  inputField.value = Math.round(parseInt(inputField.value))
  if (parseInt(inputField.value) < 0 || inputField.value == '') {
    inputField.value = ''
  } else if (inputField.value > parseInt(anzahl[i] + inputArray[i])) {
    inputField.value = parseInt(anzahl[i] + inputArray[i])
  }

  anzahl[i] = storageAnzahl[i] - inputField.value
  inputArray[i] = parseInt(inputField.value)
  updater(i)
  cargoUpdater(i)
}

function clickEventListenerAnzahlUpdater(i) {
  const inputField = document.querySelector(`#unit_${i}`)

  if (inputField.value == 0) {
    inputField.value = anzahl[i]
    anzahl[i] = 0
  } else {
    if (anzahl[i] !== 0) {
      const value = anzahl[i] + parseInt(inputField.value)
      inputField.value = value
      anzahl[i] = 0
    } else {
      anzahl[i] = parseInt(inputField.value)
      inputField.value = 0
    }
  }
  updater(i)
  cargoUpdater(i)
}

const selectedAsteroidRoh = []
const myRessources = []

function formSubmit(event) {
  event.preventDefault()
  // checkt ob ein Asteroid angeklickt ist
  if (
    selectedAsteroidID === '' ||
    selectedAsteroidID === undefined ||
    isNaN(selectedAsteroidID)
  ) {
    return errorMessage('Bitte wähle einen Asteroiden aus')
  } else {
    // checkt ob eine Einheit ausgewählt wurde
    const cargo = unitCargo.reduce(reducer)
    if (cargo <= 0) {
      return errorMessage('bitte wähle mindestens eine Einheit aus')
    } else {
      // erfolgreich einen Asteroid gefarmt
      rohEditFunction()
      succesMessage('Great Success')
    }
  }
}

function rohEditFunction() {
  getSelectedAsteroidRoh()
  const cargo = unitCargo.reduce(reducer)
  const asteroidRoh = selectedAsteroidRoh.reduce(reducer)

  if (asteroidRoh < cargo) {
    // alle Rohstoffe aufs Konto
    calcNewAsteroidRoh(true)
    farmAbschliesen(true)
  } else {
    // nur ein teil der Rohstoffe aufs Konto
    calcNewAsteroidRoh(false)
    farmAbschliesen(false)
  }
}

function getSelectedAsteroidRoh() {
  const arr = []
  Object.entries(selectedAsteroid).forEach(([key, value], index) => {
    arr[index] = value
  })
  arr.splice(4, 3)
  arr.forEach((value, i) => {
    selectedAsteroidRoh[i] = value
  })
}

function calcNewAsteroidRoh(boolean) {
  const rohstoffArray = []

  // asteroid wird komplett verbraucht und alle Rohstoffe an spieler übertragen
  if (boolean) {
    rohstoffArray.push(0, 0, 0, 0)
  } else {
    // berechnet wie viele Rohstoffe der Spieler, mit der eingesetzten cargo anzahl der Schiffe erhalten kann
    // und zieht diese Anzahl dann gleichmäßig dem Asteroiden ab
    // bei ungeraden zahlen wir ein Rest berechnet, dieser wird am ende dem höchsten wert abgezogen

    const cargo = unitCargo.reduce(reducer)
    const subtract = Math.floor(cargo / 4)
    let rest = cargo % 4
    const val = selectedAsteroidRoh.map((value) => value - subtract)
    val.forEach((element, i) => {
      if (element < 0) {
        val[i] = 0
        rest += 0 - element
      }
    })
    const largest = Math.max(...val)

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
  const asteroid = asteroidList[selectedAsteroidID]
  asteroidList.splice(selectedAsteroidID, 1, {
    Titanium: array[0],
    Carbon: array[1],
    Kyberkristall: array[2],
    Hydrogenium: array[3],
    mainRohIndex: asteroid.mainRohIndex,
    size: asteroid.size,
    class: asteroid.class,
  })
}

function updateAsteroidDom() {
  const list = document.querySelector('.table__body--asteroid')
  list.innerHTML = ''
  createAsteroidListInDom()
}

function setRohLocalstorage(array) {
  array.forEach((value, i) => {
    let res = localStorage.getItem(`roh_${i}`)
    res = parseInt(res) + parseInt(value)
    localStorage.setItem(`roh_${i}`, res)
  })
}

function farmAbschliesen(boolean) {
  if (boolean) {
    asteroidList[selectedAsteroidID].class = 'closed'
    setRohLocalstorage(selectedAsteroidRoh)
  } else {
    setRohLocalstorage(myRessources)
  }

  // cleart die inputfelder
  dbData.units.forEach((value, i) => {
    document.querySelector(`#unit_${i}`).value = ''
    cargoUpdater(i)
  })
  selectedAsteroid = ''
  selectedAsteroidID = ''

  // classReset()
  updateAsteroidDom()
  maxUnitCalc()
  rohstoffCheck()
}

export {
  maxUnitCalc,
  formSubmit,
  InputListenerValueUpdater,
  clickEventListenerAnzahlUpdater,
  asteroidSelectionUpdater,
}
