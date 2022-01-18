import {asteroidList} from '../../modules/tableCreatorFarmAsteroid.js'

let selectedAsteroid
let selectedAsteroidID
let mouseOverState = false

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
        if (
          mouseOverState === true &&
          target.className == asteroidList[index].class &&
          target.className !== 'abgeschlossen' &&
          target.className !== 'closed'
        ) {
          target.className = 'notElected'
        }
      })
    })
  }
}

export {asteroidSelectionUpdater, selectedAsteroid, selectedAsteroidID}
