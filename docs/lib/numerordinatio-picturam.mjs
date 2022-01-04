// Dominium Publicum
// SPDX-License-Identifier: Unlicense

import { Auxilium, BCP47Langtag, Primitivum, codicem_separato } from './numerordinatio.mjs';
// import { datum_specificum } from './numerordinatio.mjs';
// import * as D3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.2.1/d3.js';
// import { * } from 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.2.1/d3.js'

// console.log('numerordinatio-picturam.mjs')

class Picturam {
  constructor(d3, radicem) {
    this.d3 = d3
    this.radicem = radicem
    this.data = {}
    this.codex = null
  }

  estData(data) {
    if (!data || !Object.keys(data).length) {
      throw "non data"
    }
    // console.log('ooi')

    // this.data = data
    this.data = Primitivum.codex_de_obiectum(data)

    // this.codex.praeparare(true)
    return this
  }

  fiatLux() {
    // console.log('fiatlux')
    console.log(this.data)
    // console.log(this.radicem)
  }
}

class PicturamDL extends Picturam {
  // constructor(d3, radicem) {
  //   super()
  //   this.d3 = d3
  //   this.radicem = d3.select(radicem)
  //   this.data = {}
  // }

  static _htmlDataAttributes(linguam){
    let crudum_html = []
    let bcp47 = new BCP47Langtag(linguam, null, false).resultatum()

    crudum_html.push(`data-significatum="1"`)
    if (bcp47.language){
      crudum_html.push(`data-bcp47-language="${bcp47.language}"`)
    }
    if (bcp47.language){
      crudum_html.push(`data-bcp47-language="${bcp47.language}"`)
    }
    if (bcp47.script){
      crudum_html.push(`data-bcp47-script="${bcp47.script}"`)
    }
    if (bcp47.region){
      crudum_html.push(`data-bcp47-region="${bcp47.region}"`)
    }
    if (bcp47.variant && bcp47.variant.length > 0){
      crudum_html.push(`data-bcp47-variant="${bcp47.variant.join(',')}"`)
    }
    // TODO: this is a nested object. Need different way to encode
    if (bcp47.extension && Object.keys(bcp47.extension).length > 0){
      crudum_html.push(`data-bcp47-extension="${bcp47.extension}"`)
    }
    if (bcp47.privateuse && bcp47.privateuse.length > 0){
      crudum_html.push(`data-bcp47-privateuse="${bcp47.privateuse.join(',')}"`)
    }

    // console.log('bcp47', bcp47)
    return crudum_html.join(' ')
  }

  inHtml() {
    let raw_html = ''
    // const RegulaCodicemPurum = `(\\p{General_Category=Decimal_Number}[\\p{General_Category=Decimal_Number}|\:|~]*\\p{General_Category=Decimal_Number})`
    // const RegulaCodicemInVasum = `(\\p{General_Category=Open_Punctuation}${RegulaCodicemPurum}\\p{General_Category=Close_Punctuation})`
    const RegulaNumerum = `([\\p{General_Category=Decimal_Number}]*)`
    const RegulaNumerumInVasum = `(\\p{General_Category=Open_Punctuation}${RegulaNumerum}\\p{General_Category=Close_Punctuation})`
    // const __RegulaCodicemPurumInVasum = new RegExp('^' + RegulaCodicemInVasum + '$', 'u')
    const __RegulaNumerumInVasum = new RegExp('^' + RegulaNumerumInVasum + '$', 'u')
    // console.log('fiatlux2')

    // console.log('teste {12}', __RegulaNumerumInVasum.test('{12}'))
    // console.log('teste 12', __RegulaNumerumInVasum.test('12'))
    // console.log('teste {9999}', __RegulaNumerumInVasum.test('{9999}'))

    function antecessores_meos_et_ego(progenitorem, ego_codicem) {
      let familiam = progenitorem || []
      let _m = ego_codicem.match(__RegulaNumerumInVasum)
      familiam.push(_m[2])
      return familiam
    }

    function path_now(progenitorem, reference_now) {
      let resp = reference_now.match(__RegulaNumerumInVasum)
      let codeparts = progenitorem || []
      // console.log(reference_now.match(__RegulaNumerumInVasum))
      if (resp && resp[2]) {
        // console.log(resp[2])
        codeparts.push(resp[2])
      }
      // return codeparts.join(codicem_separato)
      return codeparts
    }

    function legend_now(parents_and_current) {
      return '[' + parents_and_current.join(codicem_separato) + ']'
    }

    function recursive(rem, indicem = 1, progenitorem = []) {
      let result = ''
      // throw `Too deep ${indicem}`

      // console.log('indicem, progenitorem, rem', indicem, progenitorem, rem)

      if (indicem > 100) {
        throw `Too deep ${indicem}`
      }

      if (rem && Object.keys(rem).length > 0) {
        for (let [clavem, rem_subitem] of Object.entries(rem)) {


          // Is this key an special numeric code (so actually have inner objects?)
          if (__RegulaNumerumInVasum.test(clavem)) {
            let _m = clavem.match(__RegulaNumerumInVasum)
            let clavem_numerum_ad_hoc = _m[2]
            // progenitorem.push(_m[2])

            // console.log('antecessores_meos_et_ego(progenitorem, clavem)', antecessores_meos_et_ego(progenitorem, clavem))

            // console.log('this is an nested key', clavem)
            // let parents_and_current = path_now(progenitorem, clavem)
            // console.log('parents_and_current', parents_and_current)
            // let the_legend = legend_now(parents_and_current)
            // console.log('legend_now', the_legend)

            let ego_codicem = '-1'
            if (progenitorem && progenitorem.length > 0) {
              // ego_codicem = '[' + progenitorem.push(clavem_numerum_ad_hoc).join(codicem_separato) + ']'
              let __base = [...progenitorem, clavem_numerum_ad_hoc]
              ego_codicem = '[' + __base.join(codicem_separato) + ']'
            } else {
              ego_codicem = '[' + clavem_numerum_ad_hoc + ']'
            }
            


            // result += `<summary>${ego_codicem}</summary>`
            let result_group = ''
            let result_group_simplex_label = ''
            let result_group_simplex_title = ''
            for (let [clavem_2, rem_subitem_2] of Object.entries(rem_subitem)) {
              // console.log('clavem_2', clavem_2, __RegulaNumerumInVasum.test(clavem_2))
              if (__RegulaNumerumInVasum.test(clavem_2)) {
                let _m_3 = clavem.match(__RegulaNumerumInVasum)
                let clavem_numerum_ad_hoc_3 = _m_3[2]
                let recursive_item = {}
                recursive_item[clavem_2] = rem_subitem_2

                let progenitorem_inner = [clavem_numerum_ad_hoc_3]
                if (progenitorem && progenitorem.length) {
                  let __base__3 = [...progenitorem, clavem_numerum_ad_hoc_3]
                  progenitorem_inner = __base__3
                }

                // console.log()
                // result += `\n${recursive(rem_subitem_2, (indicem + 1))}`
                // result += `\n${recursive(recursive_item, (indicem + 1), progenitorem_inner)}`
                result_group += `\n${recursive(recursive_item, (indicem + 1), progenitorem_inner)}`
                // console.log('@todo: re-enable recursive')

              } else {
                // console.log('valores', rem_subitem_2)
                // result += `\n${JSON.stringify([clavem_2, rem_subitem_2])}`
                // let _linguam = clavem
                let _linguam = clavem_2
                // console.log('_linguam', _linguam)
                let ldata = PicturamDL._htmlDataAttributes(_linguam)
                for (let [_temp2, indicem_et_rem] of Object.entries(rem_subitem_2)) {
                  // result += `<dl>`
                  result_group += `<dl>`
                  // result += `<dt>${linguam}</dt>`
                  // result += `<dt ${ldata}>${_linguam}</dt>`
                  result_group += `<dt ${ldata}>${_linguam}</dt>`
                  for (let [indicem, rem_crudum] of Object.entries(indicem_et_rem)) {
                    // result += `<dd ${ldata}>${indicem}: ${rem_crudum}</dd>`
                    if (!result_group_simplex_label) {
                      result_group_simplex_label = ` <em class="meta-in-lineam" lang="${_linguam}">${rem_crudum}</em>`
                      result_group_simplex_title = `${rem_crudum}`
                    }

                    result_group += `<dd ${ldata}>${indicem}: ${rem_crudum}</dd>`
                  }
                  // result += `</dl>`
                  result_group += `</dl>`
                }
              }
            }
            result += `<details id="${ego_codicem}">`
            result += `<summary title="${result_group_simplex_title}">${clavem}${result_group_simplex_label}</summary>`
            result += result_group
            result += `</details>`
          } else {
            let _linguam = clavem
            // console.log('@todo rem_subitem', rem_subitem)
            for (let [_temp2, indicem_et_rem] of Object.entries(rem_subitem)) {
              result += `<dl>`
              result += `<dt>${_linguam}</dt>`
              for (let [indicem, rem_crudum] of Object.entries(indicem_et_rem)) {
                result += `<dd>${indicem}:${rem_crudum}</dd>`
              }
              result += `</dl>`
            }
          }
        }
      }

      return result
    }

    // console.log('this.data', this.data)

    raw_html = recursive(this.data)
    return raw_html
  }
}


export { Picturam, PicturamDL }
