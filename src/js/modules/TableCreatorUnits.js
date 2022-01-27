import {addEventlistenerUnits} from '../helper/eventListener.js'
import {valToString} from '../helper/updateHelper.js'

const tableBody = document.querySelector('.table__body--unit')

const createTable = (data) => {
  // Table creation
  data.forEach((unit, i) => {
    const row = document.createElement('tr')
    const credits = valToString(unit.cost)
    const combat = valToString(unit.combat)
    const cargo = valToString(unit.cargo)
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
          class="inputField"
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
