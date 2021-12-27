// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// console.log('numerordinatio-web-pasco.mjs')
/*
  <!-- HTML Exemplum -->
  <script type="module">
    import * as WebPasco from './lib/numerordinatio-web-pasco.mjs';
    console.log(WebPasco)
  </script>
*/




// function fetchAll(...resources) {
function fetchAll(resources) {
  // console.log(resources)
  var destination = []
  resources.forEach(it => {
    // console.log('it', it)
    destination.push(fetch(it))
  })
  return Promise.all(destination)
}

// export { CodexBasim, CodexDeObiectum, CodexDeTabulam, Graphviz, TMX, TBXBasic2008, RDF }
export { fetchAll }