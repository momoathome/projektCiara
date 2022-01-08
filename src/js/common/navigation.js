const createNavigation = () => {
  const gameName = 'Projekt Ciara'
  const navDiv = document.querySelector('#navigation')
  const uList = document.createElement('ul')
  const gameNameDiv = document.querySelector('#game-name')

  const navigation =
    /* html */
    `
    <li><a href="./overview.html">overview</a></li>
    <li><a href="./units.html">hangar</a></li>
    <li><a href="./structures.html">modules</a></li>
    <li><a href="./markt.html">market</a></li>
    <li><a href="#">#Research#</a></li>
    <li><a href="./farm.html">asteroids</a></li>
    <li><a href="#">#Ranking#</a></li>
    `
  uList.innerHTML = navigation
  navDiv.appendChild(uList)
  gameNameDiv.innerText = gameName
}

export {createNavigation}
