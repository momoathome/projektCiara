const producerTable = document.querySelector('.table__body--producer')
const consumerTable = document.querySelector('.table__body--consumer')
const table = document.querySelectorAll('.table__structures')
import * as stationUpdate from '../structures/structureUpdate.js'

const createTableMain = (data) => {
  const tableHead =
    /* html */
    `
    <tr>
      <th>Module</th>
      <th>Energy</th>
      <th>Cost</th>
      <th>Tier</th>
    </tr>
  `
  const tableHeadElement = document.createElement('thead')
  const tableHeadElement2 = document.createElement('thead')
  tableHeadElement.innerHTML = tableHead
  tableHeadElement2.innerHTML = tableHead
  table[0].append(tableHeadElement)
  table[1].append(tableHeadElement2)

  // Table creation
  data.structures.forEach((value, index) => {
    if (value.type === 'consumer') {
      createTable(value, index, 'cons')
    } else if (value.type === 'producer') {
      createTable(value, index, 'prod')
    }
  })

  stationUpdate.writeValueToTable()
  addEventlistenerStructureUpgrade()
}

const createTable = (data, index, table) => {
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
      <td class="kostenValue"><span class="font">C</span></td>
      <td class="color-light stufenValue stufe_${index}"></td>
      <td class="tableButton"><button class="btn__upgrade upgrade_${index}">[+]</button></td>
    </tr>
    `
  row.innerHTML = tableData
  if (table === 'cons') {
    consumerTable.append(row)
  } else producerTable.append(row)
}

const addEventlistenerStructureUpgrade = () => {
  const upgradeButton = document.querySelectorAll('.btn__upgrade')
  upgradeButton.forEach((button, i) => {
    button.addEventListener('click', () => {
      stationUpdate.upgradeFunction(i)
    })
  })
}

export {createTableMain}
