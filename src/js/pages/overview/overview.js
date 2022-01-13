import {anzahlCheck} from '../../helper/checkFunction.js'
import {writeValueToTable} from '../structures/structureUpdate.js'
import dbData from '../../helper/getData.js'
import config from '../../config.js'

const createUnitModule = (data) => {
  // tableBody
  function createTableBody() {
    const tbody = document.querySelector('.table__body--unit')
    data.units.forEach((unit, i) => {
      const tr = document.createElement('tr')
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
          <td>${cargo}</td>
          <td id="unit_cargo_${i}"></td>
        `
      tr.innerHTML = tableData
      tbody.appendChild(tr)
    })
  }
  createTableBody()
  anzahlCheck()
}

const createStationModule = (data) => {
  function createTableBody() {
    const tbody = document.querySelector('.table__body--structure')

    data.structures.forEach((structure, i) => {
      const row = document.createElement('tr')
      const energie = structure.energie
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      // const credits = genData[i].cost.credits.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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

  createTableBody()
  writeValueToTable()
}

function createMarketModule(data) {
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
      const maxValueSpan = document.querySelector(`.maxValue_${i}`)
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
      price[i] = Math.round(
        config.basePrice[i] + (varFaktor[i] - config.varFaktor)
      )
    })
  }
  function updateStock() {
    const stockTd = document.querySelectorAll('.stockTd')
    stockTd.forEach((element, i) => {
      const stock = currentStock[i]
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      element.innerText = `${stock}t`
    })
  }

  function updateValue() {
    const valueTd = document.querySelectorAll('.valueTd')
    valueTd.forEach((element, i) => {
      const value = price[i]
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      element.innerHTML = `${value}<span class="font">C</span>`
    })
  }
  maxRessource()
}

createUnitModule(dbData)
createStationModule(dbData)
createMarketModule(dbData)
