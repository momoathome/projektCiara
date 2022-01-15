import {addEventListenerFleet} from '../helper/eventListener.js'

const createTableFleet = (data) => {
  const formLeft = document.querySelector('.form__div--left')
  const formRight = document.querySelector('.form__div--right')

  data.forEach((unit, i) => {
    const row = document.createElement('div')
    const row2 = document.createElement('div')
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
        class="inputField"
      />
      `
    const formRightData =
      /* html */
      `
      <p class="farm-para">
        <span class="clickableValue maxUnitfarm_${i}"></span>
        cargo:
        <span class="unitCargo_${i}">0</span>
      </p>
      `
    row.innerHTML = formLeftData
    row2.innerHTML = formRightData
    formLeft.appendChild(row)
    formRight.appendChild(row2)
  })

  addEventListenerFleet()
}

export {createTableFleet}
