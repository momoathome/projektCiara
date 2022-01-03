import * as farmUpdate from './farmUpdate.js'
import config from '../config.js'

const rohSave = []
const classList = []
let asteroidList = []

const createTableAsteroiden = data => {
  // erstellt einen array aus "asteroidenAnzahl" zahlen von 1 bis 100
  function createAsteroiden() {
    const arr = []
    const roh = []

    // bereinigt alte Liste
    arr.splice(0, arr.length)
    rohSave.splice(0, rohSave.length)
    let oldList = document.querySelector('#asteroid')
    oldList.innerHTML = ''
    // erstellt anzahl neuer Asteroiden
    for (let i = 0; i < config.asteroidenAnzahl; i++) {
      // erstellt "asteroidenAnzahl" mal eine random zahl zwischen 1 und 100
      // zum erstellen der jeweiligen risiko Stufe
      function randomIntFromInterval(min, max) {
        // min and max included
        let rand = Math.floor(Math.random() * (max - min + 1) + min)
        arr.push(rand)
      }
      randomIntFromInterval(1, 99)
    }

    let risk = 0
    const list = document.querySelector('#asteroid')
    // iteriert durch den "arr" array und gibt die zahlen aus
    arr.forEach((zahl, i) => {
      function createRisikoStufe(zahl, i) {
        // die ausgelesene Zahl wird verglichen
        // ist sie größer wird ihr die entsprechende stufe zugewiesen
        if (zahl >= 60) {
          risk = 1
          createMineralWerte()
          createAsteroidRow(risk)
        } else if (zahl >= 35) {
          risk = 2
          createMineralWerte()
          createAsteroidRow(risk)
        } else if (zahl >= 15) {
          risk = 3
          createMineralWerte()
          createAsteroidRow(risk)
        } else if (zahl >= 4) {
          risk = 4
          createMineralWerte()
          createAsteroidRow(risk)
        } else {
          risk = 5
          createMineralWerte()
          createAsteroidRow(risk)
        }
      }
      createRisikoStufe(zahl, i)

      // erstellt je nach risiko stufe die Werte für Rohstoffe.
      function createMineralWerte() {
        function randomIntFromInterval(min, max) {
          data.ressources.forEach((value, i) => {
            let roherz = rohMath(min, max)
            roh[i] = roherz
          })
        }
        const rohMath = (min, max) => {
          let value = Math.floor(Math.random() * (max - min + 1) + min)
          return value
        }
        // min und max werte für Werte der Rohstoffe.
        switch (risk) {
          case 1: // no risk
            randomIntFromInterval(100, 160)
            break
          case 2: // low risk
            randomIntFromInterval(200, 280)
            break
          case 3: // med risk
            randomIntFromInterval(320, 400)
            break
          case 4: // high risk
            randomIntFromInterval(440, 520)
            break
          case 5: // extrem risk
            randomIntFromInterval(700, 900)
            break
        }
        const mainRoh = () => {
          let mainValue = rohMath(0, 3)
          // if Titanium
          if (mainValue == 0) {
            roh[0] = Math.floor(roh[0] * 1.3)
            roh[1] = Math.floor(roh[1] * 0.6)
            roh[2] = Math.floor(roh[2] * 0.5)
            roh[3] = Math.floor(roh[3] * 0.4)
            // if Carbon
          } else if (mainValue == 1) {
            roh[0] = Math.floor(roh[0] * 0.6)
            roh[1] = Math.floor(roh[1] * 1.3)
            roh[2] = Math.floor(roh[2] * 0.5)
            roh[3] = Math.floor(roh[3] * 0.4)
            // if Kristall
          } else if (mainValue == 2) {
            roh[0] = Math.floor(roh[0] * 0.4)
            roh[1] = Math.floor(roh[1] * 0.4)
            roh[2] = Math.floor(roh[2] * 1.3)
            roh[3] = Math.floor(roh[3] * 0.2)
            // if Hydro
          } else if (mainValue == 3) {
            roh[0] = Math.floor(roh[0] * 0.5)
            roh[1] = Math.floor(roh[1] * 0.5)
            roh[2] = Math.floor(roh[2] * 0.2)
            roh[3] = Math.floor(roh[3] * 1.5)
          }
        }
        mainRoh()

        // push in rohSave array, zum weiterverarbeiten in "farmUpdate"
        // zum ein und ausblenden der daten wichtig, beim wählen der Asteroiden zum farmen
        rohSave.push({
          Titanium: roh[0],
          Carbon: roh[1],
          Kyberkristall: roh[2],
          Hydrogenium: roh[3],
        })
      }

      // erstellt die jeweiligen Asteroiden in einer Row
      function createAsteroidRow(risk) {
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
    })
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
