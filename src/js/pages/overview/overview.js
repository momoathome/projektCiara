import {valToString} from '../../helper/updateHelper.js'

const structure = JSON.parse(localStorage.getItem('structures'))
const units = JSON.parse(localStorage.getItem('units'))
const ressource = JSON.parse(localStorage.getItem('ressources'))

const createUnitModule = () => {
  function createTableBody() {
    const tbody = document.querySelector('.table__body--unit')

    units.forEach((unit) => {
      const tr = document.createElement('tr')
      const combat = valToString(unit.combat)
      const cargo = valToString(unit.cargo)
      const quantity = valToString(unit.quantity)
      const tableData =
        /* html */
        `
          <td>${unit.name}</td>
          <td>${combat}</td>
          <td>${cargo}</td>
          <td>${quantity}</td>
        `
      tr.innerHTML = tableData
      tbody.appendChild(tr)
    })
  }
  createTableBody()
}

const createStationModule = () => {
  function createTableBody() {
    const tbody = document.querySelector('.table__body--structure')

    structure.forEach((structure) => {
      const row = document.createElement('tr')
      const energie = valToString(structure.energie)
      const cost = valToString(structure.cost.credits)
      const level = valToString(structure.level)
      const tableData =
        /* html */
        `
          <td>${structure.name}</td>
          <td>${energie}<span class="font">E</span></td>
          <td>${cost}<span class="font">C</span></td>
          <td>${level}</td>
        `
      row.innerHTML = tableData
      tbody.appendChild(row)
    })
  }

  createTableBody()
}

function createMarketModule() {
  function createTableBody() {
    const tableBody = document.querySelector('.table__body--market')

    ressource.forEach((roh) => {
      const row = document.createElement('tr')
      const stock = valToString(roh.stock)
      const quantity = valToString(roh.quantity)

      const tableData =
        /* html */
        `
        <td>${roh.name}</td>
        <td>${stock}t</td>
        <td>${roh.cost}<span class="font">C</span></td>
        <td>${quantity}</td>
        `
      row.innerHTML = tableData
      tableBody.appendChild(row)
    })
  }

  createTableBody()
}

createUnitModule()
createStationModule()
createMarketModule()
