import {createNavigation} from './modules/navigation.js'
import {createPlayerStats} from './modules/playerStats.js'
import {firstInitiation} from './modules/initiation.js'
import {geldBerechnung, geldCheck} from './modules/money.js'
import * as check from './modules/checkFunction.js'

createNavigation()
createPlayerStats()
firstInitiation()
geldCheck()
geldBerechnung()
check.RohstoffCheck()
check.kampfwertCheck()
check.unitLimitCheck()
