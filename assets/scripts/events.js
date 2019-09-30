import Wad from 'web-audio-daw'
const config = require('./config.js')
const store = require('./store.js')
const api = require('./api.js')
const indexUploads = require('./templates/index-uploads.handlebars')
const indexOneShots = require('./templates/index-oneShots.handlebars')
const indexSOneShots = require('./templates/index-s-oneShots.handlebars')
const indexDOneShots = require('./templates/index-d-oneShots.handlebars')
const indexFOneShots = require('./templates/index-f-oneShots.handlebars')
const indexJOneShots = require('./templates/index-j-oneShots.handlebars')
const indexKOneShots = require('./templates/index-k-oneShots.handlebars')
const indexLOneShots = require('./templates/index-l-oneShots.handlebars')

let loop = 'loop1'
let customLoop

const state = {
  volume: 0.5,
  url: '',
  oneShotUrl: '',
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

const kitState = {
  'Mr-Bill': {
    loop1:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop1.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop2.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillLoop3.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillKick1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare4.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillHat1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillPerc1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/MrBill/MrBillSnare3.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }
  },
  Pascaal: {
    loop1:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop1.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop2.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalLoop3.wav`,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalKick1.wav`,
        volume: 0.6,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalTom.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalSnare1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalHat1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc3.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/Pascaal/PascaalPerc2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }
  },
  Tennyson: {
    loop1:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop1.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop2.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonLoop3.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonKick1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonTom1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonSnare1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonHat1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/Tennyson/TennysonPerc2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }
  },
  Oliver: {
    loop1:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop1.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop2.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverKick1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverTom1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverSnare1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverHat2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/Oliver/OliverPerc2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }

  },
  'Torres-Rengifo': {
    loop1:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop1.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop4.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: 'https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoLoop3.wav',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoKick1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoTom1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoHat1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoRim1.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/Torres-Rengifo/Torres-RengifoPerc2.wav`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }
  },
  Custom: {
    loop1:
      { source: state.url,
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop2:
      { source: '',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    loop3:
      { source: '',
        loop: true,
        volume: 0.5,
        detune: 0
      },
    s:
      { source: `https://bowmansbucket.s3.amazonaws.com/48025856512341325`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    d:
      { source: `https://bowmansbucket.s3.amazonaws.com/2851370962708084`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    f:
      { source: `https://bowmansbucket.s3.amazonaws.com/11095957366424303`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    j:
      { source: `https://bowmansbucket.s3.amazonaws.com/6454482876346834`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    k:
      { source: `https://bowmansbucket.s3.amazonaws.com/9507814444897231`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      },
    l:
      { source: `https://bowmansbucket.s3.amazonaws.com/1682637573742103`,
        volume: 0.5,
        filter:
          { type: 'lowpass',
            frequency: 20000
          }
      }

  }
}

let kits = {
  loop1:
    new Wad(kitState[producer].loop1),
  loop2:
    new Wad(kitState[producer].loop2),
  loop3:
    new Wad(kitState[producer].loop3),
  s:
    new Wad(kitState[producer].s),
  d:
    new Wad(kitState[producer].d),
  f:
    new Wad(kitState[producer].f),
  j:
    new Wad(kitState[producer].j),
  k:
    new Wad(kitState[producer].k),
  l:
    new Wad(kitState[producer].l)
}

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
      kits[loop] = new Wad(kitState[producer][loop])
      kits[loop].play(
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

const onkeyDown = event => {
  $(`.${event.keyCode}`).addClass('key-pressed')
  switch (event.keyCode) {
    case 83 : kits.s.stop()
      kits.s.play()
      break
    case 68 : kits.d.stop()
      kits.d.play()
      break
    case 70 : kits.f.stop()
      kits.f.play()
      break
    case 74 : kits.j.stop()
      kits.j.play()
      break
    case 75 : kits.k.stop()
      kits.k.play()
      break
    case 76 : kits.l.stop()
      kits.l.play()
      break
  }
}

const onkeyUp = event => {
  $(`.${event.keyCode}`).removeClass('key-pressed')
}

const onChangeVolume = event => {
  if (producer === 'Custom' && !$('.play-btn').hasClass('play')) {
    customLoop.setVolume(event.target.valueAsNumber)
  } else if (!$('.play-btn').hasClass('play')) {
    kits[loop].setVolume(event.target.valueAsNumber)
    // kits.loop2.setDetune(event.target.valueAsNumber)
    // kits.loop3.setDetune(event.target.valueAsNumber)
  }

  state.volume = event.target.valueAsNumber
  producers.forEach(x => {
    kitState[x].loop1.volume = (event.target.valueAsNumber)
    kitState[x].loop2.volume = (event.target.valueAsNumber)
    kitState[x].loop3.volume = (event.target.valueAsNumber)
  })
}

const onChangeDetune = event => {
  if (producer === 'Custom' && !$('.play-btn').hasClass('play')) {
    customLoop.setDetune(event.target.valueAsNumber)
  } else if (!$('.play-btn').hasClass('play')) {
    kits[loop].setDetune(event.target.valueAsNumber)
    // kits.loop2.setDetune(event.target.valueAsNumber)
    // kits.loop3.setDetune(event.target.valueAsNumber)
  }

  state.detune = event.target.valueAsNumber
  producers.forEach(x => {
    kitState[x].loop1.detune = (event.target.valueAsNumber)
    kitState[x].loop2.detune = (event.target.valueAsNumber)
    kitState[x].loop3.detune = (event.target.valueAsNumber)
  })
}

const onChangeKeyVolume = (event, key) => {
  kits[key] = new Wad(
    Object.assign(kitState[producer][key], { volume: event.target.valueAsNumber })
  )
  producers.forEach(prod => {
    kitState[prod][key] = Object.assign(kitState[prod][key], { volume: event.target.valueAsNumber })
  })
}

const onChangeKeyDetune = (event, key) => {
  kits[key] = new Wad(
    Object.assign(kitState[producer][key], { detune: event.target.valueAsNumber })
  )
  producers.forEach(prod => {
    kitState[prod][key] = Object.assign(kitState[prod][key], { detune: event.target.valueAsNumber })
  })
}

const onChangeKeyReverb = (event, key) => {
  kits[key] = new Wad(
    Object.assign(kitState[producer][key],
      { reverb:
        { wet: event.target.valueAsNumber,
          impulse: 'public/CementBlocks1.wav'}
      }
    )
  )
  producers.forEach(prod => {
    kitState[prod][key] = Object.assign(kitState[prod][key],
      { reverb:
        { wet: event.target.valueAsNumber,
          impulse: 'public/CementBlocks1.wav'}
      }
    )
  })
}

const onChangeKeyFilter = (event, key) => {
  kits[key] = new Wad(
    Object.assign(kitState[producer][key],
      { filter:
        { type: kitState[producer][key].filter.type,
          frequency: event.target.valueAsNumber
        }
      }
    )
  )
  producers.forEach(prod => {
    kitState[prod][key] = Object.assign(kitState[prod][key],
      { filter:
        { type: kitState[producer][key].filter.type,
          frequency: event.target.valueAsNumber
        }
      }
    )
  })
}

const onChangeKeyFilterType = (event, key) => {
  kits[key] = new Wad(
    Object.assign(kitState[producer][key],
      { filter:
        { type: event.target.value,
          frequency: kitState[producer][key].filter.frequency
        }
      }
    )
  )
  producers.forEach(prod => {
    kitState[prod][key] = Object.assign(kitState[prod][key],
      { filter:
        { type: event.target.value,
          frequency: kitState[prod][key].filter.frequency
        }
      }
    )
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
}

const setCustomOneShot = (key, url) => {
  kits[key] = new Wad(Object.assign(kitState[producer][key], { source: url })
  )
  kitState[producer][key].source = url
  console.log('New sound url:', url)
}

const onSelectCustomOneShot = (key, event) => {
  setCustomOneShot(key, event.target.value)
  state.oneShotUrl = event.target.value
}

const onClickProducer = (selectedProducer) => {
  producer = selectedProducer
  kits = {
    loop1:
      new Wad(kitState[producer].loop1),
    loop2:
      new Wad(kitState[producer].loop2),
    loop3:
      new Wad(kitState[producer].loop3),
    s:
      new Wad(kitState[producer].s),
    d:
      new Wad(kitState[producer].d),
    f:
      new Wad(kitState[producer].f),
    j:
      new Wad(kitState[producer].j),
    k:
      new Wad(kitState[producer].k),
    l:
      new Wad(kitState[producer].l)
  }
  const dormantProducers = producers.filter(x => x !== selectedProducer)
  dormantProducers.forEach(dormantProducer => {
    $(`#${dormantProducer}-text`).removeClass('selected')
  })
  $('#producer-title').html(`${selectedProducer} Samples`)
  $(`#${selectedProducer}-text`).addClass('selected')
  if (selectedProducer === 'Custom') {
    $('#presets').hide()
    $('#handlebar-uploads').show()
    $('.handlebar-oneShots').show()
  } else {
    $('#handlebar-uploads').hide()
    $('#presets').show()
    $('.handlebar-oneShots').hide()
  }
}

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
    // .then(() => $('.loader').hide())
    // .then(() => console.log('after index, customLoop is', customLoop))
    .catch(console.log)
}

const indexAndShowOneShots = key => {
  let indexKeyOneShots = () => {}
  switch (key) {
    case 's': indexKeyOneShots = indexSOneShots
      break
    case 'd': indexKeyOneShots = indexDOneShots
      break
    case 'f': indexKeyOneShots = indexFOneShots
      break
    case 'j': indexKeyOneShots = indexJOneShots
      break
    case 'k': indexKeyOneShots = indexKOneShots
      break
    case 'l': indexKeyOneShots = indexLOneShots
      break
  }

  api.indexOneShots()
    .then((responseData) => {
      $(`#${key}-handlebar-oneShots`).html(indexKeyOneShots({ oneShots: responseData.oneShots.reverse() }))
      return responseData
    })
    .then((responseData) => {
      store.oneShots = responseData.oneShots
      return responseData
    })
    .then(() => { state.oneShotUrl = store.oneShots[0].url })
    .catch(console.log)
}

const changeKeyParams = () => {
  const keys = ['s', 'd', 'f', 'j', 'k', 'l']
  keys.forEach(key => {
    $(`#${key}-volume`).on('change', (event) => onChangeKeyVolume(event, `${key}`))
    $(`#${key}-detune`).on('change', (event) => onChangeKeyDetune(event, `${key}`))
    $(`#${key}-reverb`).on('change', (event) => onChangeKeyReverb(event, `${key}`))
    $(`#${key}-filter`).on('change', (event) => onChangeKeyFilter(event, `${key}`))
    $(`.${key}-filter-type`).on('change', (event) => onChangeKeyFilterType(event, `${key}`))
  })
}

const uploadOneShot = (key, event) => {
  event.preventDefault()
  $('.modal-loader').show()
  const formData = new FormData(event.target)

  $.ajax({
    method: 'POST',
    url: config.apiUrl + '/oneShots',
    data: formData,
    contentType: false,
    processData: false
  })
    .then(res => {
      setCustomOneShot(key, res.oneShot.url)
    })
    .then(() => indexAndShowOneShots(key))
    .then(() => $('.modal-loader').hide())
    .catch(() => {
      $('#failure-modal').modal('show')
      $('.loader').hide()
    })
}

const detectmob = () => {
  if (navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}

const addHandlers = () => {
  if (detectmob()) {
    $('#mobile-modal').modal('show')
  }
  const httpRequest = new XMLHttpRequest()
  httpRequest.open('GET', 'https://bowmansbucket.s3.amazonaws.com/Oliver/OliverLoop3.wav')
  httpRequest.addEventListener('load', e => $('.loader').hide())
  httpRequest.send()

  indexAndShowUploads()

  $('#handlebar-uploads').hide()
  $('.handlebar-oneShots').hide()
  $('.modal-loader').hide()
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

  changeKeyParams()

  $('.loops').on('change', onSelectLoop)
  $('#handlebar-uploads').on('change', '.custom-select', onSelectCustomLoop)

  $('#s-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('s', event))
  $('#d-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('d', event))
  $('#f-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('f', event))
  $('#j-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('j', event))
  $('#k-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('k', event))
  $('#l-handlebar-oneShots').on('change', '.oneShot-select', (event) => onSelectCustomOneShot('l', event))

  $('#s').on('click', () => kits.s.play())
  $('#d').on('click', () => kits.d.play())
  $('#f').on('click', () => kits.f.play())
  $('#j').on('click', () => kits.j.play())
  $('#k').on('click', () => kits.k.play())
  $('#l').on('click', () => kits.l.play())

  $('#mobile-s').on('click', () => kits.s.play())
  $('#mobile-d').on('click', () => kits.d.play())
  $('#mobile-f').on('click', () => kits.f.play())
  $('#mobile-j').on('click', () => kits.j.play())
  $('#mobile-k').on('click', () => kits.k.play())
  $('#mobile-l').on('click', () => kits.l.play())

  $('#s-oneShot-uploader').on('submit', event => uploadOneShot('s', event))
  $('#d-oneShot-uploader').on('submit', event => uploadOneShot('d', event))
  $('#f-oneShot-uploader').on('submit', event => uploadOneShot('f', event))
  $('#j-oneShot-uploader').on('submit', event => uploadOneShot('j', event))
  $('#k-oneShot-uploader').on('submit', event => uploadOneShot('k', event))
  $('#l-oneShot-uploader').on('submit', event => uploadOneShot('l', event))

  $('#sound-uploader').on('submit', event => {
    event.preventDefault()
    $('.loader').show()

    const formData = new FormData(event.target)

    $.ajax({
      method: 'POST',
      url: config.apiUrl + '/uploads',
      data: formData,
      contentType: false,
      processData: false
    })
      .then(console.log)
      .then(indexAndShowUploads)
      .then(() => onClickProducer('Custom'))
      .then(() => $('.loader').hide())
      .catch(() => {
        $('#failure-modal').modal('show')
        $('.loader').hide()
      })
  })
  window.addEventListener('keydown', onkeyDown)
  window.addEventListener('keyup', onkeyUp)

  api.indexOneShots()
    .then((responseData) => {
      $('#s-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/48025856512341325').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/48025856512341325',
          title: 'Inception'
        }
      ).reverse() }))
      $('#d-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/2851370962708084').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/2851370962708084',
          title: 'Wilhelm Scream'
        }
      ).reverse() }))
      $('#f-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/11095957366424303').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/11095957366424303',
          title: 'Photay Buchla Splash'
        }
      ).reverse() }))
      $('#j-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/6454482876346834').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/6454482876346834',
          title: 'Bass Drop'
        }
      ).reverse() }))
      $('#k-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/9507814444897231').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/9507814444897231',
          title: `"Okay"`
        }
      ).reverse() }))
      $('#l-handlebar-oneShots').html(indexOneShots({ oneShots: responseData.oneShots.filter(oneShot => oneShot.url !== 'https://bowmansbucket.s3.amazonaws.com/1682637573742103').concat(
        { url: 'https://bowmansbucket.s3.amazonaws.com/1682637573742103',
          title: 'Hawk'
        }
      ).reverse() }))
      return responseData
    })
    .then((responseData) => {
      store.oneShots = responseData.oneShots
      return responseData
    })
    .then(() => { state.oneShotUrl = store.oneShots[0].url })
    .catch(console.log)
}

module.exports = {
  addHandlers
}
