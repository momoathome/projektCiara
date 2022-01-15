import {addEventListenerAsteroid} from '../helper/eventListener.js'
import config from '../config.js'

const asteroidList = []

const createTableAsteroiden = (data) => {
  const roh = []

  function createAsteroiden() {
    // erstellt die asteroiden und führt für jeden einzelnen die funktionen aus
    for (let i = 0; i < config.asteroidNumber; i++) {
      const size = createAsteroidSize()
      mineralsForAsteroid(
        config.asteroidBaseRes[0],
        config.asteroidBaseRes[1],
        size
      )
      const mainRoh = mainRessource()
      pushAsteroidInList(mainRoh, size)
    }
    createAsteroidListInDom()
  }

  function createAsteroidSize() {
    // prettier-ignore
    const randSize = Math.random() + 1 *
        randomInt(config.asteroidMinMaxSize[0], config.asteroidMinMaxSize[1])

    return randSize.toFixed(2)
  }

  function mineralsForAsteroid(min, max, size) {
    data.forEach((e, i) => {
      roh[i] = Math.round(randomInt(min, max) * size)
    })
  }

  const randomInt = (min, max) => {
    const value = Math.floor(Math.random() * (max - min + 1) + min)
    return value
  }

  function mainRessource() {
    const mainValue = randomInt(1, 99)
    let mainRoh

    // if None
    if (mainValue >= 60) {
      mainRoh = -1
      roh[0] = Math.floor(roh[0] * 0.3)
      roh[1] = Math.floor(roh[1] * 0.4)
      roh[2] = Math.floor(roh[2] * 0.2)
      roh[3] = Math.floor(roh[3] * 0.25)
      // if Titanium
    } else if (mainValue >= 40) {
      mainRoh = 0
      roh[0] = Math.floor(roh[0] * 1.2)
      roh[1] = Math.floor(roh[1] * 0.3)
      roh[2] = Math.floor(roh[2] * 0.1)
      roh[3] = Math.floor(roh[3] * 0.15)
      // if Carbon
    } else if (mainValue >= 10) {
      mainRoh = 1
      roh[0] = Math.floor(roh[0] * 0.3)
      roh[1] = Math.floor(roh[1] * 1.1)
      roh[2] = Math.floor(roh[2] * 0.1)
      roh[3] = Math.floor(roh[3] * 0.15)
      // if Kristall
    } else if (mainValue >= 6) {
      mainRoh = 2
      roh[0] = Math.floor(roh[0] * 0.2)
      roh[1] = Math.floor(roh[1] * 0.2)
      roh[2] = Math.floor(roh[2] * 1.0)
      roh[3] = Math.floor(roh[3] * 0.1)
      // if Hydro
    } else {
      mainRoh = 3
      roh[0] = Math.floor(roh[0] * 0.2)
      roh[1] = Math.floor(roh[1] * 0.2)
      roh[2] = Math.floor(roh[2] * 0.05)
      roh[3] = Math.floor(roh[3] * 1.0)
    }
    return mainRoh
  }

  // push in rohSave array, zum weiterverarbeiten in "farmUpdate"
  // zum ein und ausblenden der daten wichtig, beim wählen der Asteroiden zum farmen
  function pushAsteroidInList(mainRoh, size) {
    asteroidList.push({
      Titanium: roh[0],
      Carbon: roh[1],
      Kyberkristall: roh[2],
      Hydrogenium: roh[3],
      mainRohIndex: mainRoh,
      size: size,
      class: 'asteroid',
    })
  }

  createAsteroiden()
}

// erstellt die jeweiligen Asteroiden in einer Row
function createAsteroidListInDom() {
  asteroidList.forEach((asteroid) => {
    const rohClass = setMainRohClass(asteroid.mainRohIndex)
    const list = document.querySelector('.table__body--asteroid')
    const row = document.createElement('tr')
    row.classList.add(asteroid.class)
    row.innerHTML =
      /* html */
      `
      <td>Titanium:</td>
      <td class=${rohClass[0]}>${asteroid.Titanium}</td>
      <td>Carbon:</td>
      <td class=${rohClass[1]}>${asteroid.Carbon}</td>
      <td>Kyberkristall:</td>
      <td class=${rohClass[2]}>${asteroid.Kyberkristall}</td>
      <td>Hydrogenium:</td>
      <td class=${rohClass[3]}>${asteroid.Hydrogenium}</td>
      <td>size:</td>
      <td class="roh">${asteroid.size}</td>
      `
    list.append(row)
  })

  function setMainRohClass(i) {
    const mainRohClasses = ['roh', 'roh', 'roh', 'roh']
    mainRohClasses[i] = 'rohMain'
    return mainRohClasses
  }
  addEventListenerAsteroid()
}

// --------------------------------------------------------------------

export {asteroidList, createAsteroidListInDom, createTableAsteroiden}
