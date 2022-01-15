import {addEventlistenerMarket} from '../helper/eventListener.js'

const tableBody = document.querySelector('.table__body--market')

const createTable = (data) => {
  data.forEach((roh, i) => {
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
          class="inputField"
          min="0"
          max="100000"
        />
        <span class="maxValue_${i} clickableValue">(0)</span>
      </td>
      `
    row.innerHTML = tableData
    tableBody.append(row)
  })

  addEventlistenerMarket()
}

export {createTable}
