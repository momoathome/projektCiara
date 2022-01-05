import * as marktUpdate from './marktUpdate.js'

const createTable = data => {
  const tableBody = document.querySelector('.tradeTable')

  data.ressources.forEach((roh, i) => {
    const row = document.createElement('tr')

    const tableData =
      /* html */
      `
    <td>${roh.name}</td>
    <td class="stockTd"></td>
    <td class="valueTd"></td>
    <td>
      <input
        type="number"
        id="input_value_${i}"
        class="tradeInputField"
        min="0"
        max="100000"
      />
      <span id="maxValue_${i}" class="clickableValue">(0)</span>
        <span class="tradeInfoWrapper">
        <span class="tradeInfoWarn"><span class="tradeInfoBlink">i</span>
        <span class="tradeInfoText">minimum: 100t</span>
        </span>
      </span>
    </td>
    `
    row.innerHTML = tableData
    tableBody.appendChild(row)
  })
  marktUpdate.maxRessource()
  addEventlistenerValueUpdater()
  addEventListenerMarktSubmit()
}

const addEventlistenerValueUpdater = () => {
  const inputFields = document.querySelectorAll('.tradeInputField')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      marktUpdate.InputListenerValueUpdater(i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      marktUpdate.clickEventListenerValueUpdater(i)
    })
  })
}

const addEventListenerMarktSubmit = () => {
  const marktForm = document.querySelector('.markt-form')
  marktForm.addEventListener('submit', event => {
    if (event.submitter.id === 'buyButton') {
      marktUpdate.formSubmit(event, 'buy')
    } else marktUpdate.formSubmit(event, 'sell')
  })
}
export {createTable}
