import * as farmUpdate from './farmUpdate.js'
import config from '../config.js'

const rohSave = []
const classList = []
let asteroidList = []

const createTableAsteroiden = data => {
  const roh = []
  let risk = 0

  function createAsteroiden() {
    const arr = []

    // erstellt einen array aus "asteroidenAnzahl" zahlen von 1 bis 100
    for (let i = 0; i < config.asteroidenAnzahl; i++) {
      let rand = randomInt(1, 99)
      arr.push(rand)
    }

    arr.forEach((number, i) => {
      createRisikoStufe(number)
      createMineralWerte()
      createAsteroidRow(risk)
    })
  }

  const randomInt = (min, max) => {
    let value = Math.floor(Math.random() * (max - min + 1) + min)
    return value
  }

  function createRisikoStufe(number) {
    // die ausgelesene number wird verglichen
    // ist sie größer wird ihr die entsprechende stufe zugewiesen
    if (number >= 60) {
      risk = 1
    } else if (number >= 35) {
      risk = 2
    } else if (number >= 15) {
      risk = 3
    } else if (number >= 4) {
      risk = 4
    } else {
      risk = 5
    }
  }

  function mainRessource() {
    let mainValue = randomInt(0, 3)
    // if Titanium
    if (mainValue == 0) {
      roh[0] = Math.floor(roh[0] * 1.3)
      roh[1] = Math.floor(roh[1] * 0.6)
      roh[2] = Math.floor(roh[2] * 0.4)
      roh[3] = Math.floor(roh[3] * 0.2)
      // if Carbon
    } else if (mainValue == 1) {
      roh[0] = Math.floor(roh[0] * 0.6)
      roh[1] = Math.floor(roh[1] * 1.3)
      roh[2] = Math.floor(roh[2] * 0.4)
      roh[3] = Math.floor(roh[3] * 0.2)
      // if Kristall
    } else if (mainValue == 2) {
      roh[0] = Math.floor(roh[0] * 0.4)
      roh[1] = Math.floor(roh[1] * 0.4)
      roh[2] = Math.floor(roh[2] * 1.0)
      roh[3] = Math.floor(roh[3] * 0.2)
      // if Hydro
    } else if (mainValue == 3) {
      roh[0] = Math.floor(roh[0] * 0.4)
      roh[1] = Math.floor(roh[1] * 0.4)
      roh[2] = Math.floor(roh[2] * 0.2)
      roh[3] = Math.floor(roh[3] * 1.3)
    }
  }

  // push in rohSave array, zum weiterverarbeiten in "farmUpdate"
  // zum ein und ausblenden der daten wichtig, beim wählen der Asteroiden zum farmen
  function pushInRohSaveArray() {
    rohSave.push({
      Titanium: roh[0],
      Carbon: roh[1],
      Kyberkristall: roh[2],
      Hydrogenium: roh[3],
    })
  }

  // erstellt je nach risiko stufe die Werte für Rohstoffe.
  function createMineralWerte() {
    // min und max werte der Rohstoffe.
    switch (risk) {
      case 1: // no risk
        randomMineralsForAsteroid(100, 160)
        break
      case 2: // low risk
        randomMineralsForAsteroid(200, 280)
        break
      case 3: // med risk
        randomMineralsForAsteroid(320, 400)
        break
      case 4: // high risk
        randomMineralsForAsteroid(440, 520)
        break
      case 5: // extrem risk
        randomMineralsForAsteroid(700, 900)
        break
    }
    mainRessource()
    pushInRohSaveArray()
  }
  function randomMineralsForAsteroid(min, max) {
    data.ressources.forEach((value, i) => {
      roh[i] = randomInt(min, max)
    })
  }

  // erstellt die jeweiligen Asteroiden in einer Row
  function createAsteroidRow(risk) {
    const list = document.querySelector('#asteroid')

    if (risk == 1) {
      risk = 'noRisk'
    } else if (risk == 2) {
      risk = 'lowRisk'
    } else if (risk == 3) {
      risk = 'medRisk'
    } else if (risk == 4) {
      risk = 'highRisk'
    } else if (risk == 5) {
      risk = 'exRisk'
    }

    const row = document.createElement('tr')
    row.classList.add(risk)
    row.innerHTML =
      /* html */
      `
        <td>Titanium:</td>
        <td class="roh">${roh[0]}</td>
        <td>Carbon:</td>
        <td class="roh">${roh[1]}</td>
        <td>Kyberkristall:</td>
        <td class="roh">${roh[2]}</td>
        <td>Hydrogenium:</td>
        <td class="roh">${roh[3]}</td>
        `
    list.appendChild(row)
  }

  createAsteroiden()
  addEventlistenerSelectAsteroid()
}

const addEventlistenerSelectAsteroid = () => {
  const asteroidListBody = document.querySelectorAll('#asteroid')
  asteroidList = asteroidListBody[0].childNodes

  asteroidList.forEach((asteroid, index) => {
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
        Atk:
        <span class="atkUnitfarm_${i}">0</span>
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

export {rohSave, classList, asteroidList, createTableFlotten, createTableAsteroiden}
