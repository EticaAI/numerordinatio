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

    this.data = data
    this.codex = Primitivum.codex_de_obiectum(this.data)

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

  fiatLuxHtml() {
    let raw_html = ''



    console.log('fiatlux2')
    // console.log(this.data)
    // console.log(this.radicem)
    // let radicem = this.radicem.data(this.data).enter().append("p").text(function (d, i) {
    //   console.log(d, i)
    // })

    // let codex = Primitivum.codex_de_obiectum(this.data)

    console.log(this.codex)

    // // this.d3.select("body")
    // this.d3.select(this.radicem)
    //   // .selectAll("p")
    //   .data([4, 8, 15, 16, 23, 42])
    //   .enter().append("p")
    //   .text(function (d) { return "I'm number " + d + "!"; });
  }
}


export { Picturam, PicturamDL }
