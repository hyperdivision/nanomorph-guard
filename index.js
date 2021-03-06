// A DOM node can only be attached to one tree at a time so when diffing we
// create a proxy node with the same nodeName and guard id. We then overwrite
// isSameNode, which nanomorph uses to check for equivalence, and hence short-
// circuit the diffing of our subtree. Proxies are memoized in a WeakMap, so
// proxy nodes can be GC'ed when the node they shadow go out of scope
var proxies = new WeakMap()

var ns = Math.random().toString(36).slice(2)
var cnt = 0

module.exports = function guard (el) {
  // Short circuit all non-node
  if (!el.dataset) return el
  // Add the identifier the first time we encounter the node
  if (!getComponentId(el)) el.dataset.nanomorphComponentId = ns + (cnt++)
  // Not yet attached to the DOM
  if (!el.parentNode) return el

  if (proxies.has(el)) return proxies.get(el)

  return createProxy(el)
}

function createProxy (el) {
  var pel = document.createElement(el.nodeName)
  // if you see this in devtools, something went wrong!
  pel.dataset.proxy = 'true'
  pel.dataset.nanomorphComponentId = getComponentId(el)
  pel.isSameNode = (node) => getComponentId(pel) === getComponentId(node)
  proxies.set(el, pel)
  return pel
}

function getComponentId (el) {
  return el.dataset && el.dataset.nanomorphComponentId
}
