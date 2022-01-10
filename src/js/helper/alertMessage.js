const timer = 2500
function showText(element, message, cssClass) {
  if (element.style.visibility === 'visible') {
    return
  } else {
    element.style.visibility = 'visible'
    element.style.opacity = 1
    element.classList.add(cssClass)
  }
  element.innerText = message
}
function hideText(element, cssClass) {
  element.style.visibility = 'hidden'
  element.style.opacity = 0
  element.classList.remove(cssClass)
  element.innerText = ''
}

export function errorMessage(message) {
  let element = document.querySelector('.output')
  showText(element, message, 'alert')
  setTimeout(() => hideText(element, 'alert'), timer)
}

export function succesMessage(message) {
  let element = document.querySelector('.output')
  showText(element, message, 'succes')
  setTimeout(() => hideText(element, 'succes'), timer)
}
