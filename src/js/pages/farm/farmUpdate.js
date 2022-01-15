import {
  asteroidList,
  createAsteroidListInDom,
} from '../../modules/tableCreatorFarmAsteroid.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import {rohstoffCheck} from '../../helper/checkFunction.js'
import dbData from '../../helper/getData.js'
const reducer = (accumulator, currentValue) => accumulator + currentValue

let selectedAsteroid
let selectedAsteroidID
let mouseOverState = false
const unitCargo = [0]

function asteroidSelectionUpdater(asteroid, ID, asteroidDomList) {
  if (
    asteroid.className == `${asteroidList[ID].class} gewählt` ||
    asteroid.className == 'closed'
  ) {
    mouseOverState = false
    unselectAsteroid()
  } else {
    selectAsteroid(asteroid, ID, asteroidDomList)
  }

  function selectAsteroid() {
    asteroidDomList.forEach((target) => {
      target.className = target.className == 'closed' ? 'closed' : 'notElected'
    })
    mouseOverState = true
    asteroid.className = `${asteroidList[ID].class} gewählt`
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

  function classReset() {
    asteroidDomList.forEach((target, index) => {
      target.className = asteroidList[index].class
    })
    mouseOverState = false
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

export {formSubmit, asteroidSelectionUpdater}
