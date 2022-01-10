import dbData from '../helper/getData.js'
import {anzahlCheck} from '../helper/checkFunction.js'
import {writeValueToTable} from '../structures/structureUpdate.js'
import config from '../config.js'

const headings = ['Hangar', 'Modules', 'Market', 'Research']
const mainContainer = document.querySelector('.container__overview')

const createUnitModule = data => {
  const tableHead =
    /* html */
    `
    <tr>
      <th>Unit</th>
      <th>Combat</th>
      <th>Capacity</th>
      <th>Quantity</th>
    </tr>
  `
  function appendChildNodes() {
    const cluster = document.createElement('div')
    const link = document.createElement('a')
    const heading = document.createElement('h3')
    const table = document.createElement('table')
    const tableHeadElement = document.createElement('thead')
    const tableBodyElement = document.createElement('tbody')

    cluster.classList.add('container__unit')
    tableBodyElement.classList.add('table__body--unit')
    link.href = './units.html'
    heading.innerText = headings[0]
    tableHeadElement.innerHTML = tableHead

    table.append(tableHeadElement)
    table.append(tableBodyElement)
    link.append(heading)
    link.append(table)
    cluster.append(link)
    mainContainer.append(cluster)
  }

  // tableBody
  function createTableBody() {
    const tbody = document.querySelector('.table__body--unit')

    data.units.forEach((unit, i) => {
      const tr = document.createElement('tr')
      const combat = unit.combat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const cargo = unit.cargo.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const tableData =
        /* html */
        `
          <td>${unit.name}</td>
          <td>${combat}</td>
          <td>${cargo}</td>
          <td id="unit_cargo_${i}"></td>
        `
      tr.innerHTML = tableData
      tbody.appendChild(tr)
    })
  }

  appendChildNodes()
  createTableBody()
  anzahlCheck()
}

const createStationModule = data => {
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

  function appendChildNodes() {
    const cluster = document.createElement('div')
    const link = document.createElement('a')
    const heading = document.createElement('h3')
    const table = document.createElement('table')
    const tableHeadElement = document.createElement('thead')
    const tableBodyElement = document.createElement('tbody')

    cluster.classList.add('container__structure')
    tableBodyElement.classList.add('table__body--structure')
    link.href = './structures.html'
    heading.innerText = headings[1]
    tableHeadElement.innerHTML = tableHead

    table.append(tableHeadElement)
    table.append(tableBodyElement)
    link.append(heading)
    link.append(table)
    cluster.append(link)
    mainContainer.append(cluster)
  }

  function createTableBody() {
    const tbody = document.querySelector('.table__body--structure')

    data.structure.forEach((structure, i) => {
      const row = document.createElement('tr')
      const energie = structure.energie.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      //const credits = genData[i].cost.credits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      const tableData =
        /* html */
        `
          <td>${structure.name}</td>
          <td>${energie}<span class="font">E</span></td>
          <td class="kostenValue"><span class="font">C</span></td>
          <td class="stufenValue stufe_${i}"></td>
        `
      row.innerHTML = tableData
      tbody.appendChild(row)
    })
  }

  appendChildNodes()
  createTableBody()
  writeValueToTable()
}

function createMarketModule(data) {
  const tableHead =
    /* html */
    `
    <tr>
      <th>Ressource</th>
      <th>Stock</th>
      <th>Value</th>
      <th>Available</th>
    </tr>
    `

  function appendChildNodes() {
    const cluster = document.createElement('div')
    const link = document.createElement('a')
    const heading = document.createElement('h3')
    const table = document.createElement('table')
    const tableHeadElement = document.createElement('thead')
    const tableBodyElement = document.createElement('tbody')

    cluster.classList.add('container__market')
    tableBodyElement.classList.add('table__body--market')
    link.href = './markt.html'
    heading.innerText = headings[2]
    tableHeadElement.innerHTML = tableHead

    table.append(tableHeadElement, tableBodyElement)
    link.append(heading, table)
    cluster.append(link)
    mainContainer.append(cluster)
  }

  function createTableBody() {
    const tableBody = document.querySelector('.table__body--market')
    data.ressources.forEach((roh, i) => {
      const row = document.createElement('tr')

      const tableData =
        /* html */
        `
        <td>${roh.name}</td>
        <td class="stockTd"></td>
        <td class="valueTd"></td>
        <td class="maxValue_${i}"></td>
        `
      row.innerHTML = tableData
      tableBody.appendChild(row)
    })
  }

  appendChildNodes()
  createTableBody()
  updateMarketModuleData(data)
}

function updateMarketModuleData(data) {
  const maxRoh = []
  const currentStock = []
  const varFaktor = []
  const price = []

  function maxRessource() {
    data.ressources.forEach((res, i) => {
      maxRoh[i] = localStorage.getItem(`roh_${i}`)
      let maxValueSpan = document.querySelector(`.maxValue_${i}`)
      maxValueSpan.innerText = maxRoh[i]
    })
    getMarketData()
    updateStock()
    updateValue()
  }
  function getMarketData() {
    data.ressources.forEach((res, i) => {
      currentStock[i] = parseInt(localStorage.getItem(`stock_${i}`))
      varFaktor[i] = parseFloat(localStorage.getItem(`varFaktor_${i}`))
      price[i] = Math.round(config.basePrice[i] + (varFaktor[i] - config.varFaktor))
    })
  }
  function updateStock() {
    const stockTd = document.querySelectorAll('.stockTd')
    stockTd.forEach((element, i) => {
      let stock = currentStock[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      element.innerText = stock + 't'
    })
  }

  function updateValue() {
    const valueTd = document.querySelectorAll('.valueTd')
    valueTd.forEach((element, i) => {
      let value = price[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      element.innerHTML = `${value}<span class="font">C</span>`
    })
  }
  maxRessource()
}

createUnitModule(dbData)
createStationModule(dbData)
createMarketModule(dbData)
