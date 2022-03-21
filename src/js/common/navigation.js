const gameName = 'Projekt Ciara'

const createNavigation = () => {
  const nav = document.querySelector('.nav__main')
  const navDiv = document.createElement('div')
  navDiv.classList.add('navbar')

  const navLogo =
    /* html */
    `
      <p class="nav__logo">${gameName}</p>
    `

  const navElements =
    /* html */
    `
    <ul class="nav__list">
      <li class="nav__item"><a href="./overview.html">overview</a></li>
      <li class="nav__item"><a href="./units.html">hangar</a></li>
      <li class="nav__item"><a href="./structures.html">modules</a></li>
      <li class="nav__item"><a href="./markt.html">market</a></li>
      <li class="nav__item"><a href="#">#Research#</a></li>
      <li class="nav__item"><a href="./farm.html">asteroids</a></li>
      <li class="nav__item"><a href="#">#Ranking#</a></li>
    </ul>
    `
  const navMobil =
    /* html */
    `
    <div class="nav__mobil-menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    `
  navDiv.innerHTML = navLogo + navElements + navMobil
  nav.append(navDiv)

  activeElement()
  mobilMenu()
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

const mobilMenu = () => {
  const mobilButton = document.querySelector('.nav__mobil-menu')
  const navList = document.querySelector('.nav__list')
  const navItem = document.querySelectorAll('.nav__item')

  mobilButton.addEventListener('click', mobileMenu)
  navItem.forEach((n) => n.addEventListener('click', closeMenu))

  function mobileMenu() {
    mobilButton.classList.toggle('active')
    navList.classList.toggle('active')
  }

  function closeMenu() {
    mobilButton.classList.remove('active')
    navList.classList.remove('active')
  }
}

export {createNavigation}
