const createPlayerStats = () => {
  const statSection = document.querySelector('#playerStats')
  const uList = document.createElement('ul')

  const statOverview =
    /* html */
    `
<li>
  <span class="reiter">Credits:</span>
  <span class="value" id="credits"></span>
</li>
<li>
  <span class="reiter">Unitlimit:</span>
  <span class="value"><span id="currentUnits">0</span>/<span id="unitLimit">0</span></span>
</li>
<li>
  <span class="reiter">Combat:</span>
  <span class="value" id="combat">0</span>
</li>
<li>
  <span class="reiter">Energy:</span>
  <span class="value" id="energieWert">1.000</span><span class="font">E</span>
</li>
<li>
  <span class="reiter">Titanium:</span>
  <span class="value rohValueSpan" id="titan">0</span>
</li>
<li>
  <span class="reiter">Carbon:</span>
  <span class="value rohValueSpan" id="carb">0</span>
</li>
<li>
  <span class="reiter">Kyberkristall:</span>
  <span class="value rohValueSpan" id="kyber">0</span>
</li>
<li>
  <span class="reiter">Hydrogenium:</span>
  <span class="value rohValueSpan" id="hydro">0</span>
</li>
`
  uList.innerHTML = statOverview
  statSection.appendChild(uList)
}
export {createPlayerStats}
