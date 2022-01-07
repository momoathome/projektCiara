import * as farmUpdate from './farmUpdate.js'
import config from '../config.js'

const asteroidList = []
const classList = []

const createTableAsteroiden = data => {
  const roh = []
  let asteroidSize
  let mainRohClass

  function createAsteroiden() {
    // erstellt die asteroiden und führt für jeden einzelnen die funktionen aus
    for (let i = 0; i < config.asteroidenAnzahl; i++) {
      let rand = randomInt(1, 99)

      createMineralWerte()
      mainRessource()
      pushAsteroidInList()
    }
  }

  function createMineralWerte() {
    // min und max werte der Rohstoffe.
    MineralsForAsteroid(config.asteroidenBaseValue[0], config.asteroidenBaseValue[1])
  }

  function MineralsForAsteroid(min, max) {
    let size = createAsteroidSize()
    data.ressources.forEach((value, i) => {
      roh[i] = randomInt(min, max) * size
    })
  }

  function createAsteroidSize() {
    let randSize = Math.random() + 1 * randomInt(config.asteroidenMinMaxSize[0], config.asteroidenMinMaxSize[1])
    asteroidSize = randSize.toFixed(2)
    return asteroidSize
  }

  const randomInt = (min, max) => {
    let value = Math.floor(Math.random() * (max - min + 1) + min)
    return value
  }

  function mainRessource() {
    let mainValue = randomInt(1, 99)

    // if None
    if (mainValue >= 60) {
      mainRohClass = -1
      roh[0] = Math.floor(roh[0] * 0.3)
      roh[1] = Math.floor(roh[1] * 0.4)
      roh[2] = Math.floor(roh[2] * 0.2)
      roh[3] = Math.floor(roh[3] * 0.25)
      // if Titanium
    } else if (mainValue >= 40) {
      mainRohClass = 0
      roh[0] = Math.floor(roh[0] * 1.2)
      roh[1] = Math.floor(roh[1] * 0.3)
      roh[2] = Math.floor(roh[2] * 0.1)
      roh[3] = Math.floor(roh[3] * 0.15)
      // if Carbon
    } else if (mainValue >= 10) {
      mainRohClass = 1
      roh[0] = Math.floor(roh[0] * 0.3)
      roh[1] = Math.floor(roh[1] * 1.1)
      roh[2] = Math.floor(roh[2] * 0.1)
      roh[3] = Math.floor(roh[3] * 0.15)
      // if Kristall
    } else if (mainValue >= 6) {
      mainRohClass = 2
      roh[0] = Math.floor(roh[0] * 0.2)
      roh[1] = Math.floor(roh[1] * 0.2)
      roh[2] = Math.floor(roh[2] * 1.0)
      roh[3] = Math.floor(roh[3] * 0.1)
      // if Hydro
    } else {
      mainRohClass = 3
      roh[0] = Math.floor(roh[0] * 0.2)
      roh[1] = Math.floor(roh[1] * 0.2)
      roh[2] = Math.floor(roh[2] * 0.05)
      roh[3] = Math.floor(roh[3] * 1.0)
    }
  }

  // push in rohSave array, zum weiterverarbeiten in "farmUpdate"
  // zum ein und ausblenden der daten wichtig, beim wählen der Asteroiden zum farmen
  function pushAsteroidInList() {
    asteroidList.push({
      Titanium: roh[0],
      Carbon: roh[1],
      Kyberkristall: roh[2],
      Hydrogenium: roh[3],
      mainRohIndex: mainRohClass,
      size: asteroidSize,
    })
  }

  createAsteroiden()
  createAsteroidListInDom()
}

// erstellt die jeweiligen Asteroiden in einer Row
function createAsteroidListInDom() {
  asteroidList.forEach((e, i) => {
    let rohClass = setMainRohClass(asteroidList[i].mainRohIndex)
    const list = document.querySelector('#asteroid')
    const row = document.createElement('tr')
    row.classList.add('asteroid')
    row.innerHTML =
      /* html */
      `
      <td>Titanium:</td>
      <td class=${rohClass[0]}>${asteroidList[i].Titanium}</td>
      <td>Carbon:</td>
      <td class=${rohClass[1]}>${asteroidList[i].Carbon}</td>
      <td>Kyberkristall:</td>
      <td class=${rohClass[2]}>${asteroidList[i].Kyberkristall}</td>
      <td>Hydrogenium:</td>
      <td class=${rohClass[3]}>${asteroidList[i].Hydrogenium}</td>
      <td>size:</td>
      <td class="roh">${asteroidList[i].size}</td>
      `
    list.appendChild(row)
  })

  function setMainRohClass(i) {
    const mainRohClasses = ['roh', 'roh', 'roh', 'roh']
    mainRohClasses[i] = 'rohMain'
    return mainRohClasses
  }
  addEventlistenerSelectAsteroid()
}

let asteroidDomList = []
const addEventlistenerSelectAsteroid = () => {
  const asteroidListBody = document.querySelectorAll('#asteroid')
  asteroidDomList = asteroidListBody[0].childNodes

  asteroidDomList.forEach((asteroid, index) => {
    classList.push(asteroid.classList.value)
    asteroid.addEventListener('click', () => {
      farmUpdate.asteroidSelectionUpdater(asteroid, index)
    })
  })
}

// --------------------------------------------------------------------
const createTableFlotten = data => {
  const farmForm = document.querySelector('.innerFarmForm')
  const FarmWerte = document.querySelector('.innerFarmWerte')

  data.units.forEach((unit, i) => {
    const row = document.createElement('div')

    const tableData =
      /* html */
      `
      <div class="form-group">
      <label for="unit_${i}">${unit.name}</label>
      <input
        type="number"
        min="0"
        max="100000"
        id="unit_${i}"
        class="form-control"
      />
    </div>
`
    row.innerHTML = tableData
    farmForm.appendChild(row)
  })

  data.units.forEach((unit, i) => {
    const row = document.createElement('div')

    const tableData =
      /* html */
      `
      <p class="farm-para">
        <span class="clickableValue maxUnitfarm_${i}"></span>
        cargo:
        <span class="unitCapa_${i}">0</span>
      </p>
      `
    row.innerHTML = tableData
    FarmWerte.appendChild(row)
  })
  farmUpdate.maxUnitFarm()
  addEventlistenerInputFieldUpdater()
  addEventListenerFarmSubmit()
}

const addEventlistenerInputFieldUpdater = () => {
  const inputFields = document.querySelectorAll('.form-control')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      farmUpdate.InputListenerValueUpdater(i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      farmUpdate.clickEventListenerAnzahlUpdater(i)
    })
  })
}

const addEventListenerFarmSubmit = () => {
  const flottenForm = document.querySelector('.farm-form')
  flottenForm.addEventListener('submit', event => {
    farmUpdate.formSubmit(event)
  })
}

export {
  asteroidList,
  classList,
  asteroidDomList,
  createAsteroidListInDom,
  createTableFlotten,
  createTableAsteroiden,
  addEventlistenerSelectAsteroid,
}
