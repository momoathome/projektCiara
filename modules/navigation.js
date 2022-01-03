const createNavigation = () => {
  const gameName = 'Projekt Ciara'
  const navDiv = document.querySelector('#navigation')
  const uList = document.createElement('ul')
  const gameNameDiv = document.querySelector('#game-name')

  const navigation =
    /* html */
    `
    <li><a href="/">overview</a></li>
    <li><a href="../sites/units.html">hangar</a></li>
    <li><a href="../sites/station.html">modules</a></li>
    <li><a href="../sites/markt.html">market</a></li>
    <li><a href="#">#Research#</a></li>
    <li><a href="../sites/farm.html">asteroids</a></li>
    <li><a href="#">#Ranking#</a></li>
    `
  uList.innerHTML = navigation
  navDiv.appendChild(uList)
  gameNameDiv.innerText = gameName
}

export {createNavigation}
