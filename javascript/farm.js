import * as tableCreatorFarm from '../modules/tableCreatorFarm.js'
import dbData from '../modules/getData.js'

tableCreatorFarm.createTableFlotten(dbData)
tableCreatorFarm.createTableAsteroiden(dbData)
