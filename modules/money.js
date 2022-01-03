import config from '../config.js'
// aktuelle sekunden
function ticken() {
  var today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth()
  let day = today.getDate()
  let hour = today.getHours()
  let min = today.getMinutes()
  let sec = today.getSeconds()

  let sekundenZahl = sec + min * 60 + hour * 60 * 60 + day * 24 * 60 * 60 + month * 30 * 24 * 60 * 60 + year * 12 * 30 * 60 * 60
  return sekundenZahl
}

// geld berechnen wenn ticks abgelaufen sind
function geldBerechnung() {
  let tick = ticken()
  let storagedate = parseInt(localStorage.getItem('date'))
  if (isNaN(storagedate)) {
    storagedate = localStorage.setItem('date', localStorage.getItem('startdate'))
  } else {
    storagedate = storagedate
  }

  let y = tick - storagedate
  if (y < config.ticks) {
    window.setTimeout(() => {
      geldBerechnung()
    }, 5000)
    return
  } else {
    let geld = parseInt(localStorage.getItem('credits'))
    if (isNaN(geld)) {
      localStorage.setItem('credits', config.startMoney)
      geld = config.startMoney
    }
    let zeitMultiplikator = Math.floor(y / config.ticks)
    let gehaltMultiplikator = localStorage.getItem('stufe_2')

    //marktstufe(aus der Datenbank) * credits pro sekunde (multipliziert mit dem level der Kampferfahrung) * ticks (weil alle ticks sekunden aktualisiert wird)
    let gehalt = zeitMultiplikator * (gehaltMultiplikator * Math.round(config.grundwert * config.ticks * config.faktor))
    geld = geld + gehalt
    localStorage.setItem('credits', geld)
    localStorage.setItem('gehalt', gehalt)

    geldCheck()
    localStorage.setItem('date', tick)
  }
  window.setTimeout(() => {
    geldBerechnung()
  }, 30000)
}

function geldCheck() {
  let gehalt = localStorage.getItem('gehalt')
  gehalt = gehalt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  let credits = localStorage.getItem('credits')
  credits = credits.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.getElementById('credits').innerHTML =
    credits + '<span class="font">C</span>' + `<span style="color:#00ff00;">  (+${gehalt})</span>`
}
export {geldCheck, geldBerechnung}
