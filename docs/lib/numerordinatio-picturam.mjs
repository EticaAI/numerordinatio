// Dominium Publicum
// SPDX-License-Identifier: Unlicense

import { Auxilium, Primitivum } from './numerordinatio.mjs';
// import { datum_specificum } from './numerordinatio.mjs';
// import * as D3 from 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.2.1/d3.js';
// import { * } from 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.2.1/d3.js'

console.log('numerordinatio-picturam.mjs')

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

  inHtml() {
    let raw_html = ''
    const RegulaCodicemPurum = `(\\p{General_Category=Decimal_Number}[\\p{General_Category=Decimal_Number}|\:|~]*\\p{General_Category=Decimal_Number})`
    const RegulaCodicemInVasum = `(\\p{General_Category=Open_Punctuation}${RegulaCodicemPurum}\\p{General_Category=Close_Punctuation})`
    const __RegulaCodicemPurumInVasum = new RegExp('^' + RegulaCodicemInVasum + '$', 'u')
    // console.log('fiatlux2')

    console.log('teste {12}', __RegulaCodicemPurumInVasum.test('{12}'))
    console.log('teste 12', __RegulaCodicemPurumInVasum.test('12'))

    function recursive(rem, indicem = 1) {
      let result = ''

      if (indicem > 100) {
        throw `Too deep ${indicem}`
        return ''
      }
      console.log('recursive', indicem, rem)

      // console.log('Object.keys(rem)', Object.keys(rem))

      if (rem && Object.keys(rem).length > 0) {
        for (let [clavem, rem_subitem] of Object.entries(rem)) {
          // console.log('indicem, clavem, rem_subitem', indicem, clavem, rem_subitem)
          // if (clavem.indexOf('{') === 0 && clavem.indexOf('}') === clavem.length) {

          // let thisgroup = []
          if (__RegulaCodicemPurumInVasum.test(clavem)) {
            // console.log('this is an nested key', clavem)

            result += `<details id="${indicem}_${clavem}">`
            result += `<summary>${clavem}</summary>`
            for (let [clavem_2, rem_subitem_2] of Object.entries(rem_subitem)) {
              // console.log('')
              if (__RegulaCodicemPurumInVasum.test(clavem_2)) {
                console.log('entroi2')
                result += `\n${recursive(rem_subitem_2, (indicem + 1))}`
              } else {
                console.log('todo')
                result += `\n${JSON.stringify(rem_subitem_2)}`
              }
              
            }
            result += `</details>`
          } else {
            result += `<dl>`
            for (let [clavem_2, rem_subitem_2] of Object.entries(rem_subitem)) {
              // console.log('')
              result += `<dt>${clavem_2}</dt>`
              for (let [clavem_3, rem_subitem_3] of Object.entries(rem_subitem_2)) {
                result += `<dd>${clavem_3}:${rem_subitem_3}</dd>`
              }
            }
            result += `</dl>`
            // console.log('result', result)
            // console.log('this is an attribute', clavem)
            // console.log(clavem.indexOf('}'), clavem.length)
          }


          // for (let [clavem_2, rem_subitem_2] of Object.entries(rem_subitem)) {
          //   console.log('  (indicem + 1), clavem_2, rem_subitem_2', (indicem + 1), clavem_2, rem_subitem_2)
          //   // result += `${result}\n${recursive(rem_subitem_2)}`
          //   result += `\n${recursive(rem_subitem_2, (indicem + 1))}`
          // }
        }
      }
      // } else {
      //   console.log('done')
      // }
      // console.log('fini', result)
      return result
    }

    raw_html = recursive(this.data)
    return raw_html
    // console.log('this.data', this.data)
    // console.log('recursive', recursive(this.data))
    // console.log('recursive', raw_html)



    // console.log(this.data)
    // console.log(this.radicem)
    // let radicem = this.radicem.data(this.data).enter().append("p").text(function (d, i) {
    //   console.log(d, i)
    // })

    // let codex = Primitivum.codex_de_obiectum(this.data)

    // console.log(this.codex)
    // console.log(this.codex.quod_profundum())


    // // this.d3.select("body")
    // this.d3.select(this.radicem)
    //   // .selectAll("p")
    //   .data([4, 8, 15, 16, 23, 42])
    //   .enter().append("p")
    //   .text(function (d) { return "I'm number " + d + "!"; });
  }
}


export { Picturam, PicturamDL }
