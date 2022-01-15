const units = JSON.parse(localStorage.getItem('units'))
const res = JSON.parse(localStorage.getItem('ressources'))

function combatCheck() {
  const a = localStorage.getItem('combat')
  const b = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector('#combat').innerHTML = b
}

function rohstoffCheck() {
  const rohSpan = document.querySelectorAll('.rohValueSpan')

  rohSpan.forEach((span, i) => {
    span.innerText = res[i].quantity
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  })
}

function unitLimitCheck() {
  const currentUnits = units.reduce((acc, unit) => acc + unit.quantity, 0)
  document.querySelector('#currentUnits').innerText = currentUnits
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  const unitLimit = localStorage.getItem('unitLimit')
  document.querySelector('#unitLimit').innerText = unitLimit
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export {combatCheck, rohstoffCheck, unitLimitCheck}
