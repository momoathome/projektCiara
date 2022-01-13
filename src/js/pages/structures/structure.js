import {createTable} from '../../modules/TableCreatorStructur.js'
import {structureUpdate} from '../structures/structureUpdate.js'
const data = JSON.parse(localStorage.getItem('structures'))

createTable(data)
structureUpdate(data)
