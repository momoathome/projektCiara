import {addEventListenerAsteroid} from '../helper/eventListener.js'
import config from '../config.js'

const asteroidList = []

const createTableAsteroiden = (data) => {
  function createAsteroiden() {
    // erstellt die asteroiden und führt für jeden einzelnen die funktionen aus
    for (let i = 0; i < config.asteroidNumber; i++) {
      const size = createAsteroidSize()
      const minerals = createAsteroidMinerals(
        config.asteroidBaseRes[0],
        config.asteroidBaseRes[1],
        size
      )
      const mainRoh = mainRessource(minerals)
      pushAsteroidInList(mainRoh, size, i)
    }
    createAsteroidListInDom()
  }

  function createAsteroidSize() {
    // prettier-ignore
    const randSize = Math.random() + 1 *
        randomInt(config.asteroidMinMaxSize[0], config.asteroidMinMaxSize[1])

    return randSize.toFixed(2)
  }

  function createAsteroidMinerals(min, max, size) {
    const roh = []
    data.forEach(() => {
      roh.push(Math.round(randomInt(min, max) * size))
    })
    return roh
  }

  const randomInt = (min, max) => {
    const value = Math.floor(Math.random() * (max - min + 1) + min)
    return value
  }

  function mainRessource(minerals) {
    const mainValue = randomInt(1, 99)
    // prettier-ignore
    const mainResMultiplie = (res, index, main) => Math.floor(res *= config.mainRes[main][index])
    const mainRes = (main, i) => {
      const ressources = minerals.map((res, index) =>
        mainResMultiplie(res, index, main)
      )
      ressources.push(i)
      return ressources
    }

    // None/default
    if (mainValue >= 30) return mainRes('default', -1)
    // Titanium
    if (mainValue >= 20) return mainRes('titanium', 0)
    // Carbon
    if (mainValue >= 10) return mainRes('carbon', 1)
    // Kristall
    if (mainValue >= 5) return mainRes('kristall', 2)
    // Hydro
    return mainRes('hydro', 3)
  }

  // push in rohSave array, zum weiterverarbeiten in "farmUpdate"
  // zum ein und ausblenden der daten wichtig, beim wählen der Asteroiden zum farmen
  function pushAsteroidInList(mainRoh, size, ID) {
    asteroidList.push({
      Titanium: mainRoh[0],
      Carbon: mainRoh[1],
      Kyberkristall: mainRoh[2],
      Hydrogenium: mainRoh[3],
      ID: ID,
      mainRohIndex: mainRoh[4],
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
