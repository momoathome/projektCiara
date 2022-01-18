const structure = JSON.parse(localStorage.getItem('structures'))
const units = JSON.parse(localStorage.getItem('units'))
const ressource = JSON.parse(localStorage.getItem('ressources'))

const createUnitModule = () => {
  // tableBody
  function createTableBody() {
    const tbody = document.querySelector('.table__body--unit')
    units.forEach((unit) => {
      const tr = document.createElement('tr')
      const combat = unit.combat
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const cargo = unit.cargo
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const quantity = unit.quantity
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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
      const energie = structure.energie
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const cost = structure.cost.credits
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const level = structure.level
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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
      const stock = roh.stock
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const quantity = roh.quantity
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

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
