// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
// console.log('numerordinatio.mjs')

class CodexBasim {
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
    let temp = codicem_radix.split('.')
    temp.pop()
    while (temp.length) {
      resultatum.push(temp.join('.'))
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
scientia_basi = jsyaml.load(CoreMirrorOntologia.getValue(), 'utf8');
scientia = new CodexDeObiectum(scientia_basi)
scientia.estLinguamObjectivae(document.querySelector('#objectivum_linguam').value.split(','))
scientia.estLinguamAuxilio(document.querySelector('#auxilium_linguam').value.split(','))
scientia.estLinguamAgendae(document.querySelector('#agendum_linguam').value.split(','))
scientia.praeparare()
scientia.quod_terminum('12')
// scientia.reversumLogicae('alternative name')
*/
class CodexDeObiectum extends CodexBasim {
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

class CodexDeTabulam extends CodexBasim {
  constructor(datum_de_factum = {}) {
    super();
    this.datum_de_factum = datum_de_factum;
    this.datum_reconstructum = {};
  }

  resultatum() {
    return this.datum_reconstructum
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
let rdf_ttl_urn = (new RDFProofOfConcept(ast)).export()
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
    let tbx_concepts = []
    for (let [codicem, conceptum_significatini] of Object.entries(this.ast)) {
      if (conceptum_significatini && Object.keys(conceptum_significatini).length > 0) {
        tbx_concepts.push(`      <termEntry id="__${codicem}__">`)
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
    return initiale + "\n" + corporeum + "\n" + finale
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
        tbx_concepts.push(`      <termEntry id="__${codicem}__">`)
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
        tmx_concepts.push(`    <tu tuid="__${codicem}__">`)
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



export { Auxilium, CodexBasim, CodexDeObiectum, CodexDeTabulam, Graphviz, TMX, TBXBasic2008, RDFProofOfConcept }