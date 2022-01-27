const config = {
  // one Time use on Initiation
  startUpCash: 2_000_000,
  // needed for wage calculation
  ticks: 5,
  baseWage: 100,
  faktor: 1,
  // asteroid Config, Total Number / base Ressources / Asteroid size = multiplier for Ressources / main Ressource with it's final multiplier
  asteroidNumber: 15,
  asteroidBaseRes: [200, 300],
  asteroidMinMaxSize: [1, 11],
  mainRes: {
    titanium: [1.2, 0.2, 0.05, 0.15],
    carbon: [0.2, 1.2, 0.05, 0.15],
    kristall: [0.05, 0.05, 0.5, 0.02],
    hydro: [0.05, 0.05, 0.02, 0.6],
    default: [0.3, 0.3, 0.05, 0.1],
  },
  // currently not in use
  asteroidAtk: [1250, 15_000, 50_000, 100_000, 250_000],
  // market Config, default Cost / multiplier for the cost according to the Stock
  basePrice: [300, 160, 600, 450],
  baseFaktor: 10_000,
  unitLimit: [
    25, 50, 75, 100, 150, 200, 250, 325, 400, 500, 625, 750, 900, 1100, 1350,
    1650, 2000, 2500, 3250, 4000, 5000, 6500, 8000, 10_000, 14_000, 20_000,
    30_000, 45_000, 65_000, 95_000, 150_000,
  ],
}

export default config
