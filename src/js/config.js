const config = {
  // one Time use on Initiation
  startUpCash: 1_000_000,
  // needed for wage calculation
  ticks: 5,
  baseWage: 10,
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
    50, 100, 150, 250, 350, 500, 700, 950, 1200, 1500, 1850, 2300, 2800, 3400,
    4100, 5000, 6000, 7200, 8500, 10_000, 12_000, 15_000, 20_000, 27_500,
    35_000, 45_000, 60_000, 80_000, 110_000, 150_000,
  ],
}

export default config
