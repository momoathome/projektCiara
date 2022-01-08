import dbData from '../helper/getData.js'
import config from '../config.js'
const initCosts = []
const initEnergie = []
const initRessource = []

function initFunction(data) {
  const genData = []
  // push strucutre data in data array
  data.structure.forEach(e => {
    genData.push(e)
  })
  data.ressources.forEach(e => {
    initRessource.push(e.value)
  })
  genData.forEach(e => {
    initCosts.push(e.cost.credits)
    initEnergie.push(e.energie)
  })

  function initDate() {
    localStorage.setItem('dateset', true)

    let startDate = new Date()
    let year = startDate.getFullYear()
    let month = startDate.getMonth()
    let day = startDate.getDate()
    let hour = startDate.getHours()
    let min = startDate.getMinutes()
    let sec = startDate.getSeconds()

    let sekundenZahl = sec + min * 60 + hour * 60 * 60 + day * 24 * 60 * 60 + month * 30 * 24 * 60 * 60 + year * 12 * 30 * 60 * 60

    localStorage.setItem('startdate', sekundenZahl)
    localStorage.setItem('date', sekundenZahl)
  }

  function initValues() {
    localStorage.setItem('credits', config.startMoney)
    localStorage.setItem('gehalt', Math.round(config.grundwert * config.ticks * config.faktor))
    localStorage.setItem('maxUnitLimit', dbData.maxKappa[0])
    localStorage.setItem('attack', 0)

    genData.forEach((e, i) => {
      localStorage.setItem(`anzahl_${i}`, 0)
      localStorage.setItem(`stufe_${i}`, 1)
      localStorage.setItem(`kosten_${i}`, initCosts[i])
      localStorage.setItem(`energie_${i}`, initEnergie[i])
    })

    initRessource.forEach((e, i) => {
      localStorage.setItem(`roh_${i}`, 0)
      localStorage.setItem(`stock_${i}`, config.stock)
      localStorage.setItem(`varFaktor_${i}`, config.varFaktor)
    })

    localStorage.setItem('initialValues', true)
  }
  initDate()
  initValues()
}

function firstInitiation() {
  const initValue = localStorage.getItem('initialValues')
  if (initValue) {
    return
  } else {
    initFunction(dbData)
  }
}

firstInitiation()
