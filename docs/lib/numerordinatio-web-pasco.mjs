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

// // cōnscientiam, https://en.wiktionary.org/wiki/conscientia
// const conscientiam = {
//   // "memoriam", https://en.wiktionary.org/wiki/memoria#Latin

//   // https://en.wiktionary.org/wiki/scientia#Latin
//   // https://en.wiktionary.org/wiki/focus#Latin
//   'scientiae_focum': {},

//   // https://en.wiktionary.org/wiki/communitas#Latin
//   'scientiae_communitatem': {},

//   // "normam", https://en.wiktionary.org/wiki/norma#Latin
//   // "referentia", https://en.wiktionary.org/wiki/referens#Latin
//   'referentia_normam': {},
// }

// // experīmentum, https://en.wiktionary.org/wiki/experimentum#Latin
// const experimentum = {
//   // "cōdicem", https://en.wiktionary.org/wiki/codex#Latin
//   'codicem': {},
//   // https://en.wiktionary.org/wiki/verbum#Latin
//   'verbum': {},
//   // verbum collēctiōnī
//   'verbum_collectioni': {}
// }

class StatusQuo {
  // "hāmum", https://en.wiktionary.org/wiki/hamus#Latin
  constructor(optionem = {}, hamo_de_status_quo = {}) {
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

    this.hamo_conscientiam = hamo_de_status_quo.hamo_conscientiam
    this.hamo_experimentum = hamo_de_status_quo.hamo_experimentum
    this.functionem_constructionem = hamo_de_status_quo.functionem_constructionem
    this.conscientiam = {}
    this.experimentum = {}
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
  datum_neo(functionem_regressae, datum_conscientiam, datum_archivum) {
    console.log('DEBUG: datum_neo')
    // scientia_basi
    // communitatibus
    // usum_professori_obiectum

    // console.log('datum', fontem)

    // TODO: refresh options from UI, such as language and etc
    window['status_quo'].datum_hamo_pre(function(resultatum){
      console.log('done datum_neo', resultatum)
      functionem_regressae(resultatum)
    }, datum_conscientiam)
  }

  datum_hamo_init(functionem_regressae, conscientiam = '') {
    // Not necessary yet
    functionem_regressae(null)
  }

  /**
   * _[eng-Latn] Refresh the memory object from data on the interface [eng-Latn]_
   * @param {function} functionem_regressae 
   * @param {string} conscientiam 
   */
  datum_hamo_pre(functionem_regressae, datum_conscientiam = '', datum_exportare_archivum) {
    // Not necessary yet
    if (this.hamo_conscientiam[datum_conscientiam]) {
      if (this.hamo_conscientiam[datum_conscientiam]['pre']) {
        this.hamo_conscientiam[datum_conscientiam]['pre'](function() {
          functionem_regressae(this.conscientiam[datum_conscientiam])
        })
      } else {
        console.log(`DEBUG: no pre in [${datum_conscientiam}]`)
      }
      functionem_regressae(this.conscientiam[datum_conscientiam])
    } else {
      throw `ERROREM: StatusQuo non conscientiam [${datum_conscientiam}]`
    }
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
      HtmlElementum.addEventListener("click", () => _web_pasco_exportare(HtmlElementum))
    )
    console.log(this.hamo_conscientiam)
    for (let [conscientiam_nomen, rem] of Object.entries(this.hamo_conscientiam)) {
      if (rem['init']) {
        rem['init'](functionem_regressae)
      } else {
        console.log(`DEBUG: no init in [${conscientiam_nomen}][${JSON.stringify(rem)}]`)
      }
    }
    // this.conscientiam.forEach(function(rem) {
    //   if (rem['init']) {
    //     rem['init'](functionem_regressae)
    //   } else {
    //     console.log(`DEBUG: no pre in [${rem}]`)
    //   }
    // })
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

function _web_pasco_exportare(HtmlElementum) {
  // data-numord-conscientiam="scientiae_focum"
  // data-numord-archivum="tmx"
  // data-numord-constructionem="blob"
  // data-numord-constructionem="encodeURI"

  let reconstructum = false
  let functionem_constructionem = window['status_quo']['functionem_constructionem'][HtmlElementum.dataset.numordConstructionem]

  console.log('HtmlElementum', HtmlElementum)

  // console.log('_ui_actionem_exportare2', _ui_actionem_exportare2)

  // console.log('optionem', optionem)
  window['status_quo'].datum_neo(function (numerordinatio_abstractum) {
    // console.log('_ui_actionem_exportare', HtmlElementum)
    // console.log('_ui_actionem_exportare', HtmlElementum.dataset)
    // console.log('_ui_actionem_exportare optionem', optionem)
    console.log('_web_pasco_exportare numerordinatio_abstractum', numerordinatio_abstractum)

    let datum = numerordinatio_abstractum.exportare(HtmlElementum.dataset.numordArchivum)
    console.log('status_quo datum', datum)
    functionem_constructionem(datum, HtmlElementum, numerordinatio_abstractum)
    // if (optionem.Regressum) {
    //   window[optionem.Regressum](datum, optionem, errorem)
    // }
  }, HtmlElementum.dataset.numordConscientiam)
  // }, HtmlElementum.dataset.numordConscientiam, HtmlElementum.dataset.numordArchivum)

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