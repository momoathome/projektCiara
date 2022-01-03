import dbData from '../modules/getData.js'
import {anzahlCheck} from '../modules/checkFunction.js'
import {writeValueToTable} from '../modules/stationUpdate.js'

const reducer = (accumulator, currentValue) => accumulator + currentValue
const createUnitModule = data => {
  const tableBody = document.querySelector('.unitTable')
  // Table creation
  data.units.forEach((unit, i) => {
    const row = document.createElement('tr')
    const combat = unit.combat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    const capacity = unit.capacity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    const tableData =
      /* html */
      `
      <td>${unit.name}</td>
      <td>${combat}</td>
      <td>${capacity}</td>
      <td id="unit_${i}"></td>
      <td id="maxUnit_${i}"></td>
      `
    row.innerHTML = tableData
    tableBody.appendChild(row)
  })

  anzahlCheck()
  maxUnitHome()
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

function maxUnitHome() {
  let currentAnzahl = []
  const anzahl = []
  const kosten = []
  const maxKappa = []
  const s = parseInt(localStorage.getItem('stufe_4') - 1)
  const geld = parseInt(localStorage.getItem('credits'))
  dbData.maxKappa.forEach(cap => {
    maxKappa.push(cap)
  })

  dbData.units.forEach((unit, i) => {
    let current = localStorage.getItem(`anzahl_${i}`)
    if (isNaN(current) || current == 0 || current == undefined) {
      current = 0
    }
    currentAnzahl.push(parseInt(current))
    const maxAnzahlKappa = currentAnzahl.reduce(reducer)
    kosten.push(unit.credits)

    if (maxAnzahlKappa >= maxKappa[s]) {
      anzahl[i] = 0
      document.querySelector(`#maxUnit_${i}`).innerHTML = `(${anzahl[i]})`
      return
    } else {
      anzahl[i] = Math.floor(geld / kosten[i])
      if (anzahl[i] >= maxKappa[s]) {
        anzahl[i] = maxKappa[s] - maxAnzahlKappa
      }
    }
    let anzahlString = anzahl[i].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    if (anzahlString == 'NaN') {
      anzahlString = 0
    }
    const maxUnit = document.querySelector(`#maxUnit_${i}`)
    maxUnit.innerHTML = anzahlString
  })
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

createUnitModule(dbData)
createStationModule(dbData)
export {maxUnitHome}
