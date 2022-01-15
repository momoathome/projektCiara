import {createTableAsteroiden} from '../../modules/tableCreatorFarmAsteroid.js'
import {createTableFleet} from '../../modules/tableCreatorFarmFleet.js'
import {maxUnit} from '../farm/fleetUpdate.js'
const dataRes = JSON.parse(localStorage.getItem('ressources'))
const dataUnit = JSON.parse(localStorage.getItem('units'))

createTableAsteroiden(dataRes)
createTableFleet(dataUnit)
maxUnit(dataUnit)
