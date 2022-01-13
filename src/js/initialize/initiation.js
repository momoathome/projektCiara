import dbData from '../helper/getData.js'
import config from '../config.js'

function initFunction(data) {
  localStorage.setItem('units', JSON.stringify(data.units))
  localStorage.setItem('structures', JSON.stringify(data.structures))
  localStorage.setItem('ressources', JSON.stringify(data.ressources))
  localStorage.setItem('credits', config.startUpCash)
  localStorage.setItem(
    'wage',
    Math.round(config.baseWage * config.ticks * config.faktor)
  )
  localStorage.setItem('unitLimit', config.unitLimit[0])
  localStorage.setItem('combat', 0)
  localStorage.setItem('initialValues', true)

  // const newObj = JSON.parse(localStorage.getItem('units'))
  // console.log(newObj[0].name)

  function initDate() {
    const startDate = new Date()
    const year = startDate.getFullYear()
    const month = startDate.getMonth()
    const day = startDate.getDate()
    const hour = startDate.getHours()
    const min = startDate.getMinutes()
    const sec = startDate.getSeconds()

    const sekundenZahl =
      sec +
      min * 60 +
      hour * 60 * 60 +
      day * 24 * 60 * 60 +
      month * 30 * 24 * 60 * 60 +
      year * 12 * 30 * 60 * 60

    localStorage.setItem('dateset', true)
    localStorage.setItem('startdate', sekundenZahl)
    localStorage.setItem('date', sekundenZahl)
  }

  initDate()
  initValues()
}

function firstInitiation() {
  const initValue = localStorage.getItem('initialValues')
  if (initValue) return
  initFunction(dbData)
}

firstInitiation()
