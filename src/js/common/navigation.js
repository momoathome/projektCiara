const gameName = 'Projekt Ciara'

const createNavigation = () => {
  const nav = document.querySelector('.nav')
  const navDiv = document.createElement('div')

  const navLogo =
    /* html */
    `
      <p class="nav__logo">${gameName}</p>
      `

  const navElements =
    /* html */
    `
    <ul class="nav__list">
    <li><a href="./overview.html">overview</a></li>
    <li><a href="./units.html">hangar</a></li>
    <li><a href="./structures.html">modules</a></li>
    <li><a href="./markt.html">market</a></li>
    <li><a href="#">#Research#</a></li>
    <li><a href="./farm.html">asteroids</a></li>
    <li><a href="#">#Ranking#</a></li>
    </ul>
    `
  navDiv.classList.add('nav__flex-container')
  navDiv.innerHTML = navLogo + navElements
  nav.appendChild(navDiv)
}

export {createNavigation}
