import {
  inputFieldListener,
  clickEventListener,
  formSubmit,
} from '../pages/units/unitUpdate.js'

function addEventlistenerUnits() {
  const inputFields = document.querySelectorAll('.recrutUnit')
  const clickAbleSpan = document.querySelectorAll('.clickableValue')
  const UnitForm = document.querySelector('.form__unit')

  inputFields.forEach((inputField, i) => {
    inputField.addEventListener('input', () => {
      inputFieldListener(inputField, i)
    })
  })
  clickAbleSpan.forEach((span, i) => {
    span.addEventListener('click', () => {
      clickEventListener(i)
    })
  })
  UnitForm.addEventListener('submit', (event) => {
    formSubmit(event)
  })
}
export {addEventlistenerUnits}
