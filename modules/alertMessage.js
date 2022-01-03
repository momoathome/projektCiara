const timer = 2500
export function errorMessage(message) {
  document.querySelector('#output').innerHTML = `<p class="alert"; >${message}</p>`
  setTimeout(() => document.querySelector('.alert').remove(), timer)
}

export function succesMessage(message) {
  document.querySelector('#output').innerHTML = `<p class="succes"; >${message}</p>`
  setTimeout(() => document.querySelector('.succes').remove(), timer)
}
