import {
  asteroidList,
  createAsteroidListInDom,
} from '../../modules/tableCreatorFarmAsteroid.js'
import {totalCargo, maxUnit} from './fleetUpdate.js'
import {errorMessage, succesMessage} from '../../helper/alertMessage.js'
import {rohstoffCheck} from '../../helper/checkFunction.js'
import * as helper from '../../helper/updateHelper.js'
const data = JSON.parse(localStorage.getItem('ressources'))
const dataUnits = JSON.parse(localStorage.getItem('units'))
const reducer = (accumulator, currentValue) => accumulator + currentValue

function formSubmitFleet(event) {
  event.preventDefault()
  const asteroid = JSON.parse(sessionStorage.getItem('asteroid'))
  if (!formCheck(asteroid)) return

  // SUCCESS
  rohEditFunction(asteroid)
  succesMessage('Great Success')
}

function formCheck(asteroid) {
  // checkt ob ein Asteroid angeklickt ist
  if (asteroid == null) {
    errorMessage('Bitte wähle einen Asteroiden aus')
    return false
  }
  // checkt ob eine Einheit ausgewählt wurde
  if (totalCargo().reduce(reducer) <= 0) {
    errorMessage('bitte wähle mindestens eine Einheit aus')
    return false
  }
  return true
}

function rohEditFunction(asteroid) {
  const totalRoh = getSelectedAsteroidRoh().reduce(reducer)

  if (totalRoh < totalCargo().reduce(reducer)) {
    // alle Rohstoffe aufs Konto
    const playerRessource = updateAsteroidRessources(true)
    farmAbschliesen(true, playerRessource, asteroid)
  } else {
    // nur ein teil der Rohstoffe aufs Konto
    const playerRessource = updateAsteroidRessources(false)
    farmAbschliesen(false, playerRessource, asteroid)
  }
}

function getSelectedAsteroidRoh() {
  const asteroid = JSON.parse(sessionStorage.getItem('asteroid'))
  const selectedRessources = []
  Object.entries(asteroid).forEach(([key, value]) => {
    selectedRessources.push(value)
  })
  selectedRessources.splice(4, 4)
  return selectedRessources
}

function updateAsteroidRessources(boolean) {
  const rohstoffArray = []
  // asteroid wird komplett verbraucht und alle Rohstoffe aufs Konto
  if (boolean) {
    rohstoffArray.push(0, 0, 0, 0)
  } else {
    // berechnet wie viele Rohstoffe der Spieler, mit der eingesetzten cargo anzahl der Schiffe erhalten kann
    // und zieht diese Anzahl dann gleichmäßig dem Asteroiden ab
    // bei ungeraden zahlen wir ein Rest berechnet, dieser wird am ende dem höchsten wert abgezogen
    calcAsteroidRestRessource()
  }

  function calcAsteroidRestRessource() {
    const cargo = totalCargo().reduce(reducer)
    const subtract = Math.floor(cargo / 4)
    let rest = cargo % 4
    const asteroidRessources = getSelectedAsteroidRoh().map(
      (value) => value - subtract
    )

    asteroidRessources.forEach((element, i) => {
      if (element < 0) {
        asteroidRessources[i] = 0
        rest += 0 - element
      }
    })
    const largest = Math.max(...asteroidRessources)

    asteroidRessources.forEach((element, i) => {
      if (element == largest) {
        asteroidRessources[i] -= rest
      }
    })
    rohstoffArray.push(...asteroidRessources)
  }

  function playerResources() {
    const playerRessources = []
    rohstoffArray.forEach((element, i) => {
      playerRessources.push(getSelectedAsteroidRoh()[i] - element)
    })
    return playerRessources
  }

  setNewAsteroidRoh(rohstoffArray)
  return playerResources()
}

function setNewAsteroidRoh(array) {
  const asteroid = JSON.parse(sessionStorage.getItem('asteroid'))
  asteroidList.splice(asteroid.ID, 1, {
    Titanium: array[0],
    Carbon: array[1],
    Kyberkristall: array[2],
    Hydrogenium: array[3],
    ID: asteroid.ID,
    mainRohIndex: asteroid.mainRohIndex,
    size: asteroid.size,
    class: asteroid.class,
  })
}

function farmAbschliesen(boolean, playerResource, asteroid) {
  if (boolean) {
    asteroidList[asteroid.ID].class = 'closed'
  }

  setRohLocalstorage(playerResource)
  helper.inputFieldClear()
  updateAsteroidDom()
  rohstoffCheck()
  cargoReset()
  maxUnit(dataUnits)
  sessionStorage.removeItem('asteroid')
}

function setRohLocalstorage(array) {
  data.map((res, i) => {
    res.quantity += array[i]
  })
  localStorage.setItem('ressources', JSON.stringify(data))
}

function cargoReset() {
  dataUnits.forEach((unit, i) => {
    document.querySelector(`.unitCargo_${i}`).innerText = ''
  })
  const totalUnitCargoSpan = document.querySelector('.span__total-cargo')
  totalUnitCargoSpan.innerText = ''
}

function updateAsteroidDom() {
  const list = document.querySelector('.table__body--asteroid')
  list.innerHTML = ''
  createAsteroidListInDom()
}

export {formSubmitFleet}
