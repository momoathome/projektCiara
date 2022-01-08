const producerTable = document.querySelector('.producerTable')
const consumerTable = document.querySelector('.consumerTable')
import * as stationUpdate from '../structures/structureUpdate.js'

const createTableMain = data => {
  // Table creation
  data.structure.forEach((value, index) => {
    if (value.type == 'consumer') {
      createTable(value, index, 'cons')
    } else if (value.type == 'producer') {
      createTable(value, index, 'prod')
    }
  })

  stationUpdate.writeValueToTable()
  addEventlistenerStructureUpgrade()
}

const createTable = (data, index, table) => {
  const row = document.createElement('tr')
  const energie = data.energie.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  //const credits = genData[i].cost.credits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  const tableData =
    /* html */
    `
    <tr>
      <td>${data.name}</td>
      <td>${energie}<span class="font">E</span></td>
      <td class="kostenValue"><span class="font">C</span></td>
      <td class="color-light stufenValue stufe_${index}"></td>
      <td class="tableButton"><button class="upgradeButton upgrade_${index}">[+]</button></td>
    </tr>
    `

  row.innerHTML = tableData
  if (table === 'cons') {
    consumerTable.appendChild(row)
  } else producerTable.appendChild(row)
}

const addEventlistenerStructureUpgrade = () => {
  const upgradeButton = document.querySelectorAll('.upgradeButton')
  upgradeButton.forEach((button, i) => {
    button.addEventListener('click', () => {
      stationUpdate.upgradeFunction(i)
    })
  })
}

export {createTableMain}
