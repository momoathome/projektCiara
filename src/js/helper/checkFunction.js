const data = JSON.parse(localStorage.getItem('units'))

function combatCheck() {
  const a = localStorage.getItem('combat')
  const b = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  document.querySelector('#combat').innerHTML = b
}

function rohstoffCheck() {
  const rohSpan = document.querySelectorAll('.rohValueSpan')

  rohSpan.forEach((e, i) => {
    const rohstoff = localStorage.getItem(`roh_${i}`)
    e.innerText = rohstoff.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  })
}

function unitLimitCheck() {
  const currentUnits = data.reduce((acc, unit) => acc + unit.quantity, 0)
  document.querySelector('#currentUnits').innerText = currentUnits
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  const unitLimit = localStorage.getItem('unitLimit')
  document.querySelector('#unitLimit').innerText = unitLimit
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export {combatCheck, rohstoffCheck, unitLimitCheck}
