import {maxUnitCalc, formSubmit, InputListenerValueUpdater, clickEventListenerAnzahlUpdater} from '../farm/farmUpdate.js'

const createTableFleet = data => {
  const formLeft = document.querySelector('.form__div--left')
  const formRight = document.querySelector('.form__div--right')

  data.units.forEach((unit, i) => {
    const row = document.createElement('div')
    row.classList.add('form__input-group')

    const formLeftData =
      /* html */
      `
      <label for="unit_${i}">${unit.name}</label>
      <input
        type="number"
        min="0"
        max="100000"
        id="unit_${i}"
        class="form__input"
      />
      `
    row.innerHTML = formLeftData
    formLeft.appendChild(row)
  })

  data.units.forEach((unit, i) => {
    const row = document.createElement('div')

    const formRightData =
      /* html */
      `
      <p class="farm-para">
        <span class="clickableValue maxUnitfarm_${i}"></span>
        cargo:
        <span class="unitCargo_${i}">0</span>
      </p>
      `
    row.innerHTML = formRightData
    formRight.appendChild(row)
  })

  maxUnitCalc()
  addEventlistenerInputFieldUpdater()
  addEventListenerFarmSubmit()
}

const addEventlistenerInputFieldUpdater = () => {
  const inputFields = document.querySelectorAll('.form__input')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      InputListenerValueUpdater(i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      clickEventListenerAnzahlUpdater(i)
    })
  })
}

const addEventListenerFarmSubmit = () => {
  const flottenForm = document.querySelector('.form__farm')
  flottenForm.addEventListener('submit', event => {
    formSubmit(event)
  })
}

export {createTableFleet}
