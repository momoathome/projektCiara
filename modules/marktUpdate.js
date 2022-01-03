function InputListenerValueUpdater(i) {
  const tradeInfoText = document.querySelectorAll('.tradeInfoWarn')
  let inputValue = parseInt(document.querySelector(`#input_value_${i}`).value)
  let StorageRoh = localStorage.getItem(`roh_${i}`)

  if (inputValue < 0 || inputValue == '' || isNaN(inputValue)) {
    document.querySelector(`#input_value_${i}`).value = ''
    inputValue = 0
  } //else if inputValue > StorageRoh
  // document.querySelector(`#input_value_${i}`).value = StorageRoh

  /* else if (inputValue > parseInt(anzahl[i] + inputArray[i])) {
    document.querySelector(`#unit_${i}`).value = parseInt(anzahl[i] + inputArray[i])
  } */

  if (inputValue == 0) {
    hideText(tradeInfoText[i])
  } else if (inputValue < 100) {
    showText(tradeInfoText[i])
  } else hideText(tradeInfoText[i])

  //anzahl[i] = storageAnzahl[i] - document.querySelector(`#input_value_${i}`).value
  //updater(i)
  //inputArray[i] = parseInt(document.querySelector(`#input_value_${i}`).value)
}

function showText(element) {
  if (element.style.visibility === 'visible') {
    return
  } else {
    element.style.visibility = 'visible'
    element.style.opacity = 1
  }
}

function hideText(element) {
  if (element.style.visibility === 'hidden') {
    return
  } else {
    element.style.visibility = 'hidden'
    element.style.opacity = 0
  }
}

export {InputListenerValueUpdater}
