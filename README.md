# `nanomorph-guard`

> Guard element against being touched by nanomorph

## Usage

Useful with components that expect to keep a reference to their parent element,
but that you still would like to use in combination with `nanomorph`

Below is an example that manually updates a text node every second, while
only morphing the DOM every five seconds. The reference to `manualElm` is not
lost.

```js
var guard = require('nanomorph-guard')
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
```

## API

### `var el = guard(element)`

Protect `element` from being morphed by `nanomorph`. Will return `element`
itself if not a `Node`, eg. `string`, `DocumentFragment`, `array` or other types
that you may sometimes pass to `nanohtml`/`nanomorph`

## Install

```sh
npm install nanomorph-guard
```

## License

[ISC](LICENSE)
