import Wad from 'web-audio-daw'
const config = require('./config.js')
const store = require('./store.js')
const api = require('./api.js')
const indexUploads = require('./templates/index-uploads.handlebars')
// const getFormFields = require('../../lib/get-form-fields.js')

let loop = 'loop1'

const state = {
  volume: 0.5,
  url: '',
  detune: 0,
  s: '',
  d: '',
  f: '',
  j: '',
  k: '',
  l: ''
}

let producer = 'Mr-Bill'
const producers = ['Mr-Bill', 'Oliver', 'Pascaal', 'Tennyson', 'Torres-Rengifo', 'Custom']

const kits = {
  'Mr-Bill': {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop1.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop2.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop3.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare4.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillHat1.wav`,
        volume: 0.4,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare3.wav`,
        volume: 0.4,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  },
  // PointPoint: {
  //   loop1: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop1.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   loop2: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop2.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   loop3: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop3.wav`,
  //       loop: true,
  //       volume: 0.5,
  //       rate: 1
  //     }),
  //   s: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint1.wav`,
  //       volume: 0.5 }
  //   ),
  //   d: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint2.wav`,
  //       volume: 0.5
  //       // reverb: {
  //       //   wet: 0.5,
  //       //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
  //       // }
  //       // Reverb slows everything down interfering with sound rendering
  //     }
  //   ),
  //   f: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint4.wav`,
  //       volume: 0.5 }
  //   ),
  //   j: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint3.wav`,
  //       volume: 0.3 }
  //   ),
  //   k: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint5.wav`,
  //       volume: 0.5 }
  //   ),
  //   l: new Wad(
  //     { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint6.wav`,
  //       volume: 0.3 }
  //   )
  // },
  Pascaal: {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop1.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop2.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop3.wav`,
        loop: true,
        volume: 0.5,
        detune: 0,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalKick1.wav`,
        volume: 0.6,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalTom.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalHat1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc3.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc2.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  },
  Tennyson: {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  },
  Oliver: {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  },
  'Torres-Rengifo': {
    loop1: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop1.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop4.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoHat1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoRim1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  },
  Custom: {
    loop1: new Wad(
      { source: state.url,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop2.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav',
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    s: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.3,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    ),
    l: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5,
        detune: 0,
        reverb: {
          wet: 0,
          impulse: 'public/CementBlocks1.wav'
        }
      }
    )
  }
}

let customLoop

const playLoop = () => {
  if (producer === 'Custom' && $('.play-btn').hasClass('play')) {
    customLoop = new Wad(
      { source: state.url,
        loop: true,
        volume: state.volume,
        detune: state.detune
      }
    )
    customLoop.play({ loop: true })
  }
  if ($('.play-btn').hasClass('play')) {
    $('.play-btn').html('Stop')
    $('.play-btn').removeClass('play')
    $('.play-btn').addClass('stop')
    if (producer !== 'Custom') {
      Wad.stopAll()
      kits[producer][loop].play(
        { loop: true,
          volume: state.volume
        })
    }
  } else {
    $('.play-btn').html('Play')
    $('.play-btn').removeClass('stop')
    $('.play-btn').addClass('play')
    Wad.stopAll()
  }
}

const stop = () => {
  Wad.stopAll()
}
// const playSaw = () => {
//   saw.stop()
//   saw.play()
// }
// let detune = 0

// const adjustStateVolume = event => {
//   this.setState({
//     [event.target.name]: {
//       ...this.state[event.target.name],
//       volume: event.target.value
//     }
//   })
//   console.log('volume', this.state.pointLoop.volume)
//   // Wad.setVolume(this.state.pointLoop.volume)
// }
// const adjustStateRate = event => {
//   this.setState({
//     [event.target.name]: {
//       ...this.state[event.target.name],
//       rate: event.target.value
//     }
//   })
//   console.log('rate', this.state.pointLoop.rate)
//   // Wad.setRate(this.state.pointLoop.rate)
// }
// const setVolume = (event) => {
//   const promise = new Promise(function (resolve, reject) {
//     resolve(adjustStateVolume(event))
//   })
//   promise
//     .then(() => Wad.setVolume(this.state.pointLoop.volume))
//     .then(() => console.log('from promise chain'))
//     .catch(console.error)
// }
// const setRate = (event) => {
//   const promise = new Promise(function (resolve, reject) {
//     resolve(adjustStateRate(event))
//   })
//   promise
//     .then(() => pointLoop.setRate(this.state.pointLoop.rate))
//     .then(() => console.log('from promise chain'))
//     .catch(console.error)
// }

const onkeyDown = event => {
  $(`#${event.keyCode}`).addClass('key-pressed')
  switch (event.keyCode) {
    case 83 : kits[producer].s.play()
      break
    case 68 : kits[producer].d.play()
      break
    case 70 : kits[producer].f.play()
      break
    case 74 : kits[producer].j.play()
      break
    case 75 : kits[producer].k.play()
      break
    case 76 : kits[producer].l.play()
      break
  }
}

const onkeyUp = event => {
  $(`#${event.keyCode}`).removeClass('key-pressed')
}

const onChangeVolume = event => {
  customLoop.setVolume(event.target.valueAsNumber)
  kits[producer][loop].setVolume(event.target.valueAsNumber)
  state.volume = event.target.valueAsNumber
  producers.forEach(x => {
    kits[x][loop].volume = (event.target.valueAsNumber)
  })
  console.log('event', event.target.valueAsNumber)
}

// const onChangeRate = event => {
//   kits.PointPoint.loop.setRate(event.target.valueAsNumber)
//   console.log('event', event.target.valueAsNumber)
// }

const onChangeDetune = event => {
  state.detune = event.target.valueAsNumber
  producers.forEach(x => {
    kits[x][loop].detune = (event.target.valueAsNumber)
  })
  if (producer !== 'Custom') {
    kits[producer][loop].setDetune(event.target.valueAsNumber)
    console.log('event', event.target.valueAsNumber)
  } else {
    customLoop.setDetune(event.target.valueAsNumber)
  }
}

const onChangeKeyVolume = (event, key) => {
  kits[producer][key] = new Wad({
    source: kits[producer][key].source,
    detune: kits[producer][key].detune,
    reverb: {
      wet: kits[producer][key].reverb.wet,
      impulse: 'public/CementBlocks1.wav'
    },
    volume: event.target.valueAsNumber
  })
}

const onChangeKeyDetune = (event, key) => {
  // kits[producer][key].setDetune(event.target.valueAsNumber)
  // console.log('key detune', kits[producer][key].detune)
  kits[producer][key] = new Wad({
    source: kits[producer][key].source,
    volume: kits[producer][key].volume,
    reverb: {
      wet: kits[producer][key].reverb.wet,
      impulse: 'public/CementBlocks1.wav'
    },
    detune: event.target.valueAsNumber
  })
}

const onChangeKeyReverb = (event, key) => {
  kits[producer][key] = new Wad({
    source: kits[producer][key].source,
    volume: kits[producer][key].volume,
    detune: kits[producer][key].detune,
    reverb: {
      wet: event.target.valueAsNumber,
      impulse: 'public/CementBlocks1.wav'
    }
  })
}

const onSelectLoop = event => {
  switch (event.target.value) {
    case 'Loop 1': loop = 'loop1'
      break
    case 'Loop 2': loop = 'loop2'
      break
    case 'Loop 3': loop = 'loop3'
      break
  }
}

const onSelectCustomLoop = event => {
  state.url = event.target.value
  console.log('event.target.value', event.target.value)
}

const onClickProducer = (selectedProducer) => {
  producer = selectedProducer
  const dormantProducers = producers.filter(x => x !== selectedProducer)
  dormantProducers.forEach(dormantProducer => {
    $(`#${dormantProducer}-text`).removeClass('selected')
  })
  $('#producer-title').html(`${selectedProducer} Samples`)
  $(`#${selectedProducer}-text`).addClass('selected')
  if (selectedProducer === 'Custom') {
    $('#presets').hide()
    $('#handlebar-uploads').show()
  } else {
    $('#handlebar-uploads').hide()
    $('#presets').show()
  }
}

// const soundUpload = formData => {
//   return $.ajax({
//     method: 'POST',
//     url: config.apiUrl + '/sounds',
//     contentType: false, // you use this because StackOverFlow. but basically you just don't want jQuery to interfere, because we've already set the content type
//     processData: false, // same here
//     data: formData, // then we can just send it as is because it's already formatted
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

const indexAndShowUploads = () => {
  api.indexUploads()
    .then((responseData) => {
      $('#handlebar-uploads').html(indexUploads({ uploads: responseData.uploads.reverse() }))
      return responseData
    })
    .then((responseData) => {
      store.uploads = responseData.uploads
      return responseData
    })
    .then(() => { state.url = store.uploads[0].url })
    .then(() => {
      customLoop = new Wad(
        { source: state.url,
          loop: true,
          volume: state.volume,
          detune: state.detune
        }
      )
    })
    .catch(console.log)
}

const addHandlers = () => {
  const httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav')
  httpRequest.addEventListener('load', e => $('.loader').hide())
  httpRequest.send()

  indexAndShowUploads()

  $('#handlebar-uploads').hide()
  $('.play-btn').on('click', playLoop)
  $('.stop-btn').on('click', stop)
  $('#Mr-Bill').on('click', () => onClickProducer('Mr-Bill'))
  $('#Oliver').on('click', () => onClickProducer('Oliver'))
  $('#Pascaal').on('click', () => onClickProducer('Pascaal'))
  $('#PointPoint').on('click', () => onClickProducer('PointPoint'))
  $('#Tennyson').on('click', () => onClickProducer('Tennyson'))
  $('#Torres-Rengifo').on('click', () => onClickProducer('Torres-Rengifo'))
  $('#Custom').on('click', () => onClickProducer('Custom'))
  $('#volume').on('change', onChangeVolume)
  $('#detune').on('change', onChangeDetune)
  $('#s-volume').on('change', (event) => onChangeKeyVolume(event, 's'))
  $('#s-detune').on('change', (event) => onChangeKeyDetune(event, 's'))
  $('#s-reverb').on('change', (event) => onChangeKeyReverb(event, 's'))

  $('#d-volume').on('change', (event) => onChangeKeyVolume(event, 'd'))
  $('#d-detune').on('change', (event) => onChangeKeyDetune(event, 'd'))
  $('#d-reverb').on('change', (event) => onChangeKeyReverb(event, 'd'))

  $('#f-volume').on('change', (event) => onChangeKeyVolume(event, 'f'))
  $('#f-detune').on('change', (event) => onChangeKeyDetune(event, 'f'))
  $('#f-reverb').on('change', (event) => onChangeKeyReverb(event, 'f'))

  $('#j-volume').on('change', (event) => onChangeKeyVolume(event, 'j'))
  $('#j-detune').on('change', (event) => onChangeKeyDetune(event, 'j'))
  $('#j-reverb').on('change', (event) => onChangeKeyReverb(event, 'j'))

  $('#k-volume').on('change', (event) => onChangeKeyVolume(event, 'k'))
  $('#k-detune').on('change', (event) => onChangeKeyDetune(event, 'k'))
  $('#k-reverb').on('change', (event) => onChangeKeyReverb(event, 'k'))

  $('#l-volume').on('change', (event) => onChangeKeyVolume(event, 'l'))
  $('#l-detune').on('change', (event) => onChangeKeyDetune(event, 'l'))
  $('#l-reverb').on('change', (event) => onChangeKeyReverb(event, 'l'))

  $('.loops').on('change', onSelectLoop)
  $('#handlebar-uploads').on('change', '.custom-select', onSelectCustomLoop)
  $('#s').on('click', () => kits[producer].s.play())
  $('#d').on('click', () => kits[producer].d.play())
  $('#f').on('click', () => kits[producer].f.play())
  $('#j').on('click', () => kits[producer].j.play())
  $('#k').on('click', () => kits[producer].k.play())
  $('#l').on('click', () => kits[producer].l.play())
  $('#sound-uploader').on('submit', event => {
    event.preventDefault()
    $('.loader').show()
    // const file = $('#test-file').prop('files')[0]
    // console.log(file)
    // const formData = {
    //   file
    // }
    // const formFields = getFormFields(this)
    // console.log('form fields', formFields)
    const formData = new FormData(event.target)
    // console.log('event target isLoop', event.target.value)
    console.log('formData', formData.values())

    // let type = ''
    // if ($('#is-loop').prop('checked', true)) {
    //   type = 'loop'
    // } else if ($('#not-loop').prop('checked', true)) {
    //   type = 'not loop'
    // }

    $.ajax({
      method: 'POST',
      url: config.apiUrl + '/uploads',
      data: formData,
      contentType: false,
      processData: false
    })
      // .then(console.log)
      // .then(apiResponse => {
      //   $('#sound-display').html(`<audio controls src=${apiResponse.upload.url}></audio>`)
      // })
      .then(console.log)
      .then(indexAndShowUploads)
      .then(() => onClickProducer('Custom'))
      .then(() => $('.loader').hide())
      .catch(() => alert('failure'))
  })
  window.addEventListener('keydown', onkeyDown)
  window.addEventListener('keyup', onkeyUp)
}

module.exports = {
  addHandlers
}
