import Wad from 'web-audio-daw'

let loop = 'loop1'

// const state = {
//   Pascaal: {
//     loop: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop${loopNumber}.wav`
//   },
//   PointPoint: {
//     loop: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop${loopNumber}.wav`
//   },
//   Tennyson: {
//     loop: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop${loopNumber}.wav`
//   }
// }

let producer = 'Oliver'

// const onClickProducer = (producerName) => {
//   producer = producerName
//   alert(producer)
// }

const kits = {
  PointPoint: {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop1.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop2.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPointLoop3.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint1.wav`,
        volume: 0.5 }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint2.wav`,
        volume: 0.5
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    g: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint3.wav`,
        volume: 0.5 }
    ),
    h: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint4.wav`,
        volume: 0.5 }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint5.wav`,
        volume: 0.5 }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/PointPoint/PointPoint6.wav`,
        volume: 0.5 }
    )
  },
  Pascaal: {
    loop1: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop1.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop2: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop2.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    loop3: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop3.wav`,
        loop: true,
        volume: 0.5,
        rate: 1
      }),
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalKick1.wav`,
        volume: 0.5 }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnare1.wav`,
        volume: 0.5
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    g: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalHat1.wav`,
        volume: 0.5 }
    ),
    h: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalTom.wav`,
        volume: 0.5 }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc1.wav` }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc2.wav`,
        volume: 0.5
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
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5 }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    g: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.5 }
    ),
    h: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5 }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.5 }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5 }
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
    d: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverKick1.wav`,
        volume: 0.5 }
    ),
    f: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverSnare1.wav`,
        volume: 0.5
        // reverb: {
        //   wet: 0.5,
        //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
        // }
        // Reverb slows everything down interfering with sound rendering
      }
    ),
    g: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat1.wav`,
        volume: 0.5 }
    ),
    h: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverTom1.wav`,
        volume: 0.5 }
    ),
    j: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverPerc1.wav`,
        volume: 0.5 }
    ),
    k: new Wad(
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverPerc2.wav`,
        volume: 0.5 }
    )
  }
}

////////////////////////////////////////////////////////////////////////

// const pascaalLoop = new Wad(
//   { source: 'https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop.wav',
//     loop: state.pointLoop.loop,
//     volume: state.pointLoop.volume,
//     rate: state.pointLoop.rate
//   }
// )
//
// const pascaal1 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalKick1.wav` }
// )
//
// const pascaal2 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnare1.wav`
//     // reverb: {
//     //   wet: 0.5,
//     //   impulse: 'https://bowmansbucket.s3.amazonaws.com/CementBlocks1.wav'
//     // }
//     // Reverb slows everything down interfering with sound rendering
//   }
// )
//
// const pascaal3 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnareHat1.wav` }
// )
//
// const pascaal4 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalTom.wav` }
// )
//
// const pascaal5 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc1.wav` }
// )
//
// const pascaal6 = new Wad(
//   { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc2.wav` }
// )

////////////////////////////////////////////////////////////////////////////////

// const pointKick1 = new Wad(
//   { source: './public/sounds/Pascaal/PascaalKick1.wav' }
// )
//
// const pointSnare1 = new Wad(
//   { source: './public/sounds/Pascaal/PascaalSnare1.wav',
//     reverb: {
//       wet: 0.5,
//       impulse: './public/sounds/Reverb/CementBlocks1.wav'
//     }
//   }
// )
//
// const pointHat1 = new Wad(
//   { source: './public/sounds/Pascaal/PascaalHat1.wav' }
// )
//
// const pointClap1 = new Wad(
//   { source: './public/sounds/Pascaal/PascaalSnare2.wav' }
// )
//
// const pointPerc1 = new Wad(
//   { source: './public/sounds/Pascaal/PascaalPerc1.wav' }
// )
//
// const pointRide = new Wad(
//   { source: './public/sounds/Pascaal/PascaalTom.wav' }
// )

///////////////////////////////////////

// const pointLoopParams = {
//   loop: true,
//   volume: 0.5,
//   rate: 1
// }
// const saw = new Wad({ ...this.state.saw, source: 'sawtooth' })
const playLoop = () => {
  if ($('.play-btn').hasClass('play')) {
    $('.play-btn').html('Stop')
    $('.play-btn').removeClass('play')
    $('.play-btn').addClass('stop')
    Wad.stopAll()
    kits[producer][loop].play({ loop: true })
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
    case 68 : kits[producer].d.play()
      break
    case 70 : kits[producer].f.play()
      break
    case 71 : kits[producer].g.play()
      break
    case 72 : kits[producer].h.play()
      break
    case 74 : kits[producer].j.play()
      break
    case 75 : kits[producer].k.play()
      break
  }
}

const onkeyUp = event => {
  $(`#${event.keyCode}`).removeClass('key-pressed')
}

const onChangeVolume = event => {
  kits[producer][loop].setVolume(event.target.valueAsNumber)
  console.log('event', event.target.valueAsNumber)
}

// const onChangeRate = event => {
//   kits.PointPoint.loop.setRate(event.target.valueAsNumber)
//   console.log('event', event.target.valueAsNumber)
// }

const onChangeDetune = event => {
  kits[producer][loop].setDetune(event.target.valueAsNumber)
  console.log('event', event.target.valueAsNumber)
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

const producers = ['Oliver', 'Pascaal', 'PointPoint', 'Tennyson']

const onClickProducer = (producer) => {
  const dormantProducers = producers.filter(x => x !== producer)
  dormantProducers.forEach(dormantProducer => {
    $(`#${dormantProducer}-text`).removeClass('selected')
  })
  $('#producer-title').html(`${producer} Samples`)
  $(`#${producer}-text`).addClass('selected')
}

const addHandlers = () => {
  $('.play-btn').on('click', playLoop)
  $('.stop-btn').on('click', stop)
  $('#Oliver').on('click', () => onClickProducer('Oliver'))
  $('#Pascaal').on('click', () => onClickProducer('Pascaal'))
  $('#PointPoint').on('click', () => onClickProducer('PointPoint'))
  $('#Tennyson').on('click', () => onClickProducer('Tennyson'))
  $('#volume').on('change', onChangeVolume)
  $('#detune').on('change', onChangeDetune)
  $('.loops').on('change', onSelectLoop)
  window.addEventListener('keydown', onkeyDown)
  window.addEventListener('keyup', onkeyUp)
}

module.exports = {
  addHandlers
}
