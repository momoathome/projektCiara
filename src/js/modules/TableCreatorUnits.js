import * as unitUpdate from '../units/unitUpdate.js'
import {anzahlCheck} from '../helper/checkFunction.js'
const table = document.querySelector('.table__units')

const createTable = data => {
  const tableHead =
    /* html */
    `
    <tr>
      <th>Unit</th>
      <th>Combat</th>
      <th>Cost</th>
      <th>Cargo</th>
      <th>Quantity</th>
      <th>Recruit</th>
    </tr>
    `
  const tableFoot =
    /* html */
    `
    <tr>
      <td class="tfoot__td--total-cost" colspan="4">
      Total cost:
        <span class="span__total-cost color-light"></span>
      </td>
      <td class="tfoot__td--btn-submit" colspan="2">
        <button class="btn__submit" id="rekrutieren">submit</button>
      </td>
    </tr>
      `

  function appendChildNodes() {
    const tableHeadElement = document.createElement('thead')
    const tableBodyElement = document.createElement('tbody')
    const tableFootElement = document.createElement('tfoot')
    tableBodyElement.classList.add('table__body--unit')
    tableHeadElement.innerHTML = tableHead
    tableFootElement.innerHTML = tableFoot

    table.append(tableHeadElement)
    table.append(tableBodyElement)
    table.append(tableFootElement)
  }

  function createTableBody() {
    const tableBody = document.querySelector('.table__body--unit')
    // Table creation
    data.units.forEach((unit, i) => {
      const row = document.createElement('tr')
      const credits = unit.credits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const combat = unit.combat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const cargo = unit.cargo.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const tableData =
        /* html */
        `
      <td>${unit.name}</td>
      <td>${combat}</td>
      <td>${credits}<span class="font">C</span></td>
      <td>${cargo}</td>
      <td class="color-light" id="unit_cargo_${i}"></td>
      <td>
        <input
          type="number"
          id="unit_${i}"
          class="recrutUnit"
          min="0"
          max="100000"
        />
        <span id="maxUnit_${i}" class="clickableValue"></span>
      </td>
      `
      row.innerHTML = tableData
      tableBody.append(row)
    })
  }

  appendChildNodes()
  createTableBody()
  addEventlistenerValueUpdater()
  addEventListenerUnitSubmit()
  anzahlCheck()
  unitUpdate.maxUnit()
}

const addEventlistenerValueUpdater = () => {
  const inputFields = document.querySelectorAll('.recrutUnit')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      unitUpdate.InputListenerValueUpdater(i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      unitUpdate.clickEventListenerValueUpdater(i)
    })
  })
}

const addEventListenerUnitSubmit = () => {
  const UnitForm = document.querySelector('.form__unit')
  UnitForm.addEventListener('submit', event => {
    unitUpdate.formSubmit(event)
  })
}

export {createTable}
