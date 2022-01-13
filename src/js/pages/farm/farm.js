import {createTableAsteroiden} from '../modules/tableCreatorFarmAsteroid.js'
import {createTableFleet} from '../modules/tableCreatorFarmFleet.js'
import dbData from '../helper/getData.js'

createTableAsteroiden(dbData)
createTableFleet(dbData)
