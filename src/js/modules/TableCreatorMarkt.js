import * as marktUpdate from '../market/marktUpdate.js'
const table = document.querySelector('.table__market')

const createTable = data => {
  const tableHead =
    /* html */
    `
  <tr>
    <th>Ressource</th>
    <th>Stock</th>
    <th>Value</th>
    <th>trade</th>
  </tr>
  `
  const tableFoot =
    /* html */
    `
  <tfoot>
    <tr>
      <td class="tfoot__td--total-cost" colspan="2">
        Total value:
        <span class="span__total-cost color-light"></span>
      </td>
      <td colspan="2">
        <div class="div__trade-button">
          <button id="buyButton" class="btn__trade">buy</button>
          <button id="sellButton" class="btn__trade">sell</button>
        </div>
      </td>
    </tr>
  </tfoot>
  `
  const tableHeadElement = document.createElement('thead')
  const tableBodyElement = document.createElement('tbody')
  const tableFootElement = document.createElement('tfoot')
  tableBodyElement.classList.add('table__body--market')
  tableHeadElement.innerHTML = tableHead
  tableFootElement.innerHTML = tableFoot
  table.append(tableHeadElement, tableBodyElement, tableFootElement)

  function createTableBody() {
    const tableBody = document.querySelector('.table__body--market')
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
        <span class="maxValue_${i} clickableValue">(0)</span>
      </td>
      `
      row.innerHTML = tableData
      tableBody.appendChild(row)
    })
  }

  createTableBody()
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
  const marktForm = document.querySelector('.form__market')
  marktForm.addEventListener('submit', event => {
    if (event.submitter.id === 'buyButton') {
      marktUpdate.formSubmit(event, 'buy')
    } else marktUpdate.formSubmit(event, 'sell')
  })
}
export {createTable}
