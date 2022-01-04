import * as marktUpdate from './marktUpdate.js'
import config from '../config.js'

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
        class="tradeUnit"
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
}

const addEventlistenerValueUpdater = () => {
  const inputFields = document.querySelectorAll('.tradeUnit')
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

export {createTable}
