const reducer = (accumulator, currentValue) => accumulator + currentValue

function totalValueUpdate(data) {
  const cost = inputValueCost(data)
  if (cost === 0) {
    return
  }
  document.querySelector('.span__total-value').innerHTML =
    cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C</span>'
}

function totalUnitUpdate(data) {
  const units = getInputValues()
  const totalCombatTd = document.querySelector('.tfoot__td--total-combat')
  const totalCostTd = document.querySelector('.tfoot__td--total-cost')
  const totalCargoTd = document.querySelector('.tfoot__td--total-cargo')

  let cost = inputValueCost(data)
  let combat = units.map((val, i) => val * data[i].combat).reduce(reducer)
  let cargo = units.map((val, i) => val * data[i].cargo).reduce(reducer)
  if (cost === 0 || combat === 0 || cargo === 0) {
    return clearTotalValue()
  }

  combat = combat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  cost =
    cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C </span>'
  cargo = cargo.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  totalCombatTd.innerHTML = `${combat}`
  totalCostTd.innerHTML = `${cost}`
  totalCargoTd.innerHTML = `${cargo}`

  function clearTotalValue() {
    totalCombatTd.innerHTML = ''
    totalCostTd.innerHTML = ''
    totalCargoTd.innerHTML = ''
  }
}

function inputValueCost(data) {
  const cost = getInputValues()
    .map((val, i) => val * data[i].cost)
    .reduce(reducer)

  return cost
}

function getInputValues() {
  const input = document.querySelectorAll('.inputField')
  const totalValues = []
  input.forEach((value) => {
    value = value.valueAsNumber
    if (isNaN(value)) {
      value = 0
    }
    totalValues.push(value)
  })
  return totalValues
}

function inputValueNormNumber(inputField) {
  inputField.value = Math.round(inputField.valueAsNumber)

  if (
    inputField.value <= 0 ||
    inputField.value == '' ||
    isNaN(inputField.value)
  ) {
    inputField.value = ''
  }
}

function inputFieldClear() {
  const inputFields = document.querySelectorAll('.inputField')
  inputFields.forEach((input) => {
    input.value = ''
  })
}

export {
  totalValueUpdate,
  totalUnitUpdate,
  inputValueCost,
  getInputValues,
  inputValueNormNumber,
  inputFieldClear,
}
