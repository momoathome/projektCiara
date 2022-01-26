const gameName = 'Projekt Ciara'

const createNavigation = () => {
  const nav = document.querySelector('.nav')
  const navDiv = document.createElement('div')
  navDiv.classList.add('nav__flex-container')

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
  navDiv.innerHTML = navLogo + navElements
  nav.appendChild(navDiv)

  activeElement()
}

const activeElement = () => {
  const path = window.location.pathname.slice(11)
  const navList = document.querySelector('.nav__list')

  for (const item of navList.children) {
    const linkHref = item.children[0].attributes[0].value
    if (path === linkHref.slice(2)) {
      item.children[0].classList.add('active')
    }
  }
}

export {createNavigation}
