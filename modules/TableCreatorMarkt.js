import * as marktUpdate from './marktUpdate.js'
import config from '../config.js'

const createTable = data => {
  const tableBody = document.querySelector('.tradeTable')
  // in marktUpdate verschieben
  const value = []
  let titanValue = (config.stock * config.titanFaktor) / config.varFaktor
  let carbonValue = (config.stock * config.carbonFaktor) / config.varFaktor
  let kristalValue = (config.stock * config.kristalFaktor) / config.varFaktor
  let hydroValue = (config.stock * config.hydrogeniumFaktor) / config.varFaktor
  value.push(titanValue, carbonValue, kristalValue, hydroValue)
  // ---------------------------------------------------------

  data.ressources.forEach((roh, i) => {
    const row = document.createElement('tr')
    // in marktUpdate verschieben
    let stock = config.stock.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    let val = value[i]
      .toFixed(2)
      .toString()
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    // ---------------------------------------------------

    const tableData =
      /* html */
      `
    <td>${roh.name}</td>
    <td>${stock}<span>t</span></td>
    <td>${val}<span class="font">C</span></td>
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
        <span class="tradeInfoWarn"><i class="fas fa-info tradeInfoBlink"></i>
        <span class="tradeInfoText">minimum: 100t</span>
        </span>
      </span>
    </td>
    `
    row.innerHTML = tableData
    tableBody.appendChild(row)
  })
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
