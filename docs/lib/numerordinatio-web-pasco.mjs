// Dominium Publicum
// SPDX-License-Identifier: Unlicense

/**
 * _[eng-Latn] While there is no immediate need, remaining JavaScript code
 * from index.html relatd to web eventually could be moved to here. [eng-Latn]_
 */


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// console.log('numerordinatio-web-pasco.mjs')
/*
  <!-- HTML Exemplum -->
  <script type="module">
    import * as WebPasco from './lib/numerordinatio-web-pasco.mjs';
    console.log(WebPasco)
  </script>
*/

class StatusQuo {
  constructor(optionem = {}) {
    // this.datum_de_factum = {};
    // this.datum_reconstructum = {};
    // // @TODO: convert languages to new Set()
    // this.objectivum_linguam = [];
    // this.auxilium_linguam = [];
    // this.agendum_linguam = ['*']; // All languages are working languages
    // // objectivum_linguam = null, agendum_linguam = []
    // // Trivia: ignārum, https://en.wiktionary.org/wiki/ignarus#Latin
    // this.ignarum_linguam = new Set()
    this.ui = {
      'actionem_exportare': optionem.ui_actionem_exportare || '.actionem_exportare',
      'objectivum_linguam': optionem.ui_objectivum_linguam || '#objectivum_linguam',
      'auxilium_linguam': optionem.ui_auxilium_linguam || '#auxilium_linguam',
      'agendum_linguam': optionem.ui_agendum_linguam || '#agendum_linguam'
    }
    // this.datum = {
    //   'scientiam_basi': null,
    //   'scientia': null,
    //   'scientiam_communitatibus': null,
    //   'usum_normae': null,
    //   'inspectionem': null, // Test dataset (collection)
    // }
  }

  datum(regressum, fontem, formatum = 'obiectum', reconstructum = false){
    // scientia_basi
    // communitatibus
    // usum_professori_obiectum

    // console.log('datum', fontem)

    // TODO: refresh options from UI, such as language and etc
    window['prepare_scientia']()
    // window['prepare_usum_professori']()
    window[fontem].praeparare()
    let datum = window[fontem].exportare(formatum, reconstructum)

    // console.log('datum', datum)

    regressum(datum)
    // return window[nomen]
  }

  est(rem, clavem, collectionem) {
    if (collectionem) {
      this[collectionem][clavem] = rem
    } else {
      this[clavem] = rem
    }

    return this
  }

  fiatLux() {
    document.querySelectorAll(this.ui.actionem_exportare).forEach(HtmlElementum =>
      HtmlElementum.addEventListener("click", () => _ui_actionem_exportare(HtmlElementum))
    )
  }
}

// https://stackoverflow.com/questions/30521224/javascript-convert-pascalcase-to-underscore-case-snake-case
function _ui_actionem_exportare(HtmlElementum) {
  let optionem = {
    'ObjectivumFormatum': '', // data-numord-objectivum-formatum
    'ObjectivumPostformatum': '', // data-numord-objectivum-postformatum
    'ObjectivumMimetype': 'text/plain',
    'ObjectivumArchivum': 'data.txt' // data-numord-objectivum-archivum
  }
  let datum = ''
  let errorem = []
  if (HtmlElementum.dataset) {
    for (let [codicem, rem] of Object.entries(HtmlElementum.dataset)) {
      if (codicem.indexOf('numord') === 0) {
        optionem[codicem.replace('numord', '')] = rem
      }
    }
  }
  // console.log('optionem', optionem)
  window['status_quo'].datum(function(datum){
    // console.log('_ui_actionem_exportare', HtmlElementum)
    // console.log('_ui_actionem_exportare', HtmlElementum.dataset)
    // console.log('_ui_actionem_exportare optionem', optionem)
    if (optionem.Regressum) {
      window[optionem.Regressum](datum, optionem, errorem)
    }
  }, optionem.Fontem, optionem.ObjectivumFormatum)

}

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
export { StatusQuo, fetchAll }