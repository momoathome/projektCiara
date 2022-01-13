import config from '../config.js'
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
    geldCheck()
    window.setTimeout(() => {
      geldBerechnung()
    }, 5000)
    return
  }
  let credits = parseInt(localStorage.getItem('credits'))
  const zeitMultiplikator = Math.floor(ticks / config.ticks)
  const gehaltMultiplikator = parseInt(localStorage.getItem('stufe_2'))

  // marktstufe(aus der Datenbank) * credits pro sekunde (multipliziert mit dem level der Kampferfahrung) * ticks (weil alle ticks sekunden aktualisiert wird)
  const gehalt =
    zeitMultiplikator *
    (gehaltMultiplikator *
      Math.round(config.baseWage * config.ticks * config.faktor))

  credits += gehalt
  localStorage.setItem('date', tick)
  localStorage.setItem('credits', credits)
  localStorage.setItem('gehalt', gehalt)
  geldCheck()
  window.setTimeout(() => {
    geldBerechnung()
  }, 30_000)
}

function geldCheck() {
  let gehalt = localStorage.getItem('gehalt')
  gehalt = gehalt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  let credits = localStorage.getItem('credits')
  credits = credits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.getElementById('credits').innerHTML =
    credits +
    '<span class="font">C</span>' +
    `<span style="color:#00ff00;">  (+${gehalt})</span>`
}
export {geldCheck, geldBerechnung}
