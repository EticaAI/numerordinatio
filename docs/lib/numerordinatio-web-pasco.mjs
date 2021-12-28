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

import { datum_specificum } from './numerordinatio.mjs';

// cōnscientiam, https://en.wiktionary.org/wiki/conscientia
const conscientiam = {
  // "memoriam", https://en.wiktionary.org/wiki/memoria#Latin

  // https://en.wiktionary.org/wiki/scientia#Latin
  // https://en.wiktionary.org/wiki/focus#Latin
  'scientiae_focum': {},

  // https://en.wiktionary.org/wiki/communitas#Latin
  'scientiae_communitatem': {},

  // "normam", https://en.wiktionary.org/wiki/norma#Latin
  // "referentia", https://en.wiktionary.org/wiki/referens#Latin
  'referentia_normam': {},
}

// experīmentum, https://en.wiktionary.org/wiki/experimentum#Latin
const experimentum = {
  // "cōdicem", https://en.wiktionary.org/wiki/codex#Latin
  'codicem': {},
  // https://en.wiktionary.org/wiki/verbum#Latin
  'verbum': {},
  // verbum collēctiōnī
  'verbum_collectioni': {}
}

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
      'numerordinatio_exportare': optionem.ui_numerordinatio_exportare || '.numerordinatio_exportare',
      'objectivum_linguam': optionem.ui_objectivum_linguam || '#objectivum_linguam',
      'auxilium_linguam': optionem.ui_auxilium_linguam || '#auxilium_linguam',
      'agendum_linguam': optionem.ui_agendum_linguam || '#agendum_linguam'
    }

    this.conscientiam = conscientiam
    this.experimentum = experimentum
    // this.datum = {
    //   'scientiam_basi': null,
    //   'scientia': null,
    //   'scientiam_communitatibus': null,
    //   'usum_normae': null,
    //   'inspectionem': null, // Test dataset (collection)
    // }
  }

  datum(regressum, fontem, formatum = 'obiectum', reconstructum = false) {
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

  /**
   * _[eng-Latn] Method to initialize without do heavy data processing [eng-Latn]_
   */
  fiatLux() {
    document.querySelectorAll(this.ui.actionem_exportare).forEach(HtmlElementum =>
      HtmlElementum.addEventListener("click", () => _ui_actionem_exportare(HtmlElementum))
    )
    document.querySelectorAll(this.ui.numerordinatio_exportare).forEach(HtmlElementum =>
      HtmlElementum.addEventListener("click", () => _ui_actionem_exportare2(HtmlElementum))
    )
  }

  praeparare() {
    if (window['quod_status_quo_web_pasco']) {
      window['quod_status_quo_web_pasco']()
    } else {
      throw "ERROREM: Non quod_status_quo_web_pasco() in HTML"
    }
    return this
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
  window['status_quo'].datum(function (datum) {
    // console.log('_ui_actionem_exportare', HtmlElementum)
    // console.log('_ui_actionem_exportare', HtmlElementum.dataset)
    // console.log('_ui_actionem_exportare optionem', optionem)
    if (optionem.Regressum) {
      window[optionem.Regressum](datum, optionem, errorem)
    }
  }, optionem.Fontem, optionem.ObjectivumFormatum)

}

function _ui_actionem_exportare2(HtmlElementum) {
  // data-numord-conscientiam="scientiae_focum"
  // data-numord-archivum="tmx"
  // data-numord-constructionem="archivum"

  // console.log('_ui_actionem_exportare2', _ui_actionem_exportare2)
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
  window['status_quo'].praeparare().datum(function (datum) {
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