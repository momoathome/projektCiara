import {addEventlistenerStructure} from '../helper/eventListener.js'

const producerTable = document.querySelector('.table__body--producer')
const consumerTable = document.querySelector('.table__body--consumer')

const createTable = (data) => {
  // Table creation
  data.forEach((value, index) => {
    if (value.type === 'consumer') {
      createTableBody(value, index, 'cons')
    } else if (value.type === 'producer') {
      createTableBody(value, index, 'prod')
    }
  })

  addEventlistenerStructure()
}

const createTableBody = (data, index, table) => {
  const row = document.createElement('tr')
  const energie = data.energie
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  const tableData =
    /* html */
    `
    <tr>
      <td>${data.name}</td>
      <td>${energie}<span class="font">E</span></td>
      <td class="structure__cost"><span class="font">C</span></td>
      <td class="color-light structure__level"></td>
      <td class="td__btn-holder"><button class="btn__upgrade"></button></td>
    </tr>
    `
  row.innerHTML = tableData
  if (table === 'cons') {
    consumerTable.append(row)
  } else producerTable.append(row)
}

export {createTable}
