import {createNavigation} from './js/common/navigation.js'
import {createPlayerStats} from './js/common/playerStats.js'
import {geldBerechnung} from './js/helper/money.js'
import * as check from './js/helper/checkFunction.js'

createNavigation()
createPlayerStats()
geldBerechnung()
check.rohstoffCheck()
check.combatCheck()
check.unitLimitCheck()
