import config from '../config.js'
const data = JSON.parse(localStorage.getItem('structures'))

// aktuelle sekunden
function ticken() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  const hour = today.getHours()
  const min = today.getMinutes()
  const sec = today.getSeconds()

  const sekundenZahl =
    sec +
    min * 60 +
    hour * 60 * 60 +
    day * 24 * 60 * 60 +
    month * 30 * 24 * 60 * 60 +
    year * 12 * 30 * 60 * 60
  return sekundenZahl
}

// geld berechnen wenn ticks abgelaufen sind
function geldBerechnung() {
  const tick = ticken()
  const storagedate = localStorage.getItem('date')
  const ticks = tick - parseInt(storagedate)

  if (ticks < config.ticks) {
    creditCheck()
    window.setTimeout(() => {
      geldBerechnung()
    }, 5000)
    return
  }
  let credits = parseInt(localStorage.getItem('credits'))
  const timeMultiplier = Math.floor(ticks / config.ticks)
  const wageMultiplier = data[2].level

  // marktstufe(aus der Datenbank) * credits pro sekunde (multipliziert mit dem level der Kampferfahrung) * ticks (weil alle ticks sekunden aktualisiert wird)
  const wage =
    timeMultiplier *
    (wageMultiplier *
      Math.round(config.baseWage * config.ticks * config.faktor))

  credits += wage
  localStorage.setItem('date', tick)
  localStorage.setItem('credits', credits)
  localStorage.setItem('wage', wage)
  creditCheck()
  window.setTimeout(() => {
    geldBerechnung()
  }, 30_000)
}

function creditCheck() {
  let wage = localStorage.getItem('wage')
  wage = wage.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  let credits = localStorage.getItem('credits')
  credits = credits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.getElementById(
    'credits'
  ).innerHTML = `${credits}<span class="font">C </span><span style="color:#00ff00;">  (+${wage})</span> `
}
export {creditCheck, geldBerechnung}
