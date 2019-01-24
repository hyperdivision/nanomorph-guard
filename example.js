var guard = require('.')
var morph = require('nanomorph')
var html = require('nanohtml')

var manualElm = document.createElement('p')
var text = document.createTextNode()
manualElm.appendChild(text)

function updateMorph () {
  morph(document.body, html`<body>
    <p>Updated by nanomorph on ${Date.now()}</p>
    ${guard(manualElm)}
  </body>`)
}

function updateManual () {
  text.textContent = `Updated by manually on ${Date.now()}`
}

setInterval(updateManual, 1000)
setInterval(updateMorph, 5000)
