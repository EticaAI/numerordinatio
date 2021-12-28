// Dominium Publicum
// SPDX-License-Identifier: Unlicense

const datum_specificum = {
  // "cōnstrūctiōnem", https://en.wiktionary.org/wiki/constructio#Latin
  'constructionem': {
    'archivum': {}
  },
  // https://en.wiktionary.org/wiki/contineo#Latin
  // "archīvum", https://en.wiktionary.org/wiki/archivum
  'archivum': {
    'csv': {
      'extesionem': '.csv',
      'mimetype': 'text/csv',
    },
    'gv': {
      'extesionem': '.gv',
      'mimetype': 'text/vnd.graphviz',
    },
    'hxl.csv': {
      'extesionem': '.hxl.csv',
      'mimetype': 'text/csv',
    },
    'json': {
      'extesionem': '.json',
      'mimetype': 'application/json',
    },
    'tbx': {
      'extesionem': '.json',
      'mimetype': 'application/x-tbx',
    },
    'tmx': {
      'extesionem': '.tmx',
      'mimetype': 'application/x-tmx',
    },
    'ttl': {
      'extesionem': '.ttl',
      'mimetype': 'application/x-turtle',
    },
    'yml': {
      'extesionem': '.yml',
      'mimetype': 'text/x-yaml',
    },
  },
  // https://en.wiktionary.org/wiki/varians#Latin
  'varians':  {
    'numerae':{},
    'verbosum':{}
  }
}


/**
 * _[eng-Latn] While there is no immediate need, remaining JavaScript code
 * from index.html which could be ported to a non-web environment (such as
 * command line) eventually could be moved to here. [eng-Latn]_
 */

class Numerordinatio {
  constructor() {
    this.datum_de_factum = {};
    this.datum_reconstructum = {};

    // @TODO: convert languages to new Set()
    this.objectivum_linguam = [];
    this.auxilium_linguam = [];
    this.agendum_linguam = ['*']; // All languages are working languages
    // objectivum_linguam = null, agendum_linguam = []
    // Trivia: ignārum, https://en.wiktionary.org/wiki/ignarus#Latin
    this.ignarum_linguam = new Set()
  }

  _adNormale(terminum) {
    let normale = ''
    if (!terminum || terminum.length === 0) {
      return 'errorem'
    }
    normale = terminum.trim().toLowerCase().normalize("NFC")
    return normale
  }

  _estHocLinguamAgendae(linguam) {
    if (this.agendum_linguam.indexOf('*') > -1) {
      return true
    }
    if (this.objectivum_linguam.indexOf(linguam) > -1) {
      return true
    }
    if (this.auxilium_linguam.indexOf(linguam) > -1) {
      return true
    }
    return false
  }

  /**
   * Est hoc linguam objectivae aut linguam auxilio?
   **/
  _estHocLinguamAuxilio(linguam, strictum = true) {
    if (!strictum && this.auxilium_linguam.indexOf('*') > -1) {
      return true
    }
    if (this.auxilium_linguam.indexOf(linguam) > -1) {
      return true
    }
    return false
  }

  /**
   * Est hoc linguam objectivae aut linguam auxilio?
   **/
  _estHocLinguamObjectivae(linguam, strictum = true) {
    // console.log('_estHocLinguamObjectivae', linguam)
    if (!strictum && this.objectivum_linguam.indexOf('*') > -1) {
      return true
    }
    if (this.objectivum_linguam.indexOf(linguam) > -1) {
      return true
    }
    return false
  }

  /**
   * Quod linguam ideae?
   *
   * @param {array} linguam_collectionem
   * @param {bool} multilinguae
   * @returns {array} codicem collēctiōnem
   */
  _quodLinguamIdeae(linguam_collectionem, multilinguae = false) {
    let _temp_obj = []
    let _temp_age = []

    if (multilinguae && (this._estHocLinguamObjectivae('', false) || this._estHocLinguamAuxilio('', false))) {
      return linguam_collectionem
    }

    console.log('linguam_collectionem', linguam_collectionem, multilinguae)
    for (let item of linguam_collectionem) {
      if (this._estHocLinguamObjectivae(item)) {
        _temp_obj.push(item)
      }
      if (this._estHocLinguamAuxilio(item)) {
        _temp_age.push(item)
      }
      console.log('_temp_obj, _temp_age', _temp_obj, _temp_age)
      // @TODO: implement preference by longer language codes with x-private
      // @TODO: implement order user defined on interface
      if (!multilinguae) {
        if (_temp_obj.length > 0) {
          return [_temp_obj[0]]
        }
        if (_temp_age.length > 0) {
          return [_temp_age[0]]
        }
      } else if (_temp_obj.length > 0 || _temp_age.length > 0) {
        return [..._temp_obj, ..._temp_age]
      }
    }
    // console.log('_temp_obj, _temp_age', _temp_obj, _temp_age)
    // console.log('this.objectivum_linguam', this.objectivum_linguam.indexOf('eng-Latn'))
    // console.log('this.objectivum_linguam', this.objectivum_linguam.indexOf('eng-Latn') > -1)
    if (this._estHocLinguamObjectivae('', false) || this._estHocLinguamAuxilio('', false)) {
      return [linguam_collectionem[0]]
    }
    return false
  }

  _quodLinguamPartem(linguam_bcp47) {
    // TODO: port bcp47_langtag from linguacodex.py to javascript
    let resultatum = []
    let adhoc = linguam_bcp47.replace('_', '-')
    resultatum.push(adhoc)

    if (adhoc.indexOf('-x-') > -1) {
      let _temp = adhoc.split('-x-')
      resultatum.push(_temp[0])
      adhoc = adhoc.replace('-x-' + _temp[0], '')
    }
    let _temp2 = adhoc.split('-')
    while (_temp2.length > 0) {
      resultatum.push(_temp2.join('-'))
      _temp2.pop()
    }
    return resultatum
  }

  /**
   * _[eng-Latn] Return all parent codes from a code[eng-Latn]_
   *
   * @param {string} codicem_radix
   * @returns {array} codicem collēctiōnem
   */
  _parentem(codicem_radix) {
    let resultatum = []
    let temp = codicem_radix.split(':')
    temp.pop()
    while (temp.length) {
      resultatum.push(temp.join(':'))
      temp.pop()
    }
    return resultatum
  }

  /**
   * Trivia: agendae, https://en.wiktionary.org/wiki/agendus#Latin
   **/
  estLinguamAgendae(agendum_linguam = []) {
    this.agendum_linguam = []
    for (let item of agendum_linguam) {
      this.agendum_linguam.push(...this._quodLinguamPartem(item))
    }
    return this
  }

  /**
   * Trivia: auxiliō, https://en.wiktionary.org/wiki/auxilium
   **/
  estLinguamAuxilio(auxilium_linguam = []) {
    this.auxilium_linguam = []
    for (let item of auxilium_linguam) {
      this.auxilium_linguam.push(...this._quodLinguamPartem(item))
    }
    return this
  }

  /**
   * Trivia: objectīvae, https://en.wiktionary.org/wiki/auxilium
   **/
  estLinguamObjectivae(objectivum_linguam) {
    this.objectivum_linguam = objectivum_linguam
    this.objectivum_linguam = []
    for (let item of objectivum_linguam) {
      this.objectivum_linguam.push(...this._quodLinguamPartem(item))
    }
    return this
  }

  /**
    * _[eng-Latn]Add manually one item to the base[eng-Latn]_
    *
    * @param {string} codicem_basim
    * @param {string} [linguam]
    * @param {string} [terminum]
    * @returns {object} this
    */
  addereRem(codicem_basim, linguam = 'und-Zyyy', terminum = '') {
    if (!this.datum_de_factum[codicem_basim]) {
      this.datum_de_factum[codicem_basim] = {}
    }
    if (this._estHocLinguamAgendae(linguam)) {
      if (!this.datum_de_factum[codicem_basim][linguam]) {
        this.datum_de_factum[codicem_basim][linguam] = {}
      }
      if (terminum) {
        let _itemnum = 0
        while (this.datum_de_factum[codicem_basim][linguam][`${_itemnum.toString()}`]) {
          _itemnum = _itemnum + 1
        }
        this.datum_de_factum[codicem_basim][linguam][`${_itemnum.toString()}`] = terminum
      }
    } else {
      this.ignarum_linguam.add(linguam)
    }

    return this
  }
  /**
    * _[eng-Latn]Add manually one item to the base[eng-Latn]_
    *
    * @param {string} codicem_basim
    * @param {string} [linguam]
    * @param {string} [terminum]
    * @returns {object} this
    */
  addereObiectum(datum_extentionem) {
    // TODO: allow this extend the base item
    //
    // console.log('addereObiectum', this.datum_de_factum, datum_extentionem)

    this.datum_de_factum = Auxilium.mergeDeep(this.datum_de_factum, datum_extentionem)
    this.praeparare()
    return this
  }

  exportare(formatum, reconstructum = false) {
    let formatum_normale = formatum.toLowerCase().replace(/\-/g, '')
    if (formatum_normale.indexOf('tmx') === 0) {
      return this.exportareTMX(reconstructum)
    }
    if (formatum_normale.indexOf('tbx') === 0) {
      return this.exportareTBXBasic2008(reconstructum)
    }
    if (formatum_normale.indexOf('rdf') === 0) {
      return this.exportareRDFTurtle(reconstructum)
    }
    if (formatum_normale.indexOf('graphviz') === 0 || formatum_normale.indexOf('gv') === 0 || formatum_normale.indexOf('dot') === 0) {
      throw `TODO: [${formatum}]; need be migrated from html to here`
    }
    if (formatum_normale.indexOf('tabulam') === 0 || formatum_normale.indexOf('csv') === 0) {

      // Note: CSV-like formats still need conversion to string
      return this.exportareTabulam(reconstructum)
    }
    if (formatum_normale.indexOf('hxl') === 0 || formatum_normale.indexOf('hxlcsv') === 0) {
      // Note: CSV-like formats still need conversion to string
      return this.exportareTabulamHXL(reconstructum)
    }
    if (formatum_normale.indexOf('obiectum') === 0 || formatum_normale.indexOf('json') === 0 || formatum_normale.indexOf('yaml') === 0) {
      // Note: JSON and YAML formats still need conversion to string later
      return this.exportareTabulam(reconstructum)
    }
    throw `formatum [${formatum}] ?`
  }

  exportareDotNumerae(reconstructum = false, optionem = {}) {
    let obiectum = this.exportareObiectum(reconstructum)
    let num_ast = new NumerordinatioAST(obiectum, optionem)
    num_ast.setAST(obiectum)
    return num_ast.inDot()
  }

  exportareDotNumerae(reconstructum = false, optionem = {}) {
    let obiectum = this.exportareObiectum(reconstructum)
    let num_ast = new NumerordinatioAST(obiectum, optionem)
    return num_ast.inDotNumerae()
  }

  exportareObiectum(reconstructum = false) {
    if (reconstructum) {
      return this.quod_completum()
    } else {
      return this.datum_de_factum
    }
  }

  exportareTabulam(reconstructum = false) {
    let obiectum = this.exportareObiectum(reconstructum)
    let csv_columns = 0
    let csv_data = []
    let csv_data2 = []
    let csv_data_by_linguam = {}
    let resultatum = []
    for (let [codicem, conceptum_significatini] of Object.entries(obiectum)) {
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        for (let [linguam, terminum_collectionem] of Object.entries(conceptum_significatini)) {
          let csv_column__now = 0
          let lineam = []
          if (!csv_data_by_linguam[linguam]) {
            csv_data_by_linguam[linguam] = {}
          }
          if (!csv_data_by_linguam[linguam][codicem]) {
            csv_data_by_linguam[linguam][codicem] = {}
          }
          lineam.push('_') // Underline is used as fallback for no name
          lineam.push(linguam) // Underline is used as fallback for no name
          for (let [terminum_indicem, terminum_referens] of Object.entries(terminum_collectionem)) {
            csv_column__now = csv_column__now + 1
            lineam.push(`[${codicem}] ${terminum_referens}`)
            csv_data_by_linguam[linguam][codicem][terminum_indicem] = terminum_referens
          }
          if (csv_column__now > csv_columns) {
            csv_columns = csv_column__now
          }
          csv_data.push(lineam)
        }
      }
    }

    for (let [linguam, codicem_e_linguam] of Object.entries(csv_data_by_linguam)) {
      let csv_column__now = 2
      let lineam = []
      lineam.push('_') // Underline is used as fallback for no name
      lineam.push(linguam)
      for (let [codicem, indicem_et_significatini] of Object.entries(codicem_e_linguam)) {
        // console.log('codicem, indicem', codicem, indicem_et_significatini)
        for (let [indicem, terminum_referens] of Object.entries(indicem_et_significatini)) {
          lineam.push(`[${codicem}] ${terminum_referens}`)
          csv_column__now = csv_column__now + 1
        }
      }
      if (csv_column__now > csv_columns) {
        csv_columns = csv_column__now
      }
      csv_data2.push(lineam)
    }

    for (let lineam of csv_data2) {
      let neo_lineam = []
      for (let indicem of [...Array(csv_columns).keys()]) {
        if (lineam[indicem]) {
          neo_lineam.push(lineam[indicem])
        } else {
          neo_lineam.push('')
        }
      }
      // lineam.fill('', lineam.length + 1, csv_columns + 1)
      resultatum.push(neo_lineam)

    }

    // resultatum

    // console.log('csv_columns', csv_columns)
    // console.log('csv_data', csv_data)
    // console.log('csv_data_by_linguam', csv_data_by_linguam)
    // console.log('csv_data2', csv_data2)
    // console.log('resultatum', resultatum)

    return resultatum
  }

  exportareTabulamHXL(reconstructum = false) {
    let tabulam = this.exportareTabulam(reconstructum)
    let hxl_caput = []
    let indicem = 1
    let totale = tabulam[0].length - 1
    hxl_caput.push('#meta+name')
    hxl_caput.push('#item+linguam')

    while (indicem < totale) {
      hxl_caput.push(`#item+ordonumerae+indicem_${indicem}`)
      indicem = indicem + 1
    }
    tabulam.unshift(hxl_caput)
    return tabulam
  }

  exportareRDFTurtle(reconstructum = false) {
    let obiectum = this.exportareObiectum(reconstructum)
    let tmx = new RDFProofOfConcept()
    tmx.setAST(obiectum)
    return tmx.export()
  }

  exportareTMX(reconstructum = false) {
    let obiectum = this.exportareObiectum(reconstructum)
    let tmx = new TMX()
    tmx.setAST(obiectum)
    return tmx.export()
  }

  exportareTBXBasic2008(reconstructum = false) {
    let obiectum = this.exportareObiectum(reconstructum)
    let tbx = new TBXBasic2008()
    tbx.setAST(obiectum)
    return tbx.export()
  }

  /**
   * _[eng-Latn]Rebuild internal object before be able to be usable[eng-Latn]_
   * @returns {object} this
   */
  praeparare() {
    // console.log('praeparare')
    let non_clavem = new Set()
    let est_clavem = []
    let praefectum = []
    for (let clavem of Object.keys(this.datum_de_factum)) {
      est_clavem.push(clavem)
      let parentem = this._parentem(clavem)
      for (let item of parentem) {
        if (!this.datum_de_factum[item]) {
          non_clavem.add(item)
        }
      }
    }
    praefectum = [...est_clavem, ...non_clavem].sort()
    // console.log('est_clavem', est_clavem)
    // console.log('non_clavem', non_clavem)
    // console.log('praefectum', praefectum)
    for (let item of praefectum) {
      if (!this.datum_de_factum[item]) {
        this.datum_reconstructum[item] = {}
      } else {
        this.datum_reconstructum[item] = this.datum_de_factum[item]
      }
    }
    // console.log('this.datum_reconstructum', this.datum_reconstructum)
    return this
  }

  quod_completum() {
    return this.datum_reconstructum
  }

  quod_conceptum(codicem_basim) {
    if (this.datum_reconstructum[codicem_basim]) {
      return this.datum_reconstructum[codicem_basim]
    }
    return false
  }

  quod_terminum(codicem_basim, multilinguae = false) {
    // quod_linguam
    let terminum = []
    let conceptum = this.quod_conceptum(codicem_basim)
    if (!conceptum) {
      return false
    }
    let linguam_collectionem = Object.keys(conceptum)
    let linguam_ideae = this._quodLinguamIdeae(linguam_collectionem, multilinguae)
    // console.log('linguam_ideae', linguam_ideae)
    if (!linguam_ideae) {
      return null
    }
    for (let linguam_ideae_item of linguam_ideae) {
      for (let [index, terminum_item] of Object.entries(conceptum[linguam_ideae_item])) {
        terminum.push([terminum_item, linguam_ideae_item, index])
      }
    }

    return terminum
  }

  reversumLogicae(terminum, linguam_collectionem) {
    this.datum_reconstructum
    let resultatum = []
    let terminum_normali = this._adNormale(terminum)
    for (let [codicem, conceptum_significatini] of Object.entries(this.datum_reconstructum)) {
      // console.log('reversumLogicae', codicem, conceptum_significatini)
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        for (let [linguam, terminum_collectionem] of Object.entries(conceptum_significatini)) {
          // console.log('reversumLogicae linguam, terminum', linguam, terminum_normali, terminum_collectionem)
          for (let [terminum_indicem, terminum_referens] of Object.entries(terminum_collectionem)) {
            // console.log('reversumLogicae terminum_normali, this._adNormale(terminum_referens)', terminum_normali, this._adNormale(terminum_referens))
            if (terminum_normali == this._adNormale(terminum_referens)) {
              resultatum.push([codicem, linguam, terminum_referens])
            }
          }
        }
      }
      // terminum.push([terminum_item, linguam_ideae_item, index])
    }
    return resultatum
  }
}

/**
 * _[eng-Latn] This class contain primitive helper functions to deal with
 * smaller tasks related to Numerodination [eng-Latn]_
 * Trivia:
 * - prīmitīvum, https://en.wiktionary.org/wiki/primitivus#Latin
 */
class Primitivum {


  /**
   * _[eng-Latn]
   * From only array of headers and optionally some rows, build an rudimentar
   * abstract syntax tree (without any awareness of what this means)
   * [eng-Latn]_
   *
   * @param   {array} caput_collectionem - JavaScript Array de caput
   * @param   {array} [rem_collectionem] - JavaScript Array[Array] de datum
   * @returns {array}
   */
  static __abstractum_syntaxim_arborem(caput_collectionem, rem_collectionem = null) {
    let ast_crudum = []
    let rem_crudum = []
    let coniunctum = new Set()
    let abstractum_nodum = new Set()
    let crudum_abstractum_nodum = []
    let rem_et_codicem = []
    let indicem = 1

    // Tests
    // abstractum_syntaxim_arborem(['Attacker name [12.10.34~1]', '', 'Survivor name [12.10.34~2]', 'Something else', 'Company name [14.56~2]'])

    // 0: [<0:originale_indicem>, <1:originale_caput>, <2:typum_caput>, <3:aliud_caput>, <4:codicem_completum>, <5:codicem_basem>, <6:coniunctum>, <7:relationem>, <8:referens_nomen>]
    // 1: vacuum
    // 2: [...<coniunctum_collectionem>]
    // 3: [...<crudum_abstractum_nodum>]

    let _argumented = []
    let _meta = []

    _argumented.push(null)

    for (const [index, caput] of caput_collectionem.entries()) {
      let adhoc = Primitivum.quod_significationem_de_caput_item(caput)
      coniunctum.add(adhoc[4])
      let lineam = [index + 1, caput].concat(adhoc)
      lineam.push([]) // <relationem>
      lineam.push('') // <referens_nomen>
      _argumented.push(lineam)

      if (adhoc[3]) {
        rem_et_codicem.push([index + 1, adhoc[3]])
        // let _parts = adhoc[3].split('.')
        let _parts = adhoc[3].split(':')
        _parts.pop()
        while (_parts.length) {
          if (_parts.length > 0) {
            // abstractum_nodum.add(_parts.join('.'))
            abstractum_nodum.add(_parts.join(':'))
            _parts.pop()
          }
        }
      }
      // console.log('adhoc[6]', adhoc[4], adhoc)
    }
    let _an = []
    let _etal = []
    if (abstractum_nodum.size) {
      _an = Array.from(abstractum_nodum).sort()
      let aindex = -2
      for (let item of _an) {
        crudum_abstractum_nodum.push(
          [aindex, item, -100, item, item, item, null, [], '']
        )
        aindex = aindex - 1
      }

      let _etal = _argumented.concat(crudum_abstractum_nodum)
      // _etal = _etal.filter()

      // relationem
      for (let [index_1, item_1] of crudum_abstractum_nodum.entries()) {
        // console.log('item0', item_0)
        for (let item_2 of _etal) {
          // console.log('item_1[5]', item_1[5])
          // if (item_2 && item_2[5] && item_2[5].indexOf(item_1 + '.') === 0) {
          // if (item_2 && item_2[5] && item_2[5].indexOf(item_1[5] + '.') === 0) {
          if (item_2 && item_2[5] && item_2[5].indexOf(item_1[5] + ':') === 0) {
            // console.log(crudum_abstractum_nodum[index_1])
            // let _parts = item_2[5].replace(item_1[5] + '.', '').split('.')
            let _parts = item_2[5].replace(item_1[5] + ':', '').split(':')
            // console.log('_parts', _parts, item_2[5], item_1[5], item_2[5].replace(item_1[5] + '.', ''), '')
            if (_parts.length === 1) {
              crudum_abstractum_nodum[index_1][7].push(item_2[0])
              // console.log('foi mesmo', index_1, item_2[0])
            }
          }
        }
      }
    }

    _meta.push(
      Array.from(coniunctum).sort()
    )

    ast_crudum.push(_argumented)
    ast_crudum.push(rem_collectionem)
    ast_crudum.push(_meta)
    ast_crudum.push(crudum_abstractum_nodum)

    // console.log('abstractum_syntaxim_arborem_v2', ast)

    return ast_crudum
  }

  // @TODO: implement way to, via curated examples of previously tagged data
  //        add codes on a dataset
  // @deprecated make Numerodinatio able merge final result without use this helper
  //
  static __abstractum_syntaxim_arborem_de_conscientiam(ast_de_professorem, scientia_basi, optionem = {}) {
    // Trivia: https://en.wiktionary.org/wiki/conscientia#Latin
    let ast_finale = ast_de_professorem

    console.info('@deprecated abstractum_syntaxim_arborem_de_conscientiam; @todo Numerodinatio')

    // 0: [<0:originale_indicem>, <1:originale_caput>, <2:typum_caput>, <3:aliud_caput>, <4:codicem_completum>, <5:codicem_basem>, <6:coniunctum>, <7:relationem>, <8:referens_nomen>]
    if (ast_finale[0]) {
      for (let index = 1; index < ast_finale[0].length; index++) {
        if (ast_finale[0][index][5]) {
          let referens_nomen = quod_cognitionem(scientia_basi, { codicem: ast_finale[0][index][5] })
          if (referens_nomen && referens_nomen[0]) {
            ast_finale[0][index][8] = referens_nomen[0]
            // console.log('deu', referens_nomen[0])
          }
        }
      }
    }

    // 3: [...<crudum_abstractum_nodum>]
    if (ast_finale[3]) {
      // index de 0
      for (let index = 0; index < ast_finale[3].length; index++) {
        // <5:codicem_basem>
        // <8:referens_nomen>
        if (ast_finale[3][index][5]) {
          let referens_nomen = quod_cognitionem(scientia_basi, { codicem: ast_finale[3][index][5] })
          if (referens_nomen && referens_nomen[0]) {
            ast_finale[3][index][8] = referens_nomen[0]
            // console.log('deu2', referens_nomen[0])
          }
          // console.log('referens_nomen', referens_nomen)
        }
        // console.log('oi', ast_finale[3][index][5])
      }
    }
    return ast_finale
  }

  /**
 * _[eng-Latn] A rudimentar summary of Abstract Syntax Tree. Consider use
 * the ast_in_dot_numerae()
 * [eng-Latn]_
 *
 * @param {array}  ast
 * @returns {object}
 **/
  static __ast_in_summarium(ast) {
    let resultatum = {}

    // ast_in_summarium(abstractum_syntaxim_arborem(['12.10.34', '12.10.34~2', '', '14.56', '14.56', '14.56~2']))
    if (ast && ast.length) {
      ast.forEach(coniunctum_et_rem_collectionem => {
        let coniunctum = "" + coniunctum_et_rem_collectionem[0]
        // console.log(coniunctum)
        resultatum[coniunctum] = []
        coniunctum_et_rem_collectionem[1].forEach(rem_collectionem => {
          // console.log('rem_collectionem', rem_collectionem)
          if (Array.isArray(rem_collectionem)) {
            resultatum[coniunctum].push("" + rem_collectionem[0] + ',' + rem_collectionem[1])
          } else {
            resultatum[coniunctum].push('' + rem_collectionem)
          }
        });
      });
    }

    return resultatum
  }


  static __ast_in_dot_v2(ast, titulum, annotationem = '') {
    // throw "ast_in_dot_v2 -> Primitivum.__ast_in_dot_v2"
    // @deprecated use NumerordinatioAST

    let resultatum = []
    // const sumarium = ast_in_summarium(ast)
    // return sumarium

    let dot = new Graphviz(titulum)

    if (annotationem) {
      dot.addAnnotation(annotationem)
    }

    for (let lineam of ast[3]) {
      if (!lineam) {
        continue
      }

      // Habesne codicem? [00.00]
      // Nom codicem? Indicem (0)
      let label = (lineam[5] ? `[${lineam[5]}]` : `(${lineam[0]})`)

      // <8:referens_nomen>?
      if (lineam[8]) {
        label = label + '\\n' + lineam[8]
      } else {
        label = label + '\\n---'
      }
      // // <3:aliud_caput> ?
      // if (lineam[3]) {
      //   label = label + ' \\n' + lineam[3]
      // } else {
      //   label = label + '\\n---'
      // }

      // dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': __codicem_rank(lineam[5]) }, { 'label': label, style: 'dotted' })
      dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': Primitivum.ordoDeCodicem(lineam[5]) }, { 'label': label, style: 'dotted' })
      if (lineam[7]) {
        dot.addRelIndirect(`_${lineam[0]}`, lineam[7].map(x => '_' + x))
      }
    }

    for (let lineam of ast[0]) {
      if (!lineam) {
        continue
      }

      let label = (lineam[5] ? `[${lineam[5]}]` : `(${lineam[0]})`)

      // <8:referens_nomen>?
      if (lineam[8]) {
        label = label + '\\n' + lineam[8]
      } else {
        label = label + '\\n---'
      }
      // <3:aliud_caput> ?
      if (lineam[3]) {
        label = label + ' \\n' + lineam[3]
      } else {
        label = label + '\\n---'
      }

      // dot.addNode(`_${lineam[0]}`, {'cluster': lineam[6]}, { 'label': label })
      // dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': __codicem_rank(lineam[5]) }, { 'label': label })
      dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': Primitivum.ordoDeCodicem(lineam[5]) }, { 'label': label })
      // console.log(lineam)
    }
    if (dot.hasCluster('-1')) {
      // console.log('tem')
      dot.addCluster('-1', { 'label': '?' })
    }

    return dot.render()
  }

  /**
   * @TODO temporary name; maybe replace or remove
   *
   * @param {*} code 
   * @param {*} all_options 
   * @returns 
   */
  static __direct_children(code, all_options) {
    let resultatum = []
    // let code_level = code.split('.').length
    let code_level = code.split(':').length
    // console.log('code', code)
    if (all_options) {
      all_options.forEach(item => {
        // console.log('item', item)
        if (item.indexOf(`${code}`) > -1) {
          // let option_level = item.split('.').length
          let option_level = item.split(':').length
          // console.log('oi  code, code_level, item, option_level', code, code_level, item, option_level)
          // console.log(code_level, option_level, code_level === (option_level + 1))
          if (code_level === (option_level - 1) && (parseInt(code) !== 0)) {
            resultatum.push(item)
          }
        }
      });
    }
    return resultatum
  }

  // @TODO deal with order of apperance https://stackoverflow.com/questions/44274518/how-can-i-control-within-level-node-order-in-graphvizs-dot
  static __scientia_basi_in_ast_dot_numerum(scientia) {
    // let resultatum = '# TODO'

    let scientia_datum = scientia.quod_completum()

    let dot = new Graphviz('ontologia-numerae')

    // console.log(scientia, scientia)

    if (scientia_datum && Object.keys(scientia_datum).length !== 0) {
      let _opt = Object.keys(scientia_datum)
      for (let [codicem_basim, signifo] of Object.entries(scientia_datum)) {
        // dot.addNode(codicem_basim)
        // dot.addNode(codicem_basim, { rank: __codicem_rank(codicem_basim) })
        dot.addNode(codicem_basim, { rank: Primitivum.ordoDeCodicem(codicem_basim) })
      }

      _opt.forEach(item => {
        let __rels = Primitivum.__direct_children(item, _opt)
        if (__rels && __rels.length > 0) {
          dot.addRelIndirect(item, __rels)
        }
      })

    } {
      // dot.addAnnotation('vacuum?')
    }

    return dot.render()
  }

  /**
   * @todo potential refactoring here on NumerordinatioAST
   *
   * @param {*} scientia 
   * @returns 
   */
  static __scientia_basi_in_ast_dot_verbosum(scientia) {
    let dot = new Graphviz('ontologia-verbosum', 'strict graph', {
      'node': { 'style': 'filled' }
    })

    let scientia_datum = scientia.quod_completum()

    // console.log('scientia_datum', scientia_datum)

    // console.log(scientia, scientia)
    // node [style=filled]

    if (scientia_datum && Object.keys(scientia_datum).length !== 0) {
      let _opt = Object.keys(scientia_datum)
      for (let [codicem_basim, signifo] of Object.entries(scientia_datum)) {
        // dot.addNode(codicem_basim)
        // console.log(signifo)
        dot.addNode(codicem_basim, {
          // 'rank': __codicem_rank(codicem_basim),
          'rank': Primitivum.ordoDeCodicem(codicem_basim),
          // 'verbose': __linearize(signifo)
          'verbose': Primitivum.lineatio(signifo)
        })
      }

      _opt.forEach(item => {
        let __rels = Primitivum.__direct_children(item, _opt)
        if (__rels && __rels.length > 0) {
          dot.addRelIndirect(item, __rels)
        }
      })

    } {
      // dot.addAnnotation('vacuum?')
    }

    return dot.render()
  }


  /**
   * @deprecated deprecated with abstractum_syntaxim_arborem_de_conscientiam()
   *
   * @example
   *
   * quod_cognitionem(scientia_basi, {codicem:'12'})
   **/
  static quod_cognitionem(scientia_basi, optionem = {}) {
    // codicem, objectivum_linguam, agendum_linguam, terminum_indicem
    if (!scientia_basi || !optionem || !optionem.codicem || !scientia_basi[optionem.codicem]) {
      return false
    }
    let terminum_indicem = optionem.terminum_indicem || "0"
    let clavem_optionem = Object.keys(scientia_basi[optionem.codicem])
    let clavem = Primitivum.__quod_linguam(clavem_optionem, optionem.objectivum_linguam, optionem.agendum_linguam)
    // console.log(clavem)

    if (!scientia_basi[optionem.codicem][clavem][terminum_indicem]) {
      return false
    }
    // [<0:referens_nomen>, <1:linguam>, <2:terminum_indicem>]
    return [scientia_basi[optionem.codicem][clavem][terminum_indicem], clavem, terminum_indicem]
  }

  /**
   * @deprecated deprecated with abstractum_syntaxim_arborem_de_conscientiam()
   **/
  static quod_linguam(optionem = [], objectivum_linguam = null, agendum_linguam = []) {
    // @TODO create javascript version of bcp47_langtag
    //       https://github.com/EticaAI/tico-19-hxltm/blob/main/scripts/fn/linguacodex.py#L1064
    let aliquid = false
    if (!objectivum_linguam || !agendum_linguam) {
      return optionem[0]
    }
    if (objectivum_linguam) {
      for (let opt of optionem) {
        if (opt.toLowerCase() == objectivum_linguam) {
          return opt
        }
      }
    } else if (agendum_linguam) {
      for (agendum in agendum_linguam) {
        if (agendum === '*') {
          aliquid = true
        }
        for (let opt of optionem) {
          if (opt.toLowerCase() == agendum) {
            return opt
          }
        }
      }
    }
    if (aliquid) {
      return optionem[0]
    }

    return false
  }


  /**
   * @deprecated use quod_significationem_de_caput_item()
   **/
  static __quod_codicem(textum) {
    // @see https://stackoverflow.com/questions/14891129
    //      /regular-expression-pl-and-pn/14891168
    // let removedText = textum.replace(/\D+/g, '');
    let coniunctum = 0
    let codicem_completum = null
    // let codicem_cor = textum.replace(/[^0-9_~\.\^\-\[\]\(\)\{\}]/g, '');
    let codicem_cor = textum.replace(/[^0-9_~\:\^\-\[\]\(\)\{\}]/g, '');
    if (codicem_cor.match(/\((.*)\)/)) {
      codicem_cor = codicem_cor.match(/\((.*)\)/).pop()
    }
    if (codicem_cor.match(/\[(.*)\]/)) {
      codicem_cor = codicem_cor.match(/\[(.*)\]/).pop()
    }
    if (codicem_cor.indexOf("~") > -1) {
      let temp = codicem_cor.split("~")
      codicem_cor = temp[0]
      // entitatem = parseInt(temp[1])
    } else {
      codicem_completum = codicem_cor
    }

    // @TODO alternative-name--12-34
    // @TODO altrrnative-nane_12-34

    // console.log(textum_cor, textum)
    // @TODO: textum without code parts

    return [codicem_completum, codicem_cor, coniunctum, textum]
  }

  static __quod_conceptum(datum, codicem) {
    if (datum[codicem]) {
      return datum[codicem]
    }
    return null
  }

  static __quod_terminum(conceptum, objectivum_linguam, agendum_linguam) {
    // console.log(objectivum_linguam, conceptum[objectivum_linguam])
    if (conceptum[objectivum_linguam] && conceptum[objectivum_linguam]['0']) {
      return conceptum[objectivum_linguam]['0']
    }
    if (agendum_linguam) {
      agendum_linguam.forEach(item => {
        if (conceptum[item] && conceptum[item]['0']) {
          return conceptum[item]['0']
        }
      });
    }
    return null
  }

  static __quod_resumens(fontem, ast_rem) {
    let resultatum = {
      fontem: fontem,
      objectivum: []
    }
    ast_rem.forEach(item => {
      resultatum.objectivum.push(item.est_textum)
    });

    return resultatum
  }


  /**
   * @see https://stackoverflow.com/questions/1293147/example-javascript-code-to-parse-csv-data/14991797#14991797
   **/
  static __parseCSV(str) {
    var arr = [];
    var quote = false;  // 'true' means we're inside a quoted field

    // Iterate over each character, keep track of current row and column (of the returned array)
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
      var cc = str[c], nc = str[c + 1];        // Current character, next character
      arr[row] = arr[row] || [];             // Create a new row if necessary
      arr[row][col] = arr[row][col] || '';   // Create a new column (start with empty string) if necessary

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current column and skip the next character
      if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

      // If it's just one quotation mark, begin/end quoted field
      if (cc == '"') { quote = !quote; continue; }

      // If it's a comma and we're not in a quoted field, move on to the next column
      if (cc == ',' && !quote) { ++col; continue; }

      // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
      // and move on to the next row and move to column 0 of that new row
      if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

      // If it's a newline (LF or CR) and we're not in a quoted field,
      // move on to the next row and move to column 0 of that new row
      if (cc == '\n' && !quote) { ++row; col = 0; continue; }
      if (cc == '\r' && !quote) { ++row; col = 0; continue; }

      // Otherwise, append the current character to the current column
      arr[row][col] += cc;
    }
    return arr;
  }

  /**
   * _[eng-Latn]Convert from tabular format to object format. Mostly used
   * to use example tables already labeled with codes trying to merge
   * everything as if was a planned ontology
   * [eng-Latn]_
   */
  static codex_de_tabulam_in_obiectum(usum_professori_tabulam) {
    let obiectum = {}

    let codex = new CodexDeTabulam()

    usum_professori_tabulam.forEach(lineam => {
      // console.log('lineam', lineam)
      let titulum = lineam.shift()
      let linguam = lineam.shift()
      // console.log('lineam', lineam)

      while (lineam.length > 0) {
        let sig = null
        if (lineam[0]) {
          sig = Primitivum.quod_significationem_de_caput_item(lineam[0])
          // console.log('sig', sig)
          if (sig[3]) {
            // console.log('foi', sig)
            codex.addereRem(sig[3], linguam, sig[1])
          }
        }
        lineam.shift()
      }
    });

    // quod_significationem_de_caput_item()

    codex.praeparare()

    console.log('codex usum_professori_tabulam', usum_professori_tabulam)
    console.log('codex resultatum', codex.resultatum())

    // return usum_professori_tabulam
    return codex.resultatum()
  }


  /**
   * Flat a deep object into single line array with keys and arrays
   * 
   * Trivia:
   * - "līnea", https://en.wiktionary.org/wiki/linea#Latin
   * - "-tio", https://en.wiktionary.org/wiki/-tio#Latin
   * - (Protologism, https://en.wikipedia.org/wiki/Protologism)
   **/
  static lineatio(obiectum) {
    let resultatum = []

    const getEntries = (o, prefix = '') =>
      Object.entries(o).flatMap(([k, v]) =>
        // Object(v) === v ? getEntries(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]]
        // Object(v) === v ? getEntries(v, `${prefix}${k}:`) : [[`${prefix}${k}`, v]]
        Object(v) === v ? getEntries(v, `${prefix}${k}`) : [[`${prefix}?${k}`, v]]
      )

    // return Object.fromEntries(getEntries(obiectum))
    Object.entries(Object.fromEntries(getEntries(obiectum))).forEach(pair => {

      // resultatum.push(`${pair[0]}::${pair[1]}`)
      // resultatum.push(`${pair[0]}:::${pair[1]}`)
      resultatum.push(`${pair[0]}=((${pair[1]}))`)
    });

    return resultatum
  }

  /**
   * ōrdō de cōdicem
   * _[eng-Latn] The rank of of a pure code [eng-Latn]_
   *
   * Trivia:
   * - "cōdicem", https://en.wiktionary.org/wiki/codex#Latin
   * - "cōdicem", https://en.wiktionary.org/wiki/ordinatio
   *
   * @param {string} codicem_purum 
   * @returns {number}
   */
  static ordoDeCodicem(codicem_purum) {
    // throw "@deprecated use Primitivum.lineatio"
    // return Primitivum.lineatio(obiectum)

    if (codicem_purum) {
      // return codicem_purum.split('.').length
      return codicem_purum.split(':').length
    }
    return -1
  }

  /**
   * _[eng-Latn]
   * (Debug) what does this text means into Unicode General Category Property
   * (using JavaScript Engine) regexes?
   * [eng-Latn]_
   *
   * @see https://www.unicode.org/reports/tr44/#General_Category_Values
   * @see https://unicode.org/reports/tr18/#General_Category_Property
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
   *
   * @example
   * ['12.34~5', '١٢.٣٥', '[12.34~5]', '[12.34~5] lorem ipsum', ' Lorem Ipsum [12.34~5]', '[١٢.٣٥] لوريم إيبسوم', 'lorem-ipsum_12-34', 'lorem-ipsum--12-34'].map(Primitivum.quod_significationem_in_regula)
   *
   * @param {string} textum
   * @returns {array}
   */
  static quod_significationem_in_regula(textum) {
    let resultatum = []
    const RegulaSystemaScribo = /\p{General_Category=Letter}/gu
    const RegulaNumerum = /\p{General_Category=Number}/gu
    const RegulaNumerumDigitum = /\p{General_Category=Decimal_Number}/gu
    const RegulaPunctumInitiale = /\p{General_Category=Open_Punctuation}/gu
    const RegulaPunctumFinale = /\p{General_Category=Close_Punctuation}/gu
    const RegulaSublineam = /\p{General_Category=Connector_Punctuation}/gu
    // @TODO: Non-latinum terminum? https://en.wiktionary.org/wiki/hyphen
    const RegulaHuphen = /\p{General_Category=Dash_Punctuation}/gu
    const RegulaExtrapunctum = /\p{General_Category=Other_Punctuation}/gu
    const RegulaSymbolum = /\p{General_Category=Symbol}/gu
    const RegulaMathematicam = /\p{General_Category=Math_Symbol}/gu

    // // FULL STOP U+002E https://www.compart.com/en/unicode/U+002E
    // const SignificationemSeparatum = '.'
    // // TILDE (U+007E) https://www.compart.com/en/unicode/charsets/containing/U+007E
    // const SignificationemConiunctum = '~'

    // Strict regex
    // const RegulaCodicemPurum = /^(\p{General_Category=Decimal_Number}[\p{General_Category=Decimal_Number}|\.|~]*\p{General_Category=Decimal_Number})$/u
    // const oi = /^(p{General_Category=Decimal_Number}[p{General_Category=Decimal_Number}|.|~]*p{General_Category=Decimal_Number})$/
    // const oi = /^(\p{General_Category=Decimal_Number}[\p{General_Category=Decimal_Number}|\.|~]*\p{General_Category=Decimal_Number})$/
    // const RegulaCodicemPurum = `(\\p{General_Category=Decimal_Number}[\\p{General_Category=Decimal_Number}|\.|~]*\\p{General_Category=Decimal_Number})`
    const RegulaCodicemPurum = `(\\p{General_Category=Decimal_Number}[\\p{General_Category=Decimal_Number}|\:|~]*\\p{General_Category=Decimal_Number})`
    const RegulaCodicemInVasum = `(\\p{General_Category=Open_Punctuation}${RegulaCodicemPurum}\\p{General_Category=Close_Punctuation})`
    // const RegulaCodicemInVasum = /^(\p{General_Category=Decimal_Number}[\p{General_Category=Decimal_Number}|\.|~]*\p{General_Category=Decimal_Number})$/u

    const RegulaInitiale = /^\p{General_Category=Open_Punctuation}(.*)\p{General_Category=Close_Punctuation}.?/u
    const RegulaFinale = /.?\p{General_Category=Open_Punctuation}(.*)\p{General_Category=Close_Punctuation}$/u
    // const RegulaNumerumInitialeEtFinale = /^\p{General_Category=Decimal_Number}([\p{General_Category=Decimal_Number}|\.|~]*)\p{General_Category=Decimal_Number}$/u

    textum = textum.trim()

    const __RegulaCodicemPurum = new RegExp('^' + RegulaCodicemPurum + '$', 'u')
    if (__RegulaCodicemPurum.test(textum)) {
      resultatum.push(`RegulaCodicemPurum ${quod_significationem_in_digitum(textum.match(__RegulaCodicemPurum)[0])}`)
      // resultatum.push(textum.match(RegulaCodicemPurum))
    } else {
      // resultatum.push('RegulaCodicemPurum')
    }

    const __RegulaCodicemPurumInVasum = new RegExp('^' + RegulaCodicemInVasum + '$', 'u')
    if (__RegulaCodicemPurumInVasum.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasum)
      resultatum.push(`RegulaCodicemInVasum ${quod_significationem_in_digitum(temp[2])} ${temp[1]}`)
      // resultatum.push(temp)
    } else {
      // resultatum.push('Non RegulaCodicemInVasum')
    }

    const __RegulaCodicemPurumInVasumInitiale = new RegExp('^' + RegulaCodicemInVasum + '(.+)$', 'u')
    if (__RegulaCodicemPurumInVasumInitiale.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasumInitiale)
      resultatum.push(`RegulaCodicemPurumInVasumInitiale ${quod_significationem_in_digitum(temp[2])} ${temp[1]} <<${temp[3].trim()}>>`)
      resultatum.push(temp)
    } else {
      // resultatum.push('Non RegulaCodicemPurumInVasumInitiale')
    }

    const __RegulaCodicemPurumInVasumFinale = new RegExp('^(.+)' + RegulaCodicemInVasum + '$', 'u')
    if (__RegulaCodicemPurumInVasumFinale.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasumFinale)
      resultatum.push(`RegulaCodicemPurumInVasumFinale ${quod_significationem_in_digitum(temp[3])} ${temp[2]} <<${temp[1].trim()}>>`)
      resultatum.push(temp)
    } else {
      // resultatum.push('Non RegulaCodicemPurumInVasumInitiale')
    }

    // if (RegulaNumerumInitialeEtFinale.test(textum)) {
    //   resultatum.push(`RegulaNumerumInitialeEtFinale`)
    //   resultatum.push(textum.match(RegulaNumerumInitialeEtFinale))
    // } else {
    //   // resultatum.push('NonRegulaNumerumInitialeEtFinale')
    // }

    if (RegulaInitiale.test(textum)) {
      resultatum.push(`RegulaInitiale`)
      resultatum.push(textum.match(RegulaInitiale))
    } else {
      // resultatum.push('NonRegulaInitiale')
    }

    if (RegulaFinale.test(textum)) {
      resultatum.push(`RegulaFinale`)
      resultatum.push(textum.match(RegulaFinale))
    } else {
      // resultatum.push('NonRegulaFinale')
    }

    if (RegulaSystemaScribo.test(textum)) {
      resultatum.push(`RegulaSystemaScribo ${textum.replace(/\P{General_Category=Letter}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaSystemaScribo')
    }

    if (RegulaNumerum.test(textum)) {
      resultatum.push(`RegulaNumerum ${textum.replace(/\P{General_Category=Number}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaNumerum')
    }

    if (RegulaNumerumDigitum.test(textum)) {
      resultatum.push(`RegulaNumerumDigitum ${textum.replace(/\P{General_Category=Decimal_Number}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaNumerumDigitum')
    }

    if (RegulaPunctumInitiale.test(textum)) {
      resultatum.push(`RegulaPunctumInitiale ${textum.replace(/\P{General_Category=Open_Punctuation}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaPunctumInitiale')
    }

    if (RegulaPunctumFinale.test(textum)) {
      resultatum.push(`RegulaPunctumFinale ${textum.replace(/\P{General_Category=Close_Punctuation}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaPunctumFinale')
    }

    if (RegulaSublineam.test(textum)) {
      resultatum.push(`RegulaSublineam ${textum.replace(/\P{General_Category=Connector_Punctuation}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaSublineam')
    }
    if (RegulaHuphen.test(textum)) {
      resultatum.push(`RegulaHuphen ${textum.replace(/\P{General_Category=Dash_Punctuation}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaHuphen')
    }

    if (RegulaExtrapunctum.test(textum)) {
      resultatum.push(`RegulaExtrapunctum ${textum.replace(/\P{General_Category=Other_Punctuation}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaExtrapunctum')
    }

    if (RegulaSymbolum.test(textum)) {
      resultatum.push(`RegulaSymbolum ${textum.replace(/\P{General_Category=Symbol}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaSymbolum')
    }

    if (RegulaMathematicam.test(textum)) {
      resultatum.push(`RegulaMathematicam ${textum.replace(/\P{General_Category=Math_Symbol}/gu, '')}`)
    } else {
      // resultatum.push('NonRegulaMathematicam')
    }

    return resultatum
  }


  /**
   * @deprecated use Primitivum.quod_significationem_de_caput_item()
   *
   * Trivia:
   * - significātiōnem, https://en.wiktionary.org/wiki/significatio#Latin
   * - pūrum, https://en.wiktionary.org/wiki/purus#Latin
   * - abstractum, https://en.wiktionary.org/wiki/purus#Latin
   *
   * @example
   * // returns [3, '12.34~3', '12.34', 3]
   * quod_significationem_de_codicem_purum('12.34~2', 3)
   *
   * @example
   * // returns [3, '12.34~3', '12.34', 3]
   * quod_significationem_de_codicem_purum('12.34', 4)
   *
   * @example
   * // returns [3, '12.34.56~3', '12.34.56', 3, ['12', '12.34']]
   * quod_significationem_de_codicem_purum('12', -1, true)
   *
   * @param {string} [codicem_purum]
   * @param {number} indicem
   * @param {bool} [abstractum]
   * @returns {array}
   */
  static quod_significationem_de_codicem_purum(codicem_purum, indicem, abstractum) {
    // coniunctum = 0: De anglicum "Broadcast address"
    // @see https://en.wikipedia.org/wiki/Broadcast_address
    let coniunctum = 0
    let codicem_completum = codicem_purum
    let codicem_radicem = ''
    let patrem = []

    if (!codicem_purum) {
      throw "codicem_purum?";
    }

    if (codicem_purum.length < 5 && !abstractum) {
      throw `codicem_purum > [00.00]? [${codicem_purum}]`;
    }
    // @TODO: check if starts and ends with digit

    if (codicem_purum.indexOf("~") > -1) {
      let temp = codicem_purum.split("~")
      codicem_radicem = temp[0]
      coniunctum = parseInt(temp[1])
    } else {
      codicem_radicem = codicem_purum
    }
    // let temp_parts = codicem_radicem.split('.')
    let temp_parts = codicem_radicem.split(':')
    if (temp_parts.length > 1) {
      // let temp_patrem = codicem_radicem.split('.')
      do {
        // console.log('oi', temp_parts)
        temp_parts.pop();
        // patrem.push(temp_parts.join('.'))
        patrem.push(temp_parts.join(':'))
      } while (temp_parts.length > 0);

      patrem = patrem.filter(col => col != "").reverse()
    }

    return [indicem, codicem_completum, codicem_radicem, coniunctum, patrem]
  }

  /**
   * Trivia:
   * - significātiōnem, https://en.wiktionary.org/wiki/significatio#Latin
   * - cōdicem, https://en.wiktionary.org/wiki/codex#Latin
   * - aliud, https://en.wiktionary.org/wiki/alius#Latin
   * - typum, https://en.wiktionary.org/wiki/typus#Latin
   * - fontem, https://en.wiktionary.org/wiki/fons#Latin
   *
   * @example <caption>00.00~0</caption>
   * // returns [1, '12.34~5', '', '12.34~5']
   * Primitivum.quod_significationem_de_caput_item('12.34~5')
   *
   * @example <caption>[00.00~0]</caption>
   * // returns [2, '12.34~5', '', '[12.34~5]
   * Primitivum.quod_significationem_de_caput_item('[12.34~5]')
   *
   * @example <caption>[00.00~0] 00=(...); []=(...);</caption>
   * // returns [2, '12.34~5', '', '﹇١٢.٣٤~٥﹈']
   * Primitivum.quod_significationem_de_caput_item('﹇١٢.٣٤~٥﹈')
   *
   * @example
   * // returns [3, '12.34', '//نام جایگزین//', '[12.34] //نام جایگزین//']
   * Primitivum.quod_significationem_de_caput_item('[12.34] //نام جایگزین//')
   *
   * @example
   * // returns @TODO
   * Primitivum.quod_significationem_de_caput_item('alternative-name--12-34')
   *
   * @example
   * // returns @TODO
   * Primitivum.quod_significationem_de_caput_item('备用名称_12-34')
   *
   * @param {string} [textum]
   * @returns {array}
   */
  static quod_significationem_de_caput_item(textum) {
    let typum = -1 // -1: non-codicem; 1: numerum purum; 2 [00.00];
    let aliud = ''
    let codicem_completum = ''
    let codicem_radicem = ''
    let codicem_coniunctum = -1
    // let fontem = textum

    // Full test
    // ['12.34~5', '١٢.٣٥', '[12.34~5]', '[12.34~5] lorem ipsum', ' Lorem Ipsum [12.34~5]', '[١٢.٣٥] لوريم إيبسوم', 'lorem-ipsum_12-34', 'lorem-ipsum--12-34'].map(quod_significationem_de_caput_item)

    // @see https://www.unicode.org/reports/tr44/#General_Category_Values
    // Regula cor: 00.00~0
    const RegulaCodicemPurum = `(\\p{General_Category=Decimal_Number}[\\p{General_Category=Decimal_Number}|\.|~]*\\p{General_Category=Decimal_Number})`
    // Regula cor: [00.00~0]
    const RegulaCodicemInVasum = `(\\p{General_Category=Open_Punctuation}${RegulaCodicemPurum}\\p{General_Category=Close_Punctuation})`

    // Regula de factum: /^00.00~0$/
    const __RegulaCodicemPurum = new RegExp('^' + RegulaCodicemPurum + '$', 'u')
    // Regula de factum: /^[00.00~0]$/
    const __RegulaCodicemPurumInVasum = new RegExp('^' + RegulaCodicemInVasum + '$', 'u')
    // Regula de factum: /^[00.00~0] aliud $/
    const __RegulaCodicemPurumInVasumInitiale = new RegExp('^' + RegulaCodicemInVasum + '(.+)$', 'u')
    // Regula de factum: /^ aliud [00.00~0]$/
    const __RegulaCodicemPurumInVasumFinale = new RegExp('^(.+)' + RegulaCodicemInVasum + '$', 'u')

    // Punctuation, connector, 	Includes "_" underscore
    // https://www.compart.com/en/unicode/category/Pc
    //
    // Punctuation, dash, 	Includes "-" dash
    // https://www.compart.com/en/unicode/category/Pd
    //
    // Punctuation, open [, {, ﹇
    // https://www.compart.com/en/unicode/category/Ps
    //
    // Punctuation, close ], }, ﹈
    // https://www.compart.com/en/unicode/category/Pe
    //
    // Punctuation, other . , * ! ?
    // https://www.compart.com/en/unicode/category/Po
    // 
    // Math Symbol

    if (__RegulaCodicemPurum.test(textum)) {
      typum = 1
      codicem_completum = Primitivum.quod_significationem_in_digitum(textum.match(__RegulaCodicemPurum)[0])
      // resultatum.push(textum.match(RegulaCodicemPurum))

    } else if (__RegulaCodicemPurumInVasum.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasum)
      typum = 2
      codicem_completum = Primitivum.quod_significationem_in_digitum(temp[2])

    } else if (__RegulaCodicemPurumInVasumInitiale.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasumInitiale)
      typum = 3
      codicem_completum = Primitivum.quod_significationem_in_digitum(temp[2])
      aliud = temp[3].trim()

    } else if (__RegulaCodicemPurumInVasumFinale.test(textum)) {
      let temp = textum.match(__RegulaCodicemPurumInVasumFinale)
      typum = 4
      codicem_completum = Primitivum.quod_significationem_in_digitum(temp[3])
      aliud = temp[1].trim()

    } else {
      // @TODO: implement parsing pattterns like these
      //        - alternative-name--12-34
      //        - altrrnative-nane_12-34
      //        - 备用名称--12-34
      //        - மாற்று பெயர்--12-34
    }
    if (codicem_completum.length > 0) {
      if (codicem_completum.indexOf("~") > -1) {
        let temp = codicem_completum.split("~")
        codicem_radicem = temp[0]
        codicem_coniunctum = parseInt(temp[1])
      } else {
        // console.log('codicem_completum.length', codicem_completum.length, codicem_completum)
        codicem_radicem = codicem_completum
        codicem_coniunctum = 0
      }
    }
    if (codicem_coniunctum === -1) {
      aliud = textum
    }

    // console.log([typum, aliud, codicem_completum, codicem_radicem, codicem_coniunctum])
    return [typum, aliud, codicem_completum, codicem_radicem, codicem_coniunctum]
  }

  /**
   * @see https://github.com/HXL-CPLP/forum/issues/60#issuecomment-997185201
   *
   * @example
   * Primitivum.quod_significationem_in_digitum('١٢.٣٥')
   * 
   * @param {string} codicem_purum 
   * @param {number} in_indicem 
   * @returns 
   */
  static quod_significationem_in_digitum(codicem_purum, in_indicem = 0) {
    if (!codicem_purum || codicem_purum.length === 0) {
      return ''
    }
    let resultatum = ''
    for (const [index, rem] of codicem_purum.split('').entries()) {
      resultatum = resultatum + Primitivum.quod_significationem_in_digitum_de_atomum(rem)
    }
    return resultatum
  }

  /**
   * @example
   * Primitivum.quod_significationem_in_digitum_de_atomum('١')
   *
   * @param {string} atom 
   * @returns 
   */
  static quod_significationem_in_digitum_de_atomum(atom) {
    const datum = [
      '0123456789', // DIGIT ZERO (...) DIGIT NINE
      '٠١٢٣٤٥٦٧٨٩', // 	ARABIC-INDIC DIGIT ZERO (...) ARABIC-INDIC DIGIT NINE
      '߀߁߂߃߄߅߆߇߈߉', // 	U+07C0	NKO DIGIT ZERO (...) U+07C9	NKO DIGIT NINE
      '०१२३४५६७८९', // U+0966	DEVANAGARI DIGIT ZERO (...) U+096F	DEVANAGARI DIGIT NINE
      // @TODO: This function is obviously partial. Eventually It needs a better alternative.
      //        See this comment
      //        https://github.com/HXL-CPLP/forum/issues/60#issuecomment-997185201
    ]
    // https://www.fileformat.info/info/unicode/category/Nd/list.htm

    for (let NumerumSystema of datum) {
      // console.log('NumerumSystema', NumerumSystema)
      for (const [index, rem] of NumerumSystema.split('').entries()) {
        if (atom === rem) {
          return index
        }
      }
    }
    // _[eng-Latn]Worst case: we return the item, without changes[eng-Latn]_
    return atom
  }
}

/**
scientia_basi = jsyaml.load(CoreMirrorOntologia.getValue(), 'utf8');
scientia = new CodexDeObiectum(scientia_basi)
scientia.estLinguamObjectivae(document.querySelector('#objectivum_linguam').value.split(','))
scientia.estLinguamAuxilio(document.querySelector('#auxilium_linguam').value.split(','))
scientia.estLinguamAgendae(document.querySelector('#agendum_linguam').value.split(','))
scientia.praeparare()
scientia.quod_terminum('12')
// scientia.reversumLogicae('alternative name')
*/
class CodexDeObiectum extends Numerordinatio {
  // @deprecated use Numerordinatio
  constructor(datum_de_factum) {
    super();
    this.datum_de_factum = datum_de_factum;
    this.datum_reconstructum = {};
  }
  // praeparare() {
  //   // console.log('this.datum_reconstructum', this.datum_reconstructum)
  //   this.datum_reconstructum = this.datum_de_factum
  //   return this
  // }
  quod_de_factum() {
    return this.datum_de_factum
  }

}

class CodexDeTabulam extends Numerordinatio {
  // @deprecated use Numerordinatio
  constructor(datum_de_factum = {}) {
    super();
    this.datum_de_factum = datum_de_factum;
    this.datum_reconstructum = {};
  }

  resultatum() {
    return this.datum_reconstructum
  }
}

class NumerordinatioAST {

  constructor(ast, optionem = {}) {
    this.ast = ast;
    this.titulum = optionem.titulum || ''
    this.annotationem = optionem.annotationem || ''
  }

  // inDot(ast, titulum, annotationem = '') {
  inDot() {
    let resultatum = []
    // const sumarium = ast_in_summarium(ast)
    // return sumarium
    let ast = this.ast
    let titulum = this.titulum
    let annotationem = this.annotationem

    let dot = new Graphviz(titulum)

    if (annotationem) {
      dot.addAnnotation(annotationem)
    }

    for (let lineam of ast[3]) {
      if (!lineam) {
        continue
      }

      // Habesne codicem? [00.00]
      // Nom codicem? Indicem (0)
      let label = (lineam[5] ? `[${lineam[5]}]` : `(${lineam[0]})`)

      // <8:referens_nomen>?
      if (lineam[8]) {
        label = label + '\\n' + lineam[8]
      } else {
        label = label + '\\n---'
      }
      // // <3:aliud_caput> ?
      // if (lineam[3]) {
      //   label = label + ' \\n' + lineam[3]
      // } else {
      //   label = label + '\\n---'
      // }

      dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': __codicem_rank(lineam[5]) }, { 'label': label, style: 'dotted' })
      if (lineam[7]) {
        dot.addRelIndirect(`_${lineam[0]}`, lineam[7].map(x => '_' + x))
      }
    }

    for (let lineam of ast[0]) {
      if (!lineam) {
        continue
      }

      let label = (lineam[5] ? `[${lineam[5]}]` : `(${lineam[0]})`)

      // <8:referens_nomen>?
      if (lineam[8]) {
        label = label + '\\n' + lineam[8]
      } else {
        label = label + '\\n---'
      }
      // <3:aliud_caput> ?
      if (lineam[3]) {
        label = label + ' \\n' + lineam[3]
      } else {
        label = label + '\\n---'
      }

      // dot.addNode(`_${lineam[0]}`, {'cluster': lineam[6]}, { 'label': label })
      dot.addNode(`_${lineam[0]}`, { 'cluster': lineam[6], 'rank': __codicem_rank(lineam[5]) }, { 'label': label })
      // console.log(lineam)
    }
    if (dot.hasCluster('-1')) {
      // console.log('tem')
      dot.addCluster('-1', { 'label': '?' })
    }

    return dot.render()
  }

  // document.querySelector('#testum_dot').value = ast_in_dot_numerae(abstractum_syntaxim_arborem(['12.10.34', '12.10.34~2', '', '14.56', '14.56', '14.56~2'])
  // ast_in_dot_numerae(abstractum_syntaxim_arborem(['12.10.34', '12.10.34~2', '', '14.56', '14.56', '14.56~2']))
  // summārium, https://en.wiktionary.org/wiki/summarium
  // inDotNumerae(ast, titulum) {
  // inDotNumerae(ast, titulum) {
  inDotNumerae() {
    let ast = this.ast
    let titulum = this.titulum
    let resultatum = []
    const sumarium = ast_in_summarium(ast)
    // return sumarium

    resultatum.push(`digraph "${titulum}" {`)
    Object.entries(sumarium).forEach(([clavem, rem_simplex]) => {
      console.log(`${clavem} ${rem_simplex}`); // "a 5", "b 7", "c 9"
      // let rem_simplex_q = rem_simplex.reduce(function (acc, val) {
      //   return acc + ` "${val}"`
      // })
      let rem_simplex_q = rem_simplex.map(function (item) {
        return `"${item}"`
      }).join(" ");
      // rem_simplex.forEach(it => {
      //   rem_simplex_q
      // });
      resultatum.push(`  subgraph "cluster_${clavem}" {${rem_simplex_q}}`)
    });
    // resultatum.push('A -> {B C}')
    resultatum.push('}')
    return resultatum.join("\n")
  }
}



// CoreMirrorTestumDot.setValue(ast_in_dot_v2(abstractum_syntaxim_arborem(['Attacker name [12.10.34~1]', '', 'Survivor name [12.10.34~2]', 'Something else', 'Company name [14.56~2]']), 'title'))
class Graphviz {
  constructor(title, type = "strict graph", options = {}) {
    this.title = title;
    this.type = type;
    this.options = options;
    this.clusters = {}
    this.nodes = {}
    this.ranks = {}
    this.reldirect = {}
    this.relindirect = {}
    this.annotations = []
  }

  addAnnotation(annotation) {
    this.annotations.push(annotation)
    return this
  }

  addCluster(cluster_id, options = {}) {
    let _cluster = {
      'id': cluster_id,
      'options': options || {}
    }
    this.clusters[cluster_id] = _cluster
    return this
  }

  // addNode(node_id, cluster = null, options = {}) {
  addNode(node_id, meta = {}, options = {}) {
    let _node = {
      'id': node_id,
      'cluster': (meta && meta.cluster ? meta.cluster : null),
      'options': options || {},
      'rank': (meta && meta.rank ? meta.rank : null),
      'verbose': (meta && meta.verbose ? meta.verbose : null)
    }
    this.nodes[node_id] = _node

    if (meta && meta.cluster && !this.clusters[meta.cluster.toString()]) {
      this.addCluster(meta.cluster)

      // Only try add rank for non clusterized (this seems to disable cluster view)
    } else if (meta && meta.rank) {
      if (!this.ranks[meta.rank.toString()]) {
        this.ranks[meta.rank.toString()] = new Set()
      }
      this.ranks[meta.rank.toString()].add(node_id)
    }
    return this
  }

  addRelDirect(source_id, target_ids) {
    if (!this.type.indexOf('digraph') > -1) {
      throw "Graphviz: addRelDirect != type digraph [" + this.type + ']'
    }
    source_id = source_id.toString()
    if (!this.reldirect[source_id]) {
      this.reldirect[source_id] = new Set()
    }
    // this.reldirect[source_id] = this.reldirect[source_id].concat(target_ids)
    target_ids.forEach(item => this.reldirect[source_id].add(item))
    return this
  }

  addRelIndirect(source_id, target_ids = []) {
    if (this.type.indexOf('digraph') > -1) {
      throw "Graphviz: addRelIndirect != type digraph. [" + this.type + ']'
    }
    source_id = source_id.toString()
    if (!this.relindirect[source_id]) {
      this.relindirect[source_id] = new Set()
    }
    // target_ids.forEach(this.relindirect[source_id].add, target)
    target_ids.forEach(item => this.relindirect[source_id].add(item))
    // console.log('addRelIndirect', source_id, target_ids, this.relindirect)
    // this.relindirect[source_id] = this.relindirect[source_id].concat(target_ids)
    return this
  }

  hasCluster(cluster_id) {
    let keys = Object.keys(this.clusters)
    console.log('hasCluster', cluster_id)
    return keys.includes(cluster_id)
  }

  render() {
    let result = []
    let _q = this._q

    if (this.annotations.length) {
      for (let annotation of this.annotations) {
        result.push('# ' + annotation)
      }
      result.push('')
    }

    result.push(`${this.type} ${this._q(this.title)} {`)
    if (this.options && Object.keys(this.options).length !== 0) {
      if (this.options.node) {
        result.push(`  node [${this._renderOptions(this.options.node)}]`)
      }
      // result.push(`  ${this._renderOptions(this.options)}`)
    }

    for (let [key, value] of Object.entries(this.nodes)) {
      if (!value.cluster) {
        let __verbose = ''
        if (value.verbose && value.verbose.length > 0) {
          let __varr = []
          value.verbose.forEach(item => {
            __varr.push(_q(item))
          });
          __verbose = ' -- {node [shape=none style=""] ' + __varr.join(' ') + '}'
        }

        if (value.options && Object.keys(value.options).length !== 0) {
          result.push(`  ${this._q(value.id)} [${this._renderOptions(value.options)}]${__verbose}`)
        } else {
          result.push(`  ${this._q(value.id)}${__verbose}`)
        }
      }
    }
    for (let [key, value] of Object.entries(this.clusters)) {
      result.push(this._renderCluster(key))
    }
    result.push(this._renderRels())
    result.push(this._renderRanks())

    result.push('}')
    return result.join("\n")
  }

  _renderCluster(cluster) {
    let result = []
    result.push(`  subgraph "cluster_${cluster}" {`)
    if (this.clusters[cluster.toString()].options && Object.keys(this.clusters[cluster.toString()].options).length !== 0) {
      result.push(`    ${this._renderOptions(this.clusters[cluster.toString()].options)}`)
    }

    for (let [key, value] of Object.entries(this.nodes)) {
      if (value.cluster && value.cluster.toString() === cluster.toString()) {
        if (value.options && Object.keys(value.options).length !== 0) {
          result.push(`    ${this._q(value.id)} [${this._renderOptions(value.options)}]`)
        } else {
          result.push(`    ${this._q(value.id)}`)
        }
      }
    }

    result.push('  }')
    return result.join("\n")
  }

  _renderOptions(options) {
    let result = []
    for (let [key, value] of Object.entries(options)) {
      result.push(`${key}="${value}"`)
    }
    return result.join(' ')
  }

  // https://stackoverflow.com/questions/25734244/how-do-i-place-nodes-on-the-same-level-in-dot
  _renderRanks() {
    let result = []
    let _q = this._q
    for (let [key, value] of Object.entries(this.ranks)) {
      if (value.size > 1) {
        let temp = [...value].map(function (item) {
          return _q(item)
        }).join(" ");
        result.push(`  { rank=same ${temp} }`)
      } else {
        // No sense in rank only one item
        // result.push(`  ${_q(key)} -> ${_q([...value][0])}`)
      }
    }
    if (result.length > 0) {
      result.unshift('  newrank=true;')
    }
    return result.join("\n")
  }

  _renderRels() {
    let result = []
    let _q = this._q
    for (let [key, value] of Object.entries(this.reldirect)) {
      if (value.size > 1) {
        let temp = [...value].map(function (item) {
          return _q(item)
        }).join(" ");
        result.push(`  ${_q(key)} -> { ${temp} }`)
      } else {
        result.push(`  ${_q(key)} -> ${_q([...value][0])}`)
      }
    }
    for (let [key, value] of Object.entries(this.relindirect)) {
      // console.log('oi', value)
      if (value.size > 1) {
        let temp = [...value].map(function (item) {
          return _q(item)
        }).join(" ");
        result.push(`  ${_q(key)} -- { ${temp} }`)
      } else {
        result.push(`  ${_q(key)} -- ${_q([...value][0])}`)
      }
    }
    return result.join("\n")
  }

  _q(item) {
    // if (/^[\p{General_Category=Letter}].*$/i.test(item)) {
    //   return item
    // }
    return `"${item}"`
  }
}

// https://github.com/bpmlod/report
// https://github.com/cimiano/tbx2rdf
// https://github.com/liderproject/tbx2rdfservice
// http://tbx2rdf.lider-project.eu/converter/
// https://www.w3.org/TR/rdf11-concepts/
/*
let codex = (new CodexDeObiectum(jsyaml.load(CoreMirrorOntologia.getValue(), 'utf8')))
let ast =  codex.praeparare().exportareObiectum(true)
let rdf_ttl_urn = (new RDFProofOfConcept(ast)).exportArray()
rdf_ttl_urn
*/
class RDFProofOfConcept {
  constructor(ast) {
    this.ast = ast || {}
  }

  _initiale() {
    return ''
  }

  _corporeum() {
    let rdf_ttl_urn = []
    for (let [codicem, conceptum_significatini] of Object.entries(this.ast)) {
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        // rdf_ttl_urn.push(`      <termEntry id="__${codicem}__">`)
        for (let [linguam, terminum_collectionem] of Object.entries(conceptum_significatini)) {
          // rdf_ttl_urn.push(`        <langSet xml:lang="${linguam}">`)
          for (let [terminum_indicem, terminum_referens] of Object.entries(terminum_collectionem)) {
            // rdf_ttl_urn.push(`          <tig>`)
            // rdf_ttl_urn.push(`            <term>${terminum_referens}</term>`)
            // rdf_ttl_urn.push(`          </tig>`)
            rdf_ttl_urn.push(`<urn:${codicem}> <urn:93:2:47#${linguam}> "${terminum_referens}" .`)
          }
          // rdf_ttl_urn.push(`        <seg>${tmx_seg.join("\n")}</seg>`)

          // rdf_ttl_urn.push(`          </tig>`)
          // rdf_ttl_urn.push(`        </langSet>`)
        }
        // rdf_ttl_urn.push(`      </termEntry>`)
      }
    }

    return rdf_ttl_urn
  }

  _finale() {
    return ''
  }

  setAST(ast) {
    this.ast = ast
    return this
  }

  export() {
    let initiale = this._initiale()
    let finale = this._finale()
    let corporeum = this._corporeum()
    // return initiale + "\n" + corporeum + "\n" + finale
    return corporeum.join("\n")
  }
  exportArray() {
    // let initiale = this._initiale()
    // let finale = this._finale()
    let corporeum = this._corporeum()
    // return initiale + "\n" + corporeum + "\n" + finale
    return corporeum
  }
}

// http://www.ttt.org/oscarStandards/tbx/tbx_oscar.pdf
// http://www.ttt.org/oscarStandards/tbx/
// http://www.ttt.org/oscarStandards/tbx/TBXcoreStructV02.dtd
class TBXBasic2008 {
  constructor(options = {}) {
    this.title = options.title || 'ordonumerae';
    this.note = options.note || '';
    this.sourceDesc = options.sourceDesc || '';
    this.lang = options.lang || 'lat-Latn';
    this.system = options.system || 'TBXcoreStructV02.dtd';
    // this.system = options.system || 'http://www.ttt.org/oscarStandards/tbx/TBXcoreStructV02.dtd';
    // this.srclang = options.srclang || 'lat-Latn';
    // this.datatype = options.datatype || 'PlainText';
    this.ast = {}
  }

  _id(codicem) {
    return codicem.replace(/\:/g, '_')
  }

  // http://www.ttt.org/oscarStandards/tbx/TBXcoreStructV02.dtd
  // TBXBasiccoreStructV02.dtd"
  _initiale() {
    return `<?xml version='1.0'?>
<!DOCTYPE martif SYSTEM "${this.system}">
<martif type="TBX-Basic" xml:lang="${this.lang}">
<martifHeader>
<fileDesc>
  <titleStmt>
    <title>${this.title}</title>
    <note>${this.note}</note>
  </titleStmt>
  <sourceDesc>
    <p>${this.sourceDesc}</p>
  </sourceDesc>
</fileDesc>
</martifHeader>
  <text>
    <body>`
  }

  _corporeum() {
    let tbx_concepts = []
    for (let [codicem, conceptum_significatini] of Object.entries(this.ast)) {
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        tbx_concepts.push(`      <termEntry id="__${this._id(codicem)}__">`)
        for (let [linguam, terminum_collectionem] of Object.entries(conceptum_significatini)) {
          tbx_concepts.push(`        <langSet xml:lang="${linguam}">`)
          for (let [terminum_indicem, terminum_referens] of Object.entries(terminum_collectionem)) {
            tbx_concepts.push(`          <tig>`)
            tbx_concepts.push(`            <term>${terminum_referens}</term>`)
            tbx_concepts.push(`          </tig>`)
          }
          // tbx_concepts.push(`        <seg>${tmx_seg.join("\n")}</seg>`)

          // tbx_concepts.push(`          </tig>`)
          tbx_concepts.push(`        </langSet>`)
        }
        tbx_concepts.push(`      </termEntry>`)
      }
    }

    return tbx_concepts.join("\n")
  }
  _corporeum_rem() {
    return ''
  }

  _finale() {
    return `    </body>
  </text>
</martif>`
  }

  setAST(ast) {
    this.ast = ast
    return this
  }

  export() {
    let initiale = this._initiale()
    let finale = this._finale()
    let corporeum = this._corporeum()
    return initiale + "\n" + corporeum + "\n" + finale
  }
}


// https://www.gala-global.org/tmx-14b
class TMX {
  constructor(options = {}) {
    this.creationtool = options.creationtool || 'hxltm-ontologiae.js';
    this.creationtoolversion = options.creationtoolversion || '2021-12-23';
    this.segtype = options.segtype || 'sentence';
    this.adminlang = options.adminlang || 'lat-Latn';
    this.srclang = options.srclang || 'lat-Latn';
    this.datatype = options.datatype || 'PlainText';
    this.system = options.system || 'tmx14.dtd';
    // this.system = options.system || 'https://www.gala-global.org/sites/default/files/migrated-pages/docs/tmx14%20%281%29.dtd';
    this.ast = {}
  }

  _id(codicem) {
    return codicem.replace(/\:/g, '_')
  }

  _initiale() {
    return `<?xml version='1.0' encoding='utf-8'?>
<!DOCTYPE tmx SYSTEM "${this.system}">
<tmx version="1.4">
<header
  creationtool="${this.creationtool}"
  creationtoolversion="${this.creationtoolversion}"
  segtype="${this.segtype}"
  o-tmf="UTF-8"
  adminlang="${this.adminlang}"
  srclang="${this.srclang}"
  datatype="${this.datatype}"
  />
<body>`
  }

  _corporeum() {
    let tmx_concepts = []
    for (let [codicem, conceptum_significatini] of Object.entries(this.ast)) {
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        tmx_concepts.push(`    <tu tuid="__${this._id(codicem)}__">`)
        for (let [linguam, terminum_collectionem] of Object.entries(conceptum_significatini)) {
          tmx_concepts.push(`      <tuv xml:lang="${linguam}">`)
          let tmx_seg = []
          if (Object.keys(terminum_collectionem).length > 1) {
            for (let [terminum_indicem, terminum_referens] of Object.entries(terminum_collectionem)) {
              // tmx_concepts.push(`[${codicem}] ${terminum_referens}`)
              tmx_seg.push(`{[(${terminum_referens})]}`)
            }
          } else {
            tmx_seg.push(`${Object.values(terminum_collectionem)[0]}`)
          }
          tmx_concepts.push(`        <seg>${tmx_seg.join("\n")}</seg>`)

          tmx_concepts.push(`      </tuv>`)
        }
        tmx_concepts.push(`    </tu>`)
      }
    }

    return tmx_concepts.join("\n")
  }
  _corporeum_rem() {
    return ''
  }

  _finale() {
    return `  </body>
</tmx>`
  }

  setAST(ast) {
    this.ast = ast
    return this
  }

  export() {
    let initiale = this._initiale()
    let finale = this._finale()
    let corporeum = this._corporeum()
    return initiale + "\n" + corporeum + "\n" + finale
  }
}

class Auxilium {
  /**
   * _[eng-Latn] Normalize arrays of arrays all have same number of columns
   * [eng-Latn]_
   *
   * @example
   * Auxilium.array_collectionem_narmationi([[1, 2], [1,2], [4,5,6,7]])
   *
   * @param {array} array_de_array 
   * @returns {array}
   */
  static array_collectionem_narmationi(array_de_array) {
    let maximum = 0
    let temp1 = []
    let resultatum = []
    // console.log(array_de_array)
    for (let [index_1, item_1] of array_de_array.entries()) {
      // console.log(index_1, item_1)
      if (item_1 && item_1.length > 0 && item_1.filter(item => item).length > 0) {
        temp1.push(item_1)
        let maximum_non_vacuum = item_1.filter(item => item).length
        maximum = (maximum_non_vacuum > maximum ? maximum_non_vacuum : maximum)
      }
    }

    let resultatum_non_unicum = []
    if (temp1 && temp1.length) {
      for (let lineam of temp1) {
        // console.log('lineam', lineam)
        let neo_lineam = []
        for (let indicem of Array.from(Array(maximum).keys())) {
          // console.log('oioi', indicem, lineam[indicem])
          if (lineam[indicem]) {
            neo_lineam.push(lineam[indicem])
          } else {
            neo_lineam.push('')
          }
        }
        resultatum_non_unicum.push(neo_lineam)
      }

    }
    // _[eng-Latn] Remove duplicates [eng-Latn]_
    let stringArray = resultatum_non_unicum.map(JSON.stringify);
    let uniqueStringArray = new Set(stringArray);
    resultatum = Array.from(uniqueStringArray, JSON.parse);
    // resultatum = resultatum_non_unicum

    return resultatum

  }

  /**
  * Performs a deep merge of objects and returns new object. Does not modify
  * objects (immutable) and merges arrays via concatenation.
  *
  * @see https://stackoverflow.com/a/48218209/894546
  *
  * @param {...object} objects - Objects to merge
  * @returns {object} New object with merged key/values
  */
  static mergeDeep(...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];

        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(...oVal);
        }
        else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal);
        }
        else {
          prev[key] = oVal;
        }
      });

      return prev;
    }, {});
  }

}

export { Auxilium, datum_specificum, Numerordinatio, CodexDeObiectum, CodexDeTabulam, Graphviz, Primitivum, TMX, TBXBasic2008, RDFProofOfConcept }