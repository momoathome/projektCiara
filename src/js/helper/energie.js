const wert = document.getElementById('energieWert').innerHTML
const wertStyle = document.getElementById('energieWert')

const newWert = parseInt(wert)
if (newWert > 0) {
  wertStyle.style.color = 'green'
} else {
  wertStyle.style.color = 'darkred'
}
