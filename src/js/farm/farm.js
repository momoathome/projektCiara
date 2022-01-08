import * as tableCreatorFarm from '../modules/tableCreatorFarm.js'
import dbData from '../helper/getData.js'

tableCreatorFarm.createTableFlotten(dbData)
tableCreatorFarm.createTableAsteroiden(dbData)
