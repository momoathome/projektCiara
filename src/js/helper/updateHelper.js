const reducer = (accumulator, currentValue) => accumulator + currentValue

function totalValueUpdate(data) {
  const cost = inputValueCost(data)
  document.querySelector('.span__total-value').innerHTML =
    cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') +
    '<span class="font">C</span>'
}

function inputValueCost(data) {
  const cost = getInputValues()
    .map((unit, i) => unit * data[i].cost)
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
  inputValueCost,
  getInputValues,
  inputValueNormNumber,
  inputFieldClear,
}
