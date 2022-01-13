import {createTable} from '../../modules/TableCreatorUnits.js'
import {maxUnit} from '../units/unitUpdate.js'
const data = JSON.parse(localStorage.getItem('units'))

createTable(data)
maxUnit(data)
