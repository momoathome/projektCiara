import dbData from '../helper/getData.js'
import {anzahlCheck} from '../helper/checkFunction.js'
import {writeValueToTable} from '../structures/structureUpdate.js'
import config from '../config.js'

const createUnitModule = data => {
  const tableBody = document.querySelector('.unitTable')
  // Table creation
  data.units.forEach((unit, i) => {
    const row = document.createElement('tr')
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
    row.innerHTML = tableData
    tableBody.appendChild(row)
  })

  anzahlCheck()
}

const createStationModule = data => {
  // Table creation
  data.structure.forEach((value, index) => {
    if (value.type == 'consumer') {
      createStationTableHome(value, index, 'cons')
    } else if (value.type == 'producer') {
      createStationTableHome(value, index, 'prod')
    }
  })

  writeValueToTable()
}

function createStationTableHome(data, index, table) {
  const consumerTable = document.querySelector('.consumerTableHome')
  const producerTable = document.querySelector('.producerTableHome')

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
      <td class="stufenValue stufe_${index}"></td>
    </tr>
    `
  row.innerHTML = tableData
  if (table === 'cons') {
    consumerTable.appendChild(row)
  } else producerTable.appendChild(row)
}

function createMarketModule(data) {
  const tableBody = document.querySelector('.tradeTable')

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
createMarketModule(dbData)
createUnitModule(dbData)
createStationModule(dbData)
