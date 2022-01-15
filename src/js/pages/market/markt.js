import {createTable} from '../../modules/TableCreatorMarkt.js'
import {displayMarketValues} from '../market/marktUpdate.js'
const data = JSON.parse(localStorage.getItem('ressources'))

createTable(data)
displayMarketValues(data)
