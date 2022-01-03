const createNavigation = () => {
  const gameName = 'Projekt Ciara'
  const navDiv = document.querySelector('#navigation')
  const uList = document.createElement('ul')
  const gameNameDiv = document.querySelector('#game-name')

  const navigation =
    /* html */
    `
    <li><a href="/">Home</a></li>
    <li><a href="../sites/units.html">Hangar</a></li>
    <li><a href="../sites/station.html">Station</a></li>
    <li><a href="#">#Forschung#</a></li>
    <li><a href="../sites/markt.html">Markt</a></li>
    <li><a href="../sites/farm.html">Asteroiden</a></li>
    <li><a href="#">#Ranking#</a></li>
    `
  uList.innerHTML = navigation
  navDiv.appendChild(uList)
  gameNameDiv.innerText = gameName
}

export {createNavigation}
