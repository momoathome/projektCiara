import * as unitUpdate from '../units/unitUpdate.js'
import {anzahlCheck} from '../helper/checkFunction.js'

const createTable = data => {
  const tableBody = document.querySelector('.unitTable')
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
    tableBody.appendChild(row)
  })

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
  const UnitForm = document.querySelector('#form-unit')
  UnitForm.addEventListener('submit', event => {
    unitUpdate.formSubmit(event)
  })
}

export {createTable}
