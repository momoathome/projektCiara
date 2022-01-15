import {addEventlistenerUnits} from '../helper/eventListener.js'

const tableBody = document.querySelector('.table__body--unit')

const createTable = (data) => {
  // Table creation
  data.forEach((unit, i) => {
    const row = document.createElement('tr')
    const credits = unit.cost
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    const combat = unit.combat
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    const cargo = unit.cargo
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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
  addEventlistenerUnits()
}

export {createTable}
